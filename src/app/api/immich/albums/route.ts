import { NextResponse } from 'next/server';

const IMMICH_URL = process.env.IMMICH_URL || 'http://192.168.200.32:2283';
const IMMICH_API_KEY = process.env.IMMICH_API_KEY || '';

async function immichJson(path: string, init?: RequestInit) {
  const res = await fetch(`${IMMICH_URL}${path}`, {
    ...init,
    headers: {
      'x-api-key': IMMICH_API_KEY,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    const body = await res.text();
    return NextResponse.json({ error: body, status: res.status }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json(data);
}

// GET /api/immich/albums  ->  Immich /api/albums
export async function GET() {
  return immichJson('/api/albums');
}
