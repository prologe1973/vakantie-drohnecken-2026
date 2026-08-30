import { NextResponse } from 'next/server';

const IMMICH_URL = process.env.IMMICH_URL || 'http://192.168.200.32:2283';
const IMMICH_API_KEY = process.env.IMMICH_API_KEY || '';

type Ctx = { params: Promise<{ albumId: string }> };

// GET /api/immich/albums/[albumId]/assets
// Gebruikt Immich search/metadata om de foto's van een album op te halen.
export async function GET(_req: Request, ctx: Ctx) {
  const { albumId } = await ctx.params;
  const res = await fetch(`${IMMICH_URL}/api/search/metadata`, {
    method: 'POST',
    headers: { 'x-api-key': IMMICH_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ albumId, size: 500 }),
    cache: 'no-store',
  });
  if (!res.ok) {
    const body = await res.text();
    return NextResponse.json({ error: body, status: res.status }, { status: res.status });
  }
  const data = await res.json();
  const assets = data?.assets?.items || [];
  return NextResponse.json(
    assets.map((a: any) => ({
      id: a.id,
      type: a.type,
      originalPath: a.originalPath,
      thumbhash: a.thumbhash,
    }))
  );
}
