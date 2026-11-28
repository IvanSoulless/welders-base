
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { test } from 'node:test';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';

test('private catalog, role enforcement, login limits and revocable sessions', async t => {
  const staffPassword = randomBytes(24).toString('hex');
  const adminPassword = randomBytes(24).toString('hex');
  const state = await mkdtemp(join(tmpdir(), 'wb-'));
  const mf = new Miniflare(convertV4MiniflareOptions({
    d1Persist: state,
    r2Persist: state,
    modules: true,
    scriptPath: 'src/worker.mjs',
    compatibilityDate: '2026-11-28',
    d1Databases: { DB: '11111111-1111-4111-8111-111111111111' },
    r2Buckets: { PRIVATE: 'test-private' },
    bindings: { SHARED_PASSWORD: staffPassword, ADMIN_PASSWORD: adminPassword,
      SESSION_SECRET: randomBytes(32).toString('hex') }
  }));
  t.after(async () => {
    await mf.dispose();
    await rm(state, { recursive: true, force: true });
  });
  const db = await mf.getD1Database('DB');
  const sql = await readFile('migrations/0001_auth.sql', 'utf8');
  for (const line of sql.trim().split('\n')) await db.exec(line.trim());
  const call = (path, options) => mf.dispatchFetch('https://welders.test' + path, options);
  const login = (role, password, extra = {}) => call('/api/login', {
    method: 'POST',
    headers: { Origin: 'https://welders.test', 'Content-Type': 'application/json', ...extra.headers },
    body: JSON.stringify({ role, password, remember: extra.remember })
  });
  const memberResponse = await login('member', staffPassword);
  assert.equal(memberResponse.status, 200);
  const persistentCookie = memberResponse.headers.get('Set-Cookie');
  assert.match(persistentCookie, /Secure; HttpOnly; SameSite=Strict; Max-Age=2592000/);
  const member = { Cookie: persistentCookie.split(';')[0] };
  const adminResponse = await login('admin', adminPassword, { remember: false });
  assert.equal(adminResponse.status, 200);
  assert.doesNotMatch(adminResponse.headers.get('Set-Cookie'), /Max-Age/);
  const admin = { Cookie: adminResponse.headers.get('Set-Cookie').split(';')[0], Origin: 'https://welders.test' };
  const denied = await call('/api/catalog');
  assert.equal(denied.status, 401);
  assert.equal(denied.headers.get('Cache-Control'), 'private, no-store');
  assert.equal((await call('/api/catalog', { method: 'PUT', headers: { ...member, Origin: admin.Origin } })).status, 403);
  assert.equal((await call('/api/logout', { method: 'POST', headers: { ...member, Origin: 'https://other.test' } })).status, 403);
  const empty = await call('/api/catalog', { headers: member });
  assert.deepEqual(await empty.json(), []);
  const key = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/TEST1 - Test Welder.png';
  const path = '/api/signature/' + encodeURIComponent(key);
  assert.equal((await call(path)).status, 401);
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/FioAAAAASUVORK5CYII=', 'base64');
  assert.equal((await call(path, { method: 'PUT', headers: admin, body: png })).status, 204);
  assert.equal((await call(path, { method: 'PUT', headers: admin, body: png })).status, 409);
  const publish = () => call('/api/catalog', { method: 'PUT', headers: { ...admin, 'If-Match': empty.headers.get('ETag') }, body: JSON.stringify([key]) });
  assert.equal((await publish()).status, 204);
  assert.equal((await publish()).status, 409);
  assert.deepEqual(await (await call('/api/catalog', { headers: member })).json(), [key]);
  assert.deepEqual(Buffer.from(await (await call(path, { headers: member })).arrayBuffer()), png);
  const renewed = await call('/api/session?renew=1', { headers: member });
  assert.equal(renewed.status, 200);
  assert.match(renewed.headers.get('Set-Cookie'), /Max-Age=2592000/);

  const bad = () => login('admin', staffPassword, { headers: { 'CF-Connecting-IP': '192.0.2.10' } });
  for (let i = 0; i < 8; i++) assert.equal((await bad()).status, 401);
  assert.equal((await bad()).status, 429);
  assert.equal((await call('/api/admin/revoke', { method: 'POST', headers: admin })).status, 204);
  assert.equal((await call(path, { headers: member })).status, 401);
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
