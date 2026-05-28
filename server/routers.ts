import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { BLOG_POSTS } from "../shared/blog";
import { SPECIALTIES } from "../shared/aileron";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { generateBriefing } from "./_aileron/briefingGenerator";
import { BENCHMARK_SEEDS } from "./_aileron/benchmarkSeeds";
import {
  bulkInsertBenchmarks,
  countBenchmarks,
  getAllBenchmarks,
  getBenchmarksForSpecialty,
  getBriefingById,
  getBriefingHistory,
  getKpiHistory,
  getKpiSubmission,
  getLatestBriefing,
  getLatestKpiSubmission,
  getPracticeById,
  getPracticeByUserId,
  insertBriefing,
  listAllBriefings,
  listAllKpiSubmissions,
  listAllPractices,
  listAllUsers,
  upsertBenchmark,
  upsertKpiSubmission,
  upsertPractice,
} from "./db";

const specialtySlugs = SPECIALTIES.map(s => s.slug) as [string, ...string[]];

const optionalNumber = z
  .union([z.number(), z.string().regex(/^-?\d+(\.\d+)?$/)])
  .optional()
  .nullable();

const kpiInput = z.object({
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2020).max(2100),
  revenuePerProvider: optionalNumber,
  daysInAR: optionalNumber,
  netCollectionRate: optionalNumber,
  contractualAdjustmentRate: optionalNumber,
  insuranceMixCommercial: optionalNumber,
  avgReimbursementRate: optionalNumber,
  thirdNextAvailable: optionalNumber,
  noShowRate: optionalNumber,
  schedulingEfficiency: optionalNumber,
  staffToProviderRatio: optionalNumber,
  providerTurnoverRate: optionalNumber,
  staffTrainingInvestment: optionalNumber,
  operatingExpenseRatio: optionalNumber,
  costPerPatientVisit: optionalNumber,
  patientSatisfactionScore: optionalNumber,
  qualityComplianceRate: optionalNumber,
  notes: z.string().optional().nullable(),
});

function toStringOrNull(v: unknown): string | null {
  if (v === undefined || v === null || v === "") return null;
  return String(v);
}
function toIntOrNull(v: unknown): number | null {
  if (v === undefined || v === null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.round(n) : null;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ============== Blog (public) ==============
  blog: router({
    list: publicProcedure.query(() =>
      BLOG_POSTS.map(({ slug, title, excerpt, readingTimeMin, category }) => ({
        slug,
        title,
        excerpt,
        readingTimeMin,
        category,
      })),
    ),
    bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(({ input }) => {
      const post = BLOG_POSTS.find(p => p.slug === input.slug);
      if (!post) throw new TRPCError({ code: "NOT_FOUND", message: "Blog post not found" });
      return post;
    }),
  }),

  // ============== Practice ==============
  practice: router({
    me: protectedProcedure.query(async ({ ctx }) => {
      return getPracticeByUserId(ctx.user.id);
    }),
    upsert: protectedProcedure
      .input(
        z.object({
          name: z.string().min(2).max(255),
          specialty: z.enum(specialtySlugs),
          providerCount: z.number().int().min(1).max(500),
          groupTier: z.enum(["solo", "group"]).default("solo"),
          contactEmail: z.string().email().optional().nullable(),
          region: z.string().optional().nullable(),
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const monthlyRate = input.groupTier === "group" ? "349.00" : "199.00";
        const practice = await upsertPractice({
          userId: ctx.user.id,
          name: input.name,
          specialty: input.specialty,
          providerCount: input.providerCount,
          groupTier: input.groupTier,
          contactEmail: input.contactEmail ?? ctx.user.email ?? null,
          region: input.region ?? null,
          monthlyRate,
          subscriptionStatus: "trial",
        });
        return practice;
      }),
  }),

  // ============== KPI Submissions ==============
  kpi: router({
    submit: protectedProcedure.input(kpiInput).mutation(async ({ ctx, input }) => {
      const practice = await getPracticeByUserId(ctx.user.id);
      if (!practice) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Set up your practice profile before submitting KPIs.",
        });
      }
      const row = await upsertKpiSubmission({
        practiceId: practice.id,
        month: input.month,
        year: input.year,
        revenuePerProvider: toStringOrNull(input.revenuePerProvider),
        daysInAR: toIntOrNull(input.daysInAR),
        netCollectionRate: toStringOrNull(input.netCollectionRate),
        contractualAdjustmentRate: toStringOrNull(input.contractualAdjustmentRate),
        insuranceMixCommercial: toStringOrNull(input.insuranceMixCommercial),
        avgReimbursementRate: toStringOrNull(input.avgReimbursementRate),
        thirdNextAvailable: toIntOrNull(input.thirdNextAvailable),
        noShowRate: toStringOrNull(input.noShowRate),
        schedulingEfficiency: toStringOrNull(input.schedulingEfficiency),
        staffToProviderRatio: toStringOrNull(input.staffToProviderRatio),
        providerTurnoverRate: toStringOrNull(input.providerTurnoverRate),
        staffTrainingInvestment: toStringOrNull(input.staffTrainingInvestment),
        operatingExpenseRatio: toStringOrNull(input.operatingExpenseRatio),
        costPerPatientVisit: toStringOrNull(input.costPerPatientVisit),
        patientSatisfactionScore: toStringOrNull(input.patientSatisfactionScore),
        qualityComplianceRate: toStringOrNull(input.qualityComplianceRate),
        notes: input.notes ?? null,
      });
      return row;
    }),

    getByPeriod: protectedProcedure
      .input(z.object({ month: z.number().int(), year: z.number().int() }))
      .query(async ({ ctx, input }) => {
        const practice = await getPracticeByUserId(ctx.user.id);
        if (!practice) return null;
        return getKpiSubmission(practice.id, input.year, input.month);
      }),

    latest: protectedProcedure.query(async ({ ctx }) => {
      const practice = await getPracticeByUserId(ctx.user.id);
      if (!practice) return null;
      return getLatestKpiSubmission(practice.id);
    }),

    history: protectedProcedure
      .input(z.object({ limit: z.number().int().min(1).max(48).default(12) }).optional())
      .query(async ({ ctx, input }) => {
        const practice = await getPracticeByUserId(ctx.user.id);
        if (!practice) return [];
        return getKpiHistory(practice.id, input?.limit ?? 12);
      }),
  }),

  // ============== Briefings ==============
  briefing: router({
    latest: protectedProcedure.query(async ({ ctx }) => {
      const practice = await getPracticeByUserId(ctx.user.id);
      if (!practice) return null;
      return getLatestBriefing(practice.id);
    }),

    history: protectedProcedure.query(async ({ ctx }) => {
      const practice = await getPracticeByUserId(ctx.user.id);
      if (!practice) return [];
      return getBriefingHistory(practice.id);
    }),

    byId: protectedProcedure.input(z.object({ id: z.number().int() })).query(async ({ ctx, input }) => {
      const briefing = await getBriefingById(input.id);
      if (!briefing) throw new TRPCError({ code: "NOT_FOUND" });
      const practice = await getPracticeByUserId(ctx.user.id);
      if (!practice || (practice.id !== briefing.practiceId && ctx.user.role !== "admin")) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return briefing;
    }),

    generate: protectedProcedure
      .input(z.object({ month: z.number().int(), year: z.number().int() }))
      .mutation(async ({ ctx, input }) => {
        const practice = await getPracticeByUserId(ctx.user.id);
        if (!practice) {
          throw new TRPCError({ code: "PRECONDITION_FAILED", message: "Set up your practice first." });
        }
        const submission = await getKpiSubmission(practice.id, input.year, input.month);
        if (!submission) {
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: "Submit your KPIs for this period before generating a briefing.",
          });
        }
        // Find prior month's submission for trend.
        const priorMonth = input.month === 1 ? 12 : input.month - 1;
        const priorYear = input.month === 1 ? input.year - 1 : input.year;
        const prior = await getKpiSubmission(practice.id, priorYear, priorMonth);
        const bench = await getBenchmarksForSpecialty(practice.specialty);
        const generated = await generateBriefing({
          practice,
          submission,
          prior: prior ?? undefined,
          bench,
        });
        const inserted = await insertBriefing({
          practiceId: practice.id,
          kpiSubmissionId: submission.id,
          month: input.month,
          year: input.year,
          title: generated.title,
          executiveSummary: generated.executiveSummary,
          narrative: generated.narrative,
          recommendations: generated.recommendations,
          status: "published",
        });
        return inserted;
      }),
  }),

  // ============== Benchmarks ==============
  benchmark: router({
    forSpecialty: publicProcedure
      .input(z.object({ specialty: z.enum(specialtySlugs) }))
      .query(async ({ input }) => getBenchmarksForSpecialty(input.specialty)),

    all: publicProcedure.query(() => getAllBenchmarks()),

    seedIfEmpty: publicProcedure.mutation(async () => {
      const count = await countBenchmarks();
      if (count > 0) return { seeded: 0, total: count };
      await bulkInsertBenchmarks(BENCHMARK_SEEDS);
      const newCount = await countBenchmarks();
      return { seeded: newCount, total: newCount };
    }),
  }),

  // ============== Admin ==============
  admin: router({
    users: adminProcedure.query(() => listAllUsers()),
    practices: adminProcedure.query(() => listAllPractices()),
    submissions: adminProcedure.query(() => listAllKpiSubmissions()),
    briefings: adminProcedure.query(() => listAllBriefings()),
    benchmarks: adminProcedure.query(() => getAllBenchmarks()),

    upsertBenchmark: adminProcedure
      .input(
        z.object({
          specialty: z.enum(specialtySlugs),
          metric: z.string(),
          medianValue: z.number(),
          percentile25: z.number().nullable().optional(),
          percentile75: z.number().nullable().optional(),
          flagThreshold: z.number().nullable().optional(),
          higherIsBetter: z.number().int().min(0).max(1),
          unit: z.string().optional().nullable(),
        }),
      )
      .mutation(async ({ input }) => {
        return upsertBenchmark({
          specialty: input.specialty,
          metric: input.metric,
          medianValue: String(input.medianValue),
          percentile25: input.percentile25 != null ? String(input.percentile25) : null,
          percentile75: input.percentile75 != null ? String(input.percentile75) : null,
          flagThreshold: input.flagThreshold != null ? String(input.flagThreshold) : null,
          higherIsBetter: input.higherIsBetter,
          unit: input.unit ?? null,
        });
      }),

    seedBenchmarks: adminProcedure.mutation(async () => {
      await bulkInsertBenchmarks(BENCHMARK_SEEDS);
      return { ok: true, total: await countBenchmarks() };
    }),

    generateBriefingForPractice: adminProcedure
      .input(
        z.object({
          practiceId: z.number().int(),
          month: z.number().int(),
          year: z.number().int(),
        }),
      )
      .mutation(async ({ input }) => {
        const practice = await getPracticeById(input.practiceId);
        if (!practice) throw new TRPCError({ code: "NOT_FOUND" });
        const submission = await getKpiSubmission(practice.id, input.year, input.month);
        if (!submission) {
          throw new TRPCError({
            code: "PRECONDITION_FAILED",
            message: "No KPI submission found for that period.",
          });
        }
        const priorMonth = input.month === 1 ? 12 : input.month - 1;
        const priorYear = input.month === 1 ? input.year - 1 : input.year;
        const prior = await getKpiSubmission(practice.id, priorYear, priorMonth);
        const bench = await getBenchmarksForSpecialty(practice.specialty);
        const generated = await generateBriefing({
          practice,
          submission,
          prior: prior ?? undefined,
          bench,
        });
        return insertBriefing({
          practiceId: practice.id,
          kpiSubmissionId: submission.id,
          month: input.month,
          year: input.year,
          title: generated.title,
          executiveSummary: generated.executiveSummary,
          narrative: generated.narrative,
          recommendations: generated.recommendations,
          status: "published",
        });
      }),
  }),
});

export type AppRouter = typeof appRouter;
