import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { PostgresIntakeStore } from "../../src/lib/intake/postgres";

export const confirmation = "I_APPROVE_THIS_DISPOSABLE_DATABASE";
export function configuration(env: Record<string, string | undefined>) {
  if (!env.SOS_101_TEST_DATABASE_URL) return null;
  assert.ok(env.SOS_101_TEST_DISPOSABLE_CONFIRMATION === confirmation, "Disposable instance approval required");
  let url: URL;
  try { url = new URL(env.SOS_101_TEST_DATABASE_URL); } catch { throw new Error("Invalid test URL (redacted)"); }
  assert.ok(["postgres:", "postgresql:"].includes(url.protocol), "Explicit PostgreSQL URL required");
  assert.ok(url.hostname && url.port && url.username && url.password && url.pathname.length > 1,
    "Explicit host, port, user, password and database required; no driver defaults");
  assert.ok(!url.hash && [...url.searchParams.keys()].every((key) => key === "sslmode"), "Only sslmode URL option allowed");
  assert.equal(url.searchParams.getAll("sslmode").length <= 1, true);
  assert.ok(!url.searchParams.has("sslmode") || ["disable", "verify-full"].includes(url.searchParams.get("sslmode")!), "Use verified TLS or explicitly approved local transport");
  // Compare without exposing either the URL or the expected endpoint in assertion output.
  assert.ok(url.host === env.SOS_101_TEST_EXPECTED_HOST, "Approved host/port mismatch");
  assert.ok(decodeURIComponent(url.pathname.slice(1)) === env.SOS_101_TEST_EXPECTED_DATABASE, "Approved database mismatch");
  assert.ok(decodeURIComponent(url.username) === env.SOS_101_TEST_EXPECTED_USER, "Approved role mismatch");
  return url;
}

export function migrationSql() {
  const sql = readFileSync("db/migrations/001_sos_101_intake_core.sql", "utf8").replace(/\r\n/g, "\n");
  // Fail closed on any unreviewed migration change, including schema-qualified writes.
  assert.equal(createHash("sha256").update(sql).digest("hex"),
    "18f9621dec1ff21ac3f3b524effbe8ec02d5f8f483756900af83c32395d55546", "Migration changed: re-review isolation before execution");
  // PostgreSQL 13+ has core gen_random_uuid. Do not create a database-wide extension.
  return sql.replace(/^create extension if not exists pgcrypto;\n/, "");
}

export type Client = {
  query(sql: string, params?: unknown[]): Promise<{ rows: Record<string, unknown>[]; rowCount: number | null }>;
  release(): void;
};
type Pool = { connect(): Promise<Client>; end(): Promise<void> };

export async function fixture(url: URL, run: (context: {
  client: Client; store: () => PostgresIntakeStore; connection: () => Promise<Client>;
  closeStores: () => Promise<void>;
}) => Promise<void>) {
  const sql = migrationSql(); // Before even importing the driver or opening a connection.
  const schema = `sos_101_test_${randomUUID().replaceAll("-", "")}`;
  assert.match(schema, /^sos_101_test_[a-f0-9]{32}$/);
  const scoped = new URL(url);
  scoped.searchParams.set("options", `-c search_path=${schema},pg_catalog -c statement_timeout=10000 -c lock_timeout=5000`);
  const driver = "pg";
  const { Pool: PgPool } = await import(driver) as { Pool: new (config: object) => Pool };
  const pool = new PgPool({ connectionString: scoped.toString(), connectionTimeoutMillis: 5000 });
  const stores: PostgresIntakeStore[] = [];
  const clients: Client[] = [];
  let created = false;
  const closeStores = async () => {
    // Test-only lifecycle access: no alternate store implementation or production API change.
    for (const store of stores.splice(0)) await (await (store as unknown as { poolPromise: Promise<Pool> }).poolPromise).end();
  };
  try {
    const client = await pool.connect();
    clients.push(client);
    const identity = (await client.query("select current_database() as db, current_user as usr, current_setting('server_version_num')::int as version")).rows[0];
    assert.ok(identity.db === decodeURIComponent(url.pathname.slice(1)) && identity.usr === decodeURIComponent(url.username), "Server identity mismatch");
    assert.ok(Number(identity.version) >= 130000, "PostgreSQL 13+ required");
    await client.query(`create schema "${schema}"`); // No IF NOT EXISTS: never adopt an existing schema.
    created = true;
    console.log(`Disposable test schema: ${schema}`);
    await client.query(sql);
    await run({ client, closeStores, store: () => {
      const store = new PostgresIntakeStore(scoped.toString());
      stores.push(store);
      return store;
    }, connection: async () => {
      const connection = await pool.connect();
      clients.push(connection);
      return connection;
    } });
  } catch (error) {
    // Driver errors may contain connection details or row data. Keep only safe diagnostic codes.
    const code = (error as { code?: string }).code;
    throw new Error(`PostgreSQL contract failed (${code && /^[A-Z0-9_]+$/.test(code) ? code : "redacted"}); inspect the named case locally.`);
  } finally {
    try {
      await closeStores();
      const released = await Promise.allSettled(clients.map(async (client) => {
        try { await client.query("rollback"); } finally { client.release(); }
      }));
      assert.ok(released.every((result) => result.status === "fulfilled"), "Connection cleanup failed");
      if (created) {
        const cleanup = await pool.connect();
        try { await cleanup.query(`drop schema "${schema}" cascade`); console.log(`Cleaned test schema: ${schema}`); }
        finally { cleanup.release(); }
      }
    } catch { throw new Error(`Test cleanup failed; owner must inspect recorded schema ${schema}. No broader cleanup attempted.`); }
    finally { await pool.end(); }
  }
}
