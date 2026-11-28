import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

test('Russian, English and Turkish cover all interface labels and messages', async () => {
  const html = await readFile('public/index.html', 'utf8');
  const app = await readFile('public/app.js', 'utf8');
  const dictionary = runInNewContext(app.split('  let currentLang')[0] + '\nI18N');
  const keys = [...Object.keys(dictionary.ru)].sort();
  assert.deepEqual(Object.keys(dictionary).sort(), ['en', 'ru', 'tr']);
  assert.match(html, /id="language"[\s\S]*data-lang="tr"[\s\S]*id="access"/);
  for (const translation of Object.values(dictionary)) {
    assert.deepEqual(Object.keys(translation).sort(), keys);
    for (const [, key] of html.matchAll(/data-i18n(?:-placeholder)?="([^"]+)"/g)) {
      assert.equal(typeof translation[key], 'string', key);
      assert.ok(translation[key].trim(), key);
    }
  }
});
