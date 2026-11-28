CREATE TABLE IF NOT EXISTS signatures (
  key TEXT PRIMARY KEY,
  image BLOB NOT NULL
);
CREATE TABLE IF NOT EXISTS catalog (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  version TEXT NOT NULL,
  keys TEXT NOT NULL
);
INSERT OR IGNORE INTO catalog (id, version, keys) VALUES (1, 'empty', '[]');
