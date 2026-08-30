import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Persistente SQLite-database voor het reisverslag.
// Pad komt uit DB_PATH (in Docker een volume), lokaal in ./data/journal.db
const DB_PATH =
  process.env.DB_PATH || path.join(process.cwd(), 'data', 'journal.db');

export interface JournalEntry {
  id: string;
  title: string;
  day: string;
  date: string;
  location?: string;
  text?: string;
  photos: string[];
  updatedAt: string;
}

let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (db) return db;
  // Zorg dat de directory bestaat
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.exec(`
    CREATE TABLE IF NOT EXISTS journal_entries (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      day TEXT NOT NULL,
      date TEXT NOT NULL,
      location TEXT,
      text TEXT,
      photos TEXT NOT NULL DEFAULT '[]',
      updatedAt TEXT NOT NULL
    );
  `);
  return db;
}

function rowToEntry(row: any): JournalEntry {
  return {
    id: row.id,
    title: row.title,
    day: row.day,
    date: row.date,
    location: row.location || undefined,
    text: row.text || undefined,
    photos: JSON.parse(row.photos || '[]'),
    updatedAt: row.updatedAt,
  };
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const d = getDb();
  const rows = d.prepare('SELECT * FROM journal_entries').all() as any[];
  const entries = rows.map(rowToEntry);
  entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return entries;
}

export async function saveJournalEntry(entry: JournalEntry): Promise<JournalEntry> {
  const d = getDb();
  const row = {
    id: entry.id,
    title: entry.title,
    day: entry.day,
    date: entry.date,
    location: entry.location || null,
    text: entry.text || null,
    photos: JSON.stringify(entry.photos || []),
    updatedAt: entry.updatedAt,
  };
  d.prepare(`
    INSERT INTO journal_entries (id, title, day, date, location, text, photos, updatedAt)
    VALUES (@id, @title, @day, @date, @location, @text, @photos, @updatedAt)
    ON CONFLICT(id) DO UPDATE SET
      title=@title, day=@day, date=@date, location=@location, text=@text,
      photos=@photos, updatedAt=@updatedAt
  `).run(row);
  return entry;
}

export async function deleteJournalEntry(id: string): Promise<void> {
  const d = getDb();
  d.prepare('DELETE FROM journal_entries WHERE id = ?').run(id);
}

// Gebruikt door de API om een volledige bestandsset (migratie) in te laden
export async function replaceAllEntries(entries: JournalEntry[]): Promise<void> {
  const d = getDb();
  const tx = d.transaction((items: JournalEntry[]) => {
    d.prepare('DELETE FROM journal_entries').run();
    for (const e of items) {
      d.prepare(`
        INSERT INTO journal_entries (id, title, day, date, location, text, photos, updatedAt)
        VALUES (@id, @title, @day, @date, @location, @text, @photos, @updatedAt)
      `).run({
        id: e.id,
        title: e.title,
        day: e.day,
        date: e.date,
        location: e.location || null,
        text: e.text || null,
        photos: JSON.stringify(e.photos || []),
        updatedAt: e.updatedAt,
      });
    }
  });
  tx(entries);
}
