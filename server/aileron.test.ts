import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import {
  KPI_DEFINITIONS,
  KPI_DOMAINS,
  formatKpiValue,
  statusForValue,
} from "../shared/aileron";
import { BLOG_POSTS } from "../shared/blog";
import { BENCHMARK_SEEDS } from "./_aileron/benchmarkSeeds";
import { SPECIALTIES } from "../shared/aileron";
import { SPECIALTY_DOSSIERS } from "../shared/specialtyResources";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: () => undefined,
    } as unknown as TrpcContext["res"],
  };
}

describe("KPI definitions", () => {
  it("ships exactly 16 KPIs across 6 domains", () => {
    expect(KPI_DEFINITIONS).toHaveLength(16);
    expect(KPI_DOMAINS).toHaveLength(6);
    for (const def of KPI_DEFINITIONS) {
      expect(KPI_DOMAINS).toContain(def.domain);
    }
  });

  it("formats values according to unit", () => {
    expect(formatKpiValue(38000, "usd")).toBe("$38,000");
    expect(formatKpiValue(36, "days")).toBe("36 days");
    expect(formatKpiValue(96.4, "percent")).toBe("96.4%");
    expect(formatKpiValue(4.0, "ratio")).toBe("4.00");
    expect(formatKpiValue(4.6, "score")).toBe("4.6 / 5");
    expect(formatKpiValue(null, "usd")).toBe("—");
  });
});

describe("statusForValue", () => {
  it("flags low values for higher-is-better metrics", () => {
    // higherIsBetter, value 70 vs median 100, flag 75 → flag
    expect(statusForValue(70, 100, 75, true)).toBe("flag");
    expect(statusForValue(110, 100, 75, true)).toBe("good");
    expect(statusForValue(85, 100, 75, true)).toBe("watch");
  });
  it("flags high values for lower-is-better metrics", () => {
    expect(statusForValue(50, 30, 45, false)).toBe("flag");
    expect(statusForValue(25, 30, 45, false)).toBe("good");
    expect(statusForValue(35, 30, 45, false)).toBe("watch");
  });
  it("returns null for missing inputs", () => {
    expect(statusForValue(null, 30, 45, true)).toBeNull();
    expect(statusForValue(30, null, 45, true)).toBeNull();
  });
});

describe("blog router", () => {
  it("returns 15 posts with required metadata fields", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const list = await caller.blog.list();
    expect(list).toHaveLength(15);
    for (const post of list) {
      expect(post.slug).toBeTruthy();
      expect(post.title).toBeTruthy();
      expect(post.excerpt).toBeTruthy();
      expect(post.category).toBeTruthy();
      expect(post.readingTimeMin).toBeGreaterThan(0);
    }
  });

  it("fetches a post by slug with body content", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const sample = BLOG_POSTS[0];
    const post = await caller.blog.bySlug({ slug: sample.slug });
    expect(post.slug).toBe(sample.slug);
    expect(post.body.length).toBeGreaterThan(50);
  });

  it("throws on missing slug", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.blog.bySlug({ slug: "does-not-exist" })).rejects.toThrow();
  });
});

describe("benchmark seeds", () => {
  it("covers 16 metrics for every supported specialty", () => {
    const slugs = SPECIALTIES.map(s => s.slug);
    expect(slugs.length).toBe(11);
    expect(BENCHMARK_SEEDS.length).toBe(slugs.length * 16);
    const specialties = new Set(BENCHMARK_SEEDS.map(b => b.specialty));
    expect(specialties.size).toBe(slugs.length);
    // Every specialty in the canonical list must have exactly 16 seeded metrics.
    for (const slug of slugs) {
      const rows = BENCHMARK_SEEDS.filter(b => b.specialty === slug);
      expect(rows.length, `benchmark rows for ${slug}`).toBe(16);
    }
  });

  it("has a dossier (briefing + resources) for every specialty", () => {
    for (const { slug } of SPECIALTIES) {
      const dossier = SPECIALTY_DOSSIERS[slug];
      expect(dossier, `dossier for ${slug}`).toBeTruthy();
      expect(dossier.briefing.state.length).toBeGreaterThan(40);
      expect(dossier.briefing.trends.length).toBeGreaterThanOrEqual(3);
      expect(dossier.resources.length).toBeGreaterThanOrEqual(3);
    }
  });
});
