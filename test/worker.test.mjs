
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { test } from 'node:test';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';

test('public catalog, private drafts, admin-only writes and revocable sessions', async t => {
  const adminPassword = randomBytes(24).toString('hex');
  const state = await mkdtemp(join(tmpdir(), 'wb-'));
  const mf = new Miniflare(convertV4MiniflareOptions({
    d1Persist: state,
    modules: true,
    scriptPath: 'src/worker.mjs',
    compatibilityDate: '2026-11-28',
    d1Databases: { DB: '11111111-1111-4111-8111-111111111111' },
    bindings: { ADMIN_PASSWORD: adminPassword,
      SESSION_SECRET: randomBytes(32).toString('hex') }
  }));
  t.after(async () => {
    await mf.dispose();
    await rm(state, { recursive: true, force: true });
  });
  const db = await mf.getD1Database('DB');
  for (const file of ['0001_auth.sql', '0002_catalog.sql']) {
    const sql = await readFile('migrations/' + file, 'utf8');
    for (const statement of sql.split(';').map(value => value.trim()).filter(Boolean)) await db.exec(statement.replaceAll('\n', ' '));
  }
  const call = (path, options) => mf.dispatchFetch('https://welders.test' + path, options);
  const login = (role, password, extra = {}) => call('/api/login', {
    method: 'POST',
    headers: { Origin: 'https://welders.test', 'Content-Type': 'application/json', ...extra.headers },
    body: JSON.stringify({ role, password, remember: extra.remember })
  });
  assert.equal((await login('member', adminPassword)).status, 400);
  const persistent = await login('admin', adminPassword);
  assert.equal(persistent.status, 200);
  const persistentCookie = persistent.headers.get('Set-Cookie');
  assert.match(persistentCookie, /Secure; HttpOnly; SameSite=Strict; Max-Age=2592000/);
  const remembered = { Cookie: persistentCookie.split(';')[0] };
  const adminResponse = await login('admin', adminPassword, { remember: false });
  assert.equal(adminResponse.status, 200);
  assert.doesNotMatch(adminResponse.headers.get('Set-Cookie'), /Max-Age/);
  const admin = { Cookie: adminResponse.headers.get('Set-Cookie').split(';')[0], Origin: 'https://welders.test' };
  const publicCatalog = await call('/api/catalog');
  assert.equal(publicCatalog.status, 200);
  assert.equal(publicCatalog.headers.get('Cache-Control'), 'private, no-store');
  assert.equal((await call('/api/catalog', { method: 'PUT', headers: { Origin: admin.Origin } })).status, 401);
  assert.equal((await call('/api/logout', { method: 'POST', headers: { ...remembered, Origin: 'https://other.test' } })).status, 403);
  const empty = await call('/api/catalog');
  assert.deepEqual(await empty.json(), []);
  const key = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/TEST1 - Test Welder.png';
  const path = '/api/signature/' + encodeURIComponent(key);
  assert.equal((await call(path)).status, 404);
  const imageHeader = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/FioAAAAASUVORK5CYII=', 'base64');
  assert.equal((await call(path, { method: 'PUT', headers: { Origin: admin.Origin }, body: imageHeader })).status, 401);
  const png = Buffer.concat([imageHeader, randomBytes(1_850_000)]);
  assert.equal((await call(path, { method: 'PUT', headers: admin, body: png })).status, 204);
  assert.equal((await call(path, { method: 'PUT', headers: admin, body: png })).status, 409);
  assert.equal((await call(path)).status, 404);
  const publish = (keys = [key], version = empty.headers.get('ETag')) => call('/api/catalog', { method: 'PUT', headers: { ...admin, 'If-Match': version }, body: JSON.stringify(keys) });
  assert.equal((await publish([key + '.png'])).status, 409);
  assert.equal((await publish()).status, 204);
  assert.equal((await publish()).status, 409);
  assert.deepEqual(await (await call('/api/catalog')).json(), [key]);
  assert.deepEqual(Buffer.from(await (await call(path)).arrayBuffer()), png);
  const current = await call('/api/catalog');
  assert.equal((await publish([], current.headers.get('ETag'))).status, 204);
  assert.deepEqual(await (await call('/api/catalog')).json(), []);
  assert.equal((await call(path)).status, 404);
  const renewed = await call('/api/session?renew=1', { headers: remembered });
  assert.equal(renewed.status, 200);
  assert.match(renewed.headers.get('Set-Cookie'), /Max-Age=2592000/);

  const bad = () => login('admin', randomBytes(24).toString('hex'), { headers: { 'CF-Connecting-IP': '192.0.2.10' } });
  for (let i = 0; i < 8; i++) assert.equal((await bad()).status, 401);
  assert.equal((await bad()).status, 429);
  assert.equal((await call('/api/admin/revoke', { method: 'POST', headers: admin })).status, 204);
  assert.equal((await call('/api/session', { headers: remembered })).status, 401);
  assert.equal((await call('/api/session', { headers: admin })).status, 401);
});

test('search supports names and pasted stamps, and Excel rows escape formulas', async () => {
  const source = await readFile('public/data.js', 'utf8');
  const { findWelders, parseSignature, excelRows, escapeHTML } = runInNewContext(source +
    '\n({ findWelders, parseSignature, excelRows, escapeHTML })');
  const record = parseSignature('1A23 - Сёмин Иван.png');
  assert.equal(findWelders([record], 'семин иван').length, 1);
  assert.equal(findWelders([record], '1a23\t2B33\n1A23').length, 1);
  assert.match(excelRows([{ stamp: 'ABCD', fio: '=2+2' }]), /\t'=2\+2$/);
  assert.equal(escapeHTML('<test>'), '&lt;test&gt;');
});
