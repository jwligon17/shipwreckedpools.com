import assert from "node:assert/strict";
import test from "node:test";
import { configuration, confirmation, migrationSql } from "./postgres-fixture";

const approved = {
  SOS_101_TEST_DATABASE_URL: "postgresql://synthetic:fictional@localhost:5432/disposable",
  SOS_101_TEST_DISPOSABLE_CONFIRMATION: confirmation,
  SOS_101_TEST_EXPECTED_HOST: "localhost:5432",
  SOS_101_TEST_EXPECTED_DATABASE: "disposable",
  SOS_101_TEST_EXPECTED_USER: "synthetic",
};

test("database guard never falls back to application or provider configuration", () => {
  assert.equal(configuration({ DATABASE_URL: approved.SOS_101_TEST_DATABASE_URL,
    POSTGRES_URL: approved.SOS_101_TEST_DATABASE_URL, POSTGRES_PRISMA_URL: approved.SOS_101_TEST_DATABASE_URL }), null);
});
test("database guard requires approval and independent endpoint identity", () => {
  for (const key of Object.keys(approved).filter((key) => key !== "SOS_101_TEST_DATABASE_URL")) {
    assert.throws(() => configuration({ ...approved, [key]: undefined }));
  }
  for (const key of ["SOS_101_TEST_EXPECTED_HOST", "SOS_101_TEST_EXPECTED_DATABASE", "SOS_101_TEST_EXPECTED_USER"]) {
    assert.throws(() => configuration({ ...approved, [key]: "wrong" }));
  }
  assert.ok(configuration(approved)); // Pure parsing only; no connection.
});
test("database guard rejects defaults and connection scope overrides without leaking URL", () => {
  for (const url of ["invalid-secret-value", "postgresql:///disposable", "postgresql://localhost:5432/disposable",
    `${approved.SOS_101_TEST_DATABASE_URL}?options=-csearch_path=public`,
    `${approved.SOS_101_TEST_DATABASE_URL}?host=other`,
    `${approved.SOS_101_TEST_DATABASE_URL}?sslmode=no-verify`]) {
    assert.throws(() => configuration({ ...approved, SOS_101_TEST_DATABASE_URL: url }), (error: unknown) => {
      assert.ok(!String(error).includes(url));
      return true;
    });
  }
});
test("reviewed migration is schema-local and excludes database-wide extension creation", () => {
  const sql = migrationSql();
  assert.doesNotMatch(sql, /create extension|public\.|search_path/i);
  assert.equal((sql.match(/create table if not exists/g) ?? []).length, 4);
});
