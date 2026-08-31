import fs from 'fs';
import path from 'path';

// Eenvoudige, betrouwbare bestandsgebaseerde opslag voor het reisverslag.
// Schrijft een JSON-bestand naar het persistente volume (of lokaal ./data).
// Geen native module nodig — werkt gegarandeerd in elke container.
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const DB_FILE = process.env.DB_PATH || path.join(DATA_DIR, 'journal.json');

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

function ensureDir() {
  fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
}

function readAll(): JournalEntry[] {
  try {
    if (!fs.existsSync(DB_FILE)) return [];
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeAll(entries: JournalEntry[]) {
  ensureDir();
  fs.writeFileSync(DB_FILE, JSON.stringify(entries, null, 2), 'utf-8');
}

export async function getJournalEntries(): Promise<JournalEntry[]> {
  const entries = readAll();
  entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return entries;
}

export async function saveJournalEntry(entry: JournalEntry): Promise<JournalEntry> {
  const entries = readAll();
  const idx = entries.findIndex((e) => e.id === entry.id);
  if (idx >= 0) entries[idx] = entry;
  else entries.push(entry);
  writeAll(entries);
  return entry;
}

export async function deleteJournalEntry(id: string): Promise<void> {
  const entries = readAll().filter((e) => e.id !== id);
  writeAll(entries);
}

export async function replaceAllEntries(entries: JournalEntry[]): Promise<void> {
  writeAll(entries);
}
