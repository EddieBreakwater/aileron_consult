import { and, asc, desc, eq, gte, inArray, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertBenchmark,
  InsertBriefing,
  InsertKpiSubmission,
  InsertPractice,
  InsertUser,
  benchmarks,
  briefings,
  kpiSubmissions,
  practices,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// =============== Users ===============

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;

  textFields.forEach(field => {
    const value = user[field];
    if (value === undefined) return;
    const normalized = value ?? null;
    (values as Record<string, unknown>)[field] = normalized;
    updateSet[field] = normalized;
  });

  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function listAllUsers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(users).orderBy(desc(users.createdAt));
}

// =============== Practices ===============

export async function getPracticeByUserId(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(practices).where(eq(practices.userId, userId)).limit(1);
  return rows[0];
}

export async function upsertPractice(input: InsertPractice) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getPracticeByUserId(input.userId);
  if (existing) {
    await db
      .update(practices)
      .set({
        name: input.name ?? existing.name,
        specialty: input.specialty ?? existing.specialty,
        providerCount: input.providerCount ?? existing.providerCount,
        groupTier: input.groupTier ?? existing.groupTier,
        contactEmail: input.contactEmail ?? existing.contactEmail,
        region: input.region ?? existing.region,
        monthlyRate: input.monthlyRate ?? existing.monthlyRate,
        subscriptionStatus: input.subscriptionStatus ?? existing.subscriptionStatus,
      })
      .where(eq(practices.id, existing.id));
    return getPracticeByUserId(input.userId);
  }
  await db.insert(practices).values(input);
  return getPracticeByUserId(input.userId);
}

export async function getPracticeById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(practices).where(eq(practices.id, id)).limit(1);
  return rows[0];
}

export async function listAllPractices() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(practices).orderBy(desc(practices.createdAt));
}

// =============== KPI submissions ===============

export async function upsertKpiSubmission(input: InsertKpiSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db
    .select()
    .from(kpiSubmissions)
    .where(
      and(
        eq(kpiSubmissions.practiceId, input.practiceId),
        eq(kpiSubmissions.year, input.year),
        eq(kpiSubmissions.month, input.month),
      ),
    )
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(kpiSubmissions)
      .set(input as Record<string, unknown>)
      .where(eq(kpiSubmissions.id, existing[0].id));
    const updated = await db
      .select()
      .from(kpiSubmissions)
      .where(eq(kpiSubmissions.id, existing[0].id))
      .limit(1);
    return updated[0];
  }
  await db.insert(kpiSubmissions).values(input);
  const inserted = await db
    .select()
    .from(kpiSubmissions)
    .where(
      and(
        eq(kpiSubmissions.practiceId, input.practiceId),
        eq(kpiSubmissions.year, input.year),
        eq(kpiSubmissions.month, input.month),
      ),
    )
    .limit(1);
  return inserted[0];
}

export async function getKpiSubmission(practiceId: number, year: number, month: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db
    .select()
    .from(kpiSubmissions)
    .where(
      and(
        eq(kpiSubmissions.practiceId, practiceId),
        eq(kpiSubmissions.year, year),
        eq(kpiSubmissions.month, month),
      ),
    )
    .limit(1);
  return rows[0];
}

export async function getLatestKpiSubmission(practiceId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db
    .select()
    .from(kpiSubmissions)
    .where(eq(kpiSubmissions.practiceId, practiceId))
    .orderBy(desc(kpiSubmissions.year), desc(kpiSubmissions.month))
    .limit(1);
  return rows[0];
}

export async function getKpiHistory(practiceId: number, limit = 12) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(kpiSubmissions)
    .where(eq(kpiSubmissions.practiceId, practiceId))
    .orderBy(desc(kpiSubmissions.year), desc(kpiSubmissions.month))
    .limit(limit);
}

export async function listAllKpiSubmissions(limit = 200) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(kpiSubmissions)
    .orderBy(desc(kpiSubmissions.year), desc(kpiSubmissions.month))
    .limit(limit);
}

// =============== Briefings ===============

export async function insertBriefing(input: InsertBriefing) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(briefings).values(input);
  const rows = await db
    .select()
    .from(briefings)
    .where(
      and(
        eq(briefings.practiceId, input.practiceId),
        eq(briefings.year, input.year),
        eq(briefings.month, input.month),
      ),
    )
    .orderBy(desc(briefings.id))
    .limit(1);
  return rows[0];
}

export async function getBriefingById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(briefings).where(eq(briefings.id, id)).limit(1);
  return rows[0];
}

export async function getLatestBriefing(practiceId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db
    .select()
    .from(briefings)
    .where(eq(briefings.practiceId, practiceId))
    .orderBy(desc(briefings.year), desc(briefings.month), desc(briefings.id))
    .limit(1);
  return rows[0];
}

export async function getBriefingHistory(practiceId: number, limit = 24) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(briefings)
    .where(eq(briefings.practiceId, practiceId))
    .orderBy(desc(briefings.year), desc(briefings.month), desc(briefings.id))
    .limit(limit);
}

export async function listAllBriefings(limit = 200) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(briefings)
    .orderBy(desc(briefings.generatedAt))
    .limit(limit);
}

// =============== Benchmarks ===============

export async function getBenchmarksForSpecialty(specialty: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(benchmarks)
    .where(eq(benchmarks.specialty, specialty))
    .orderBy(asc(benchmarks.metric));
}

export async function getAllBenchmarks() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(benchmarks).orderBy(asc(benchmarks.specialty), asc(benchmarks.metric));
}

export async function upsertBenchmark(input: InsertBenchmark) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db
    .select()
    .from(benchmarks)
    .where(
      and(eq(benchmarks.specialty, input.specialty), eq(benchmarks.metric, input.metric)),
    )
    .limit(1);
  if (existing.length > 0) {
    await db
      .update(benchmarks)
      .set({
        medianValue: input.medianValue,
        percentile25: input.percentile25 ?? existing[0].percentile25,
        percentile75: input.percentile75 ?? existing[0].percentile75,
        flagThreshold: input.flagThreshold ?? existing[0].flagThreshold,
        higherIsBetter: input.higherIsBetter ?? existing[0].higherIsBetter,
        unit: input.unit ?? existing[0].unit,
      })
      .where(eq(benchmarks.id, existing[0].id));
    return existing[0].id;
  }
  await db.insert(benchmarks).values(input);
  const after = await db
    .select()
    .from(benchmarks)
    .where(
      and(eq(benchmarks.specialty, input.specialty), eq(benchmarks.metric, input.metric)),
    )
    .limit(1);
  return after[0]?.id;
}

export async function bulkInsertBenchmarks(rows: InsertBenchmark[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (rows.length === 0) return;
  for (const row of rows) {
    await upsertBenchmark(row);
  }
}

export async function countBenchmarks() {
  const db = await getDb();
  if (!db) return 0;
  const rows = await db.select({ count: sql<number>`count(*)` }).from(benchmarks);
  return Number(rows[0]?.count ?? 0);
}

// =============== Aggregate helpers for admin ===============

export async function getPracticeBundlesForUserIds(userIds: number[]) {
  const db = await getDb();
  if (!db || userIds.length === 0) return [];
  return db.select().from(practices).where(inArray(practices.userId, userIds));
}
