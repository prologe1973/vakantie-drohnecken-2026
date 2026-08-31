import { NextResponse } from 'next/server';

// Tijdelijke debug-route: test of better-sqlite3 correct laadt in deze container
export async function GET() {
  const result: Record<string, unknown> = {};
  try {
    // Test of de module laadt (zonder database te openen)
    const Database = require('better-sqlite3');
    result.moduleLoaded = true;
    result.moduleType = typeof Database;
    try {
      const db = new Database(':memory:');
      db.exec('CREATE TABLE t(a)');
      db.prepare('INSERT INTO t VALUES(1)').run();
      const row = db.prepare('SELECT a FROM t').get();
      result.dbWorks = true;
      result.row = row;
      db.close();
    } catch (e: any) {
      result.dbError = e?.message;
    }
  } catch (e: any) {
    result.moduleLoaded = false;
    result.loadError = e?.message;
    result.stack = e?.stack;
  }
  return NextResponse.json(result);
}
