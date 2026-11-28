const day = 86400;
const cookie = '__Host-welders';
const encoder = new TextEncoder();
const hex = bytes => Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
const hash = async value => hex(await crypto.subtle.digest('SHA-256', encoder.encode(value)));
const cookieValue = (token, age) => `${cookie}=${token}; Path=/; Secure; HttpOnly; SameSite=Strict${age == null ? '' : `; Max-Age=${age}`}`;
const error = (status, message) => Response.json({ error: message }, { status });
const sessionAge = persistent => persistent ? 30 * day : 8 * 3600;
const imageKey = /^(?:[a-f0-9-]{36}\/)?[^/\\\x00-\x1f]+\.png$/iu;

async function readLimited(request, limit) {
  const reader = request.body?.getReader();
  if (!reader) return new Uint8Array();
  const chunks = [];
  let size = 0;
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > limit) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return bytes;
}

async function readJson(request, limit) {
  const bytes = await readLimited(request, limit);
  try {
    return bytes && JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    return null;
  }
}

async function generation(env) {
  return hash(JSON.stringify([env.SESSION_SECRET, env.SHARED_PASSWORD, env.ADMIN_PASSWORD]));
}

async function login(request, env, now) {
  const ip = request.headers.get('CF-Connecting-IP') || 'local';
  const buckets = await Promise.all([hash(ip), hash('all-login-attempts')]);
  const results = await env.DB.batch([env.DB.prepare('DELETE FROM login_attempts WHERE expires<=?').bind(now),
    ...buckets.map(bucket => env.DB.prepare(
    `INSERT INTO login_attempts VALUES (?,1,?)
     ON CONFLICT(bucket) DO UPDATE SET
       count=CASE WHEN expires<=? THEN 1 ELSE min(count+1,1000) END,
       expires=CASE WHEN expires<=? THEN excluded.expires ELSE expires END
     RETURNING count`
  ).bind(bucket, now + 60, now, now))]);
  if (results[1].results[0].count > 8 || results[2].results[0].count > 120) {
    return Response.json({ error: 'Too many attempts' }, { status: 429, headers: { 'Retry-After': '60' } });
  }
  const body = await readJson(request, 4096);
  if (!body || typeof body.password !== 'string' || !['member', 'admin'].includes(body.role)) {
    return error(400, 'Invalid login');
  }
  const expected = body.role === 'admin' ? env.ADMIN_PASSWORD : env.SHARED_PASSWORD;
  const [a, b] = await Promise.all([body.password, expected].map(value => crypto.subtle.digest('SHA-256', encoder.encode(value))));
  const aa = new Uint8Array(a);
  const bb = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < aa.length; i++) diff |= aa[i] ^ bb[i];
  if (diff) return error(401, 'Invalid password');
  const persistent = body.remember !== false;
  const age = sessionAge(persistent);
  const token = hex(crypto.getRandomValues(new Uint8Array(32)));
  const former = request.headers.get('Cookie')?.match(/(?:^|;\s*)__Host-welders=([a-f0-9]{64})(?:;|$)/)?.[1];
  const cleanup = [env.DB.prepare('DELETE FROM sessions WHERE expires<=?').bind(now),
    env.DB.prepare('DELETE FROM login_attempts WHERE expires<=?').bind(now)];
  if (former) cleanup.push(env.DB.prepare('DELETE FROM sessions WHERE id=?').bind(await hash(former)));
  await env.DB.batch([...cleanup, env.DB.prepare('INSERT INTO sessions VALUES (?,?,?,?,?)')
    .bind(await hash(token), body.role, await generation(env), now + age, Number(persistent))]);
  return Response.json({ role: body.role }, { headers: { 'Set-Cookie': cookieValue(token, persistent ? age : null) } });
}

async function route(request, env) {
  const url = new URL(request.url);
  const { pathname: path } = url;
  const method = request.method;
  if (!path.startsWith('/api/')) return env.ASSETS.fetch(request);
  if (method !== 'GET' && request.headers.get('Origin') !== url.origin) return error(403, 'Invalid origin');
  if (!env.SHARED_PASSWORD || !env.ADMIN_PASSWORD || env.SHARED_PASSWORD === env.ADMIN_PASSWORD ||
      !env.SESSION_SECRET || env.SESSION_SECRET.length < 32) return error(503, 'Credentials not configured');
  const now = Math.floor(Date.now() / 1000);
  if (method === 'POST' && path === '/api/login') return login(request, env, now);
  const token = request.headers.get('Cookie')?.match(/(?:^|;\s*)__Host-welders=([a-f0-9]{64})(?:;|$)/)?.[1];
  if (!token) return error(401, 'Sign in required');
  const id = await hash(token);
  if (method === 'POST' && path === '/api/logout') {
    await env.DB.prepare('DELETE FROM sessions WHERE id=?').bind(id).run();
    return new Response(null, { status: 204, headers: { 'Set-Cookie': cookieValue('', 0) } });
  }
  const session = await env.DB.prepare('SELECT * FROM sessions WHERE id=? AND generation=? AND expires>?')
    .bind(id, await generation(env), now).first();
  if (!session) return error(401, 'Sign in required');
  if (method === 'GET' && path === '/api/session') {
    if (url.searchParams.get('renew') !== '1') return Response.json({ role: session.role });
    const age = sessionAge(session.persistent);
    const result = await env.DB.prepare('UPDATE sessions SET expires=? WHERE id=? AND expires>?')
      .bind(now + age, id, now).run();
    if (!result.meta.changes) return error(401, 'Sign in required');
    return Response.json({ role: session.role }, { headers: session.persistent ? { 'Set-Cookie': cookieValue(token, age) } : {} });
  }
  if (method === 'GET' && path === '/api/catalog') {
    const object = await env.PRIVATE.get('db.json');
    return object ? new Response(object.body, { headers: { 'Content-Type': 'application/json', ETag: object.httpEtag } })
      : Response.json([], { headers: { ETag: '"empty"' } });
  }
  if (method === 'POST' && path === '/api/admin/revoke') {
    if (session.role !== 'admin') return error(403, 'Admin required');
    await env.DB.prepare('DELETE FROM sessions').run();
    return new Response(null, { status: 204, headers: { 'Set-Cookie': cookieValue('', 0) } });
  }
  if (path.startsWith('/api/signature/')) {
    let key;
    try { key = decodeURIComponent(path.slice('/api/signature/'.length)); } catch { return error(400, 'Invalid key'); }
    if (!imageKey.test(key)) return error(404, 'Unknown signature');
    if (method === 'GET') {
      const object = await env.PRIVATE.get('signatures/' + key);
      return object ? new Response(object.body, { headers: { 'Content-Type': 'image/png' } }) : error(404, 'Unknown signature');
    }
    if (method === 'PUT') {
      if (session.role !== 'admin') return error(403, 'Admin required');
      if (!key.includes('/')) return error(400, 'Use a versioned key');
      const data = await readLimited(request, 5 * 1024 * 1024);
      if (!data || data.length < 24 || hex(data.slice(0, 8)) !== '89504e470d0a1a0a') return error(400, 'Invalid PNG');
      const object = await env.PRIVATE.put('signatures/' + key, data, { onlyIf: { etagDoesNotMatch: '*' } });
      return object ? new Response(null, { status: 204 }) : error(409, 'Signature key already exists');
    }
  }
  if (method === 'PUT' && path === '/api/catalog') {
    if (session.role !== 'admin') return error(403, 'Admin required');
    const list = await readJson(request, 1024 * 1024);
    const expected = request.headers.get('If-Match');
    if (!Array.isArray(list) || list.length > 5000 || new Set(list).size !== list.length ||
      !list.every(key => typeof key === 'string' && imageKey.test(key)) || !expected) return error(400, 'Invalid catalog');
    // Verify referenced objects in bounded batches before making the catalog visible.
    for (let i = 0; i < list.length; i += 20) {
      const objects = await Promise.all(list.slice(i, i + 20).map(key => env.PRIVATE.head('signatures/' + key)));
      if (objects.some(object => !object)) return error(400, 'Missing signature');
    }
    const result = await env.PRIVATE.put('db.json', JSON.stringify(list), {
      onlyIf: expected === '"empty"' ? { etagDoesNotMatch: '*' } : { etagMatches: expected.replace(/^"|"$/g, '') }
    });
    return result ? new Response(null, { status: 204 }) : error(409, 'Catalog changed. Refresh and retry.');
  }
  return error(404, 'Unknown endpoint');
}

export default {
  async fetch(request, env) {
    let response;
    try {
      response = await route(request, env);
    } catch {
      response = error(503, 'Service temporarily unavailable');
    }
    const result = new Response(response.body, response);
    result.headers.set('X-Content-Type-Options', 'nosniff');
    if (new URL(request.url).pathname.startsWith('/api/')) {
      result.headers.set('Cache-Control', 'private, no-store');
      result.headers.set('Vary', 'Cookie');
    }
    return result;
  }
};
