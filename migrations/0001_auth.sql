CREATE TABLE sessions (id TEXT PRIMARY KEY, role TEXT NOT NULL, generation TEXT NOT NULL, expires INTEGER NOT NULL, persistent INTEGER NOT NULL);
CREATE INDEX sessions_expiry ON sessions(expires);
CREATE TABLE login_attempts (bucket TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);
CREATE INDEX attempts_expiry ON login_attempts(expires);
