import {
  decimal,
  index,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Practice profile owned by a user.
 * One user owns one practice (uniqueIndex on userId).
 */
export const practices = mysqlTable(
  "practices",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    specialty: varchar("specialty", { length: 64 }).notNull(),
    providerCount: int("providerCount").default(1).notNull(),
    groupTier: mysqlEnum("groupTier", ["solo", "group"]).default("solo").notNull(),
    monthlyRate: decimal("monthlyRate", { precision: 10, scale: 2 }),
    subscriptionStatus: mysqlEnum("subscriptionStatus", [
      "trial",
      "active",
      "canceled",
      "past_due",
    ])
      .default("trial")
      .notNull(),
    contactEmail: varchar("contactEmail", { length: 320 }),
    region: varchar("region", { length: 64 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    userIdIdx: uniqueIndex("practices_userId_idx").on(table.userId),
    specialtyIdx: index("practices_specialty_idx").on(table.specialty),
  }),
);

export type Practice = typeof practices.$inferSelect;
export type InsertPractice = typeof practices.$inferInsert;

/**
 * Monthly KPI submissions.
 * 16 KPIs across 6 domains per the Data Submission Guide.
 * Stored as decimal/int. One submission per practice per month/year.
 */
export const kpiSubmissions = mysqlTable(
  "kpiSubmissions",
  {
    id: int("id").autoincrement().primaryKey(),
    practiceId: int("practiceId").notNull(),
    month: int("month").notNull(), // 1-12
    year: int("year").notNull(),

    // Domain 1: Revenue Cycle
    revenuePerProvider: decimal("revenuePerProvider", { precision: 12, scale: 2 }),
    daysInAR: int("daysInAR"),
    netCollectionRate: decimal("netCollectionRate", { precision: 5, scale: 2 }),
    contractualAdjustmentRate: decimal("contractualAdjustmentRate", {
      precision: 5,
      scale: 2,
    }),

    // Domain 2: Payer Contracts
    insuranceMixCommercial: decimal("insuranceMixCommercial", { precision: 5, scale: 2 }),
    avgReimbursementRate: decimal("avgReimbursementRate", { precision: 5, scale: 2 }),

    // Domain 3: Scheduling & Access
    thirdNextAvailable: int("thirdNextAvailable"),
    noShowRate: decimal("noShowRate", { precision: 5, scale: 2 }),
    schedulingEfficiency: decimal("schedulingEfficiency", { precision: 5, scale: 2 }),

    // Domain 4: People & Staffing
    staffToProviderRatio: decimal("staffToProviderRatio", { precision: 5, scale: 2 }),
    providerTurnoverRate: decimal("providerTurnoverRate", { precision: 5, scale: 2 }),
    staffTrainingInvestment: decimal("staffTrainingInvestment", {
      precision: 5,
      scale: 2,
    }),

    // Domain 5: Overhead
    operatingExpenseRatio: decimal("operatingExpenseRatio", { precision: 5, scale: 2 }),
    costPerPatientVisit: decimal("costPerPatientVisit", { precision: 10, scale: 2 }),

    // Domain 6: Resilience
    patientSatisfactionScore: decimal("patientSatisfactionScore", {
      precision: 3,
      scale: 2,
    }),
    qualityComplianceRate: decimal("qualityComplianceRate", { precision: 5, scale: 2 }),

    notes: text("notes"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    submissionPeriodIdx: uniqueIndex("kpi_submissions_period_idx").on(
      table.practiceId,
      table.year,
      table.month,
    ),
  }),
);

export type KpiSubmission = typeof kpiSubmissions.$inferSelect;
export type InsertKpiSubmission = typeof kpiSubmissions.$inferInsert;

/**
 * Generated briefings (LLM narrative + structured insights).
 */
export const briefings = mysqlTable(
  "briefings",
  {
    id: int("id").autoincrement().primaryKey(),
    practiceId: int("practiceId").notNull(),
    kpiSubmissionId: int("kpiSubmissionId").notNull(),
    month: int("month").notNull(),
    year: int("year").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    executiveSummary: text("executiveSummary").notNull(),
    narrative: text("narrative").notNull(), // markdown
    recommendations: text("recommendations"), // markdown — bulletized priority actions
    status: mysqlEnum("status", ["draft", "published", "delivered"])
      .default("published")
      .notNull(),
    generatedAt: timestamp("generatedAt").defaultNow().notNull(),
  },
  table => ({
    briefingPeriodIdx: index("briefings_period_idx").on(
      table.practiceId,
      table.year,
      table.month,
    ),
  }),
);

export type Briefing = typeof briefings.$inferSelect;
export type InsertBriefing = typeof briefings.$inferInsert;

/**
 * Specialty-specific benchmarks.
 * One row per (specialty, metric).
 */
export const benchmarks = mysqlTable(
  "benchmarks",
  {
    id: int("id").autoincrement().primaryKey(),
    specialty: varchar("specialty", { length: 64 }).notNull(),
    metric: varchar("metric", { length: 64 }).notNull(),
    medianValue: decimal("medianValue", { precision: 12, scale: 2 }).notNull(),
    percentile25: decimal("percentile25", { precision: 12, scale: 2 }),
    percentile75: decimal("percentile75", { precision: 12, scale: 2 }),
    flagThreshold: decimal("flagThreshold", { precision: 12, scale: 2 }),
    higherIsBetter: int("higherIsBetter").default(1).notNull(),
    unit: varchar("unit", { length: 16 }),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => ({
    benchmarkUnique: uniqueIndex("benchmarks_specialty_metric_idx").on(
      table.specialty,
      table.metric,
    ),
  }),
);

export type Benchmark = typeof benchmarks.$inferSelect;
export type InsertBenchmark = typeof benchmarks.$inferInsert;
