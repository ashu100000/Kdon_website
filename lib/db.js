import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dataDir = path.join(process.cwd(), 'data');
fs.mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, 'quote_requests.db');

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS quote_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    company TEXT,
    email TEXT,
    phone TEXT,
    origin TEXT,
    destination TEXT,
    equipment TEXT,
    details TEXT,
    submitted_at TEXT NOT NULL DEFAULT (datetime('now')),
    ip_address TEXT
  );
`);

// Migration: adds email/phone columns to a database file created before
// these fields existed, without touching any data already stored in it.
const existingColumns = db.prepare(`PRAGMA table_info(quote_requests)`).all().map((c) => c.name);
if (!existingColumns.includes('email')) {
  db.exec(`ALTER TABLE quote_requests ADD COLUMN email TEXT`);
}
if (!existingColumns.includes('phone')) {
  db.exec(`ALTER TABLE quote_requests ADD COLUMN phone TEXT`);
}

export default db;
