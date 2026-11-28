CREATE TABLE signatures (
  key TEXT PRIMARY KEY,
  image BLOB NOT NULL
);
CREATE TABLE catalog (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  version TEXT NOT NULL,
  keys TEXT NOT NULL
);
INSERT INTO catalog (id, version, keys) VALUES (1, 'empty', '[]');
