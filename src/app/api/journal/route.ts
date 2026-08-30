import { NextResponse } from 'next/server';
import { getJournalEntries } from '@/lib/journalDbServer';

// GET /api/journal  —  alle reisverslagen
export async function GET() {
  try {
    const entries = await getJournalEntries();
    return NextResponse.json(entries);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Kon verslagen niet laden' }, { status: 500 });
  }
}

// POST /api/journal  —  nieuwe verslagen (of migratie-set) opslaan
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Ondersteunt zowel één entry als een array (migratie)
    const items = Array.isArray(body) ? body : [body];
    if (items.some((e: any) => !e?.id || !e?.title)) {
      return NextResponse.json({ error: 'Ongeldig verslag' }, { status: 400 });
    }
    if (Array.isArray(body)) {
      // volledige vervanging (migratie/import)
      const { replaceAllEntries } = await import('@/lib/journalDbServer');
      await replaceAllEntries(items);
    } else {
      const { saveJournalEntry } = await import('@/lib/journalDbServer');
      await saveJournalEntry(items[0]);
    }
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Opslaan mislukt' }, { status: 500 });
  }
}
