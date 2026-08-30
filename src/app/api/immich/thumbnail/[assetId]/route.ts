import { NextResponse } from 'next/server';

const IMMICH_URL = process.env.IMMICH_URL || 'http://192.168.200.32:2283';
const IMMICH_API_KEY = process.env.IMMICH_API_KEY || '';

type Ctx = { params: Promise<{ assetId: string }> };

// GET /api/immich/thumbnail/[assetId]?size=thumbnail|preview
// Proxied als binaire afbeelding zodat de API-key nooit naar de browser gaat.
export async function GET(req: Request, ctx: Ctx) {
  const { assetId } = await ctx.params;
  const url = new URL(req.url);
  const size = url.searchParams.get('size') || 'thumbnail';

  const res = await fetch(`${IMMICH_URL}/api/assets/${assetId}/thumbnail?size=${size}`, {
    headers: { 'x-api-key': IMMICH_API_KEY },
    cache: 'no-store',
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'thumbnail not found', status: res.status }, { status: res.status });
  }

  const buf = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get('content-type') || 'image/webp';
  return new NextResponse(new Uint8Array(buf), {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
