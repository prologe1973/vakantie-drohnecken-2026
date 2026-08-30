import { NextResponse } from 'next/server';

const IMMICH_URL = process.env.IMMICH_URL || 'http://192.168.200.32:2283';
const IMMICH_API_KEY = process.env.IMMICH_API_KEY || '';

// GET /api/immich/search?after=2026-09-07T00:00:00Z&before=2026-09-12T00:00:00Z
// Haalt foto's op in een datumbereik (niet beperkt tot een album).
export async function GET(req: Request) {
  const url = new URL(req.url);
  const after = url.searchParams.get('after');
  const before = url.searchParams.get('before');

  if (!after || !before) {
    return NextResponse.json({ error: 'after en before parameters zijn verplicht' }, { status: 400 });
  }

  const body: any = { size: 1000, order: 'desc' };
  body.takenAfter = after;
  body.takenBefore = before;

  const res = await fetch(`${IMMICH_URL}/api/search/metadata`, {
    method: 'POST',
    headers: { 'x-api-key': IMMICH_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: text, status: res.status }, { status: res.status });
  }

  const data = await res.json();
  const items = data?.assets?.items || [];
  // Alleen stilstaande beelden (geen video's/live-photo's)
  return NextResponse.json(
    items
      .filter((a: any) => a.type === 'IMAGE')
      .map((a: any) => ({ id: a.id, type: a.type }))
  );
}
