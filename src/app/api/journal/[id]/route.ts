import { NextResponse } from 'next/server';
import { saveJournalEntry, deleteJournalEntry } from '@/lib/journalDbServer';

type Ctx = { params: Promise<{ id: string }> };

// PUT /api/journal/[id]  —  verslag bijwerken
export async function PUT(req: Request, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    const body = await req.json();
    if (!body?.id || body.id !== id || !body?.title) {
      return NextResponse.json({ error: 'Ongeldig verslag' }, { status: 400 });
    }
    await saveJournalEntry(body);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Opslaan mislukt' }, { status: 500 });
  }
}

// DELETE /api/journal/[id]  —  verslag verwijderen
export async function DELETE(_req: Request, ctx: Ctx) {
  try {
    const { id } = await ctx.params;
    await deleteJournalEntry(id);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Verwijderen mislukt' }, { status: 500 });
  }
}
