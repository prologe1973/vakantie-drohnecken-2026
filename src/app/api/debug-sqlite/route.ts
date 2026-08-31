import { NextResponse } from 'next/server';

// Debug: laadt better-sqlite3 dynamisch BINNEN de handler zodat een fout opgevangen wordt
export async function GET() {
  const result: Record<string, unknown> = { platform: process.platform, arch: process.arch };
  try {
    const { default: Database } = await import('better-sqlite3');
    result.moduleLoaded = true;
    result.databaseType = typeof Database;
    try {
      const db = new Database(':memory:');
      db.exec('CREATE TABLE t(a)');
      db.prepare('INSERT INTO t VALUES(1)').run();
      result.dbWorks = true;
      result.row = db.prepare('SELECT a FROM t').get();
      db.close();
    } catch (e: any) {
      result.dbError = e?.message;
      result.dbStack = e?.stack?.split('\n').slice(0, 4).join('\n');
    }
  } catch (e: any) {
    result.moduleLoaded = false;
    result.loadError = e?.message;
    result.loadStack = e?.stack?.split('\n').slice(0, 8).join('\n');
  }
  return NextResponse.json(result);
}
