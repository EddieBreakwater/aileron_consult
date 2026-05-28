import {
  KPI_DEFINITIONS,
  SPECIALTY_LABELS,
  formatKpiValue,
  statusForValue,
} from "../../shared/aileron";
import type { Benchmark, KpiSubmission, Practice } from "../../drizzle/schema";
import { invokeLLM } from "../_core/llm";

interface ScoredKpi {
  key: string;
  label: string;
  domain: string;
  unit: string;
  value: number | null;
  prior: number | null;
  median: number | null;
  flag: number | null;
  higherIsBetter: boolean;
  status: "good" | "watch" | "flag" | null;
  delta: number | null;
}

function num(v: unknown): number | null {
  if (v === null || v === undefined) return null;
  const n = typeof v === "string" ? Number(v) : (v as number);
  return Number.isFinite(n) ? n : null;
}

export function scoreKpis(
  submission: KpiSubmission,
  prior: KpiSubmission | undefined,
  bench: Benchmark[],
): ScoredKpi[] {
  const benchByMetric = new Map(bench.map(b => [b.metric, b]));
  return KPI_DEFINITIONS.map(def => {
    const value = num((submission as Record<string, unknown>)[def.key]);
    const priorVal = prior ? num((prior as Record<string, unknown>)[def.key]) : null;
    const b = benchByMetric.get(def.key);
    const median = b ? num(b.medianValue) : null;
    const flag = b ? num(b.flagThreshold) : null;
    const status = statusForValue(value, median, flag, def.higherIsBetter);
    const delta = value !== null && priorVal !== null ? value - priorVal : null;
    return {
      key: def.key,
      label: def.label,
      domain: def.domain,
      unit: def.unit,
      value,
      prior: priorVal,
      median,
      flag,
      higherIsBetter: def.higherIsBetter,
      status,
      delta,
    };
  });
}

export interface GeneratedBriefing {
  title: string;
  executiveSummary: string;
  narrative: string; // markdown
  recommendations: string; // markdown
}

export async function generateBriefing(args: {
  practice: Practice;
  submission: KpiSubmission;
  prior?: KpiSubmission;
  bench: Benchmark[];
}): Promise<GeneratedBriefing> {
  const { practice, submission, prior, bench } = args;
  const scored = scoreKpis(submission, prior, bench);
  const specialtyLabel = SPECIALTY_LABELS[practice.specialty] ?? practice.specialty;

  const monthName = new Date(submission.year, submission.month - 1, 1).toLocaleString("en-US", {
    month: "long",
  });

  const flagged = scored.filter(s => s.status === "flag");
  const watch = scored.filter(s => s.status === "watch");
  const good = scored.filter(s => s.status === "good");

  const fmt = (v: number | null, unit: string) =>
    v === null ? "—" : formatKpiValue(v, unit as "usd" | "days" | "percent" | "ratio" | "score");

  const tableRows = scored
    .map(s => {
      const arrow =
        s.delta === null ? "" : s.higherIsBetter
          ? s.delta >= 0
            ? "↑"
            : "↓"
          : s.delta <= 0
            ? "↑"
            : "↓";
      const statusLabel =
        s.status === "good"
          ? "On band"
          : s.status === "watch"
            ? "To watch"
            : s.status === "flag"
              ? "Flagged"
              : "—";
      return `| **${s.label}** | ${fmt(s.value, s.unit)} ${arrow} | ${fmt(s.median, s.unit)} | ${statusLabel} |`;
    })
    .join("\n");

  const systemPrompt = [
    "You are a senior medical practice operations advisor writing a monthly briefing.",
    "Tone: warm, advisory, plainspoken. Avoid jargon. Do not use em dashes.",
    "Audience: practice owner / office manager / administrator.",
    "Constraints:",
    "- 3-4 paragraphs in the narrative section.",
    "- Reference specific KPI values, never invent numbers.",
    "- Use the specialty context to interpret figures.",
    "- Output strict JSON conforming to the schema.",
  ].join("\n");

  const userPrompt = [
    `Practice: ${practice.name}`,
    `Specialty: ${specialtyLabel}`,
    `Period: ${monthName} ${submission.year}`,
    `Provider count: ${practice.providerCount}`,
    "",
    "Scored KPIs (current value, prior, specialty median, status):",
    ...scored.map(
      s =>
        `- ${s.label} (${s.domain}): current=${fmt(s.value, s.unit)}, prior=${fmt(s.prior, s.unit)}, median=${fmt(s.median, s.unit)}, status=${s.status ?? "—"}`,
    ),
    "",
    `Flagged: ${flagged.map(s => s.label).join(", ") || "None"}`,
    `To watch: ${watch.map(s => s.label).join(", ") || "None"}`,
    `On band: ${good.map(s => s.label).join(", ") || "None"}`,
    "",
    "Write the briefing now.",
  ].join("\n");

  let llmResult: GeneratedBriefing | null = null;
  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "monthly_briefing",
          strict: true,
          schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              executiveSummary: { type: "string" },
              narrative: { type: "string", description: "Markdown body, 3-4 paragraphs." },
              recommendations: {
                type: "string",
                description: "Markdown bullet list, 3-4 prioritized recommendations.",
              },
            },
            required: ["title", "executiveSummary", "narrative", "recommendations"],
            additionalProperties: false,
          },
        },
      },
    });
    const rawContent = response.choices?.[0]?.message?.content;
    const content = typeof rawContent === "string"
      ? rawContent
      : Array.isArray(rawContent)
        ? rawContent.map(p => ("text" in p ? p.text : "")).join("")
        : "";
    if (content.trim().length > 0) {
      llmResult = JSON.parse(content) as GeneratedBriefing;
    }
  } catch (err) {
    console.warn("[Briefing] LLM generation failed, falling back:", err);
  }

  if (llmResult) {
    return {
      ...llmResult,
      narrative: appendScorecard(llmResult.narrative, tableRows),
    };
  }

  // Deterministic fallback if LLM unavailable.
  const exec = `${practice.name} delivered ${good.length} on-band KPIs, with ${watch.length} on watch and ${flagged.length} flagged for ${monthName} ${submission.year}. Focus this month on the ${flagged[0]?.label ?? watch[0]?.label ?? "top priority"} opportunity.`;
  const narrative = [
    `## Executive Summary`,
    "",
    exec,
    "",
    `## Operational Performance`,
    "",
    `For ${monthName} ${submission.year}, ${practice.name} reported ${scored.length} KPIs across six operating domains. ${good.length} are on band against the ${specialtyLabel.toLowerCase()} median, ${watch.length} are tracking below median (worth a closer read next month), and ${flagged.length} are flagged for action this period.`,
    "",
    flagged.length > 0
      ? `The most material flag is **${flagged[0].label}** at ${fmt(flagged[0].value, flagged[0].unit)} against a specialty median of ${fmt(flagged[0].median, flagged[0].unit)}. Closing this gap is the highest-leverage action you can take this month.`
      : `No KPIs are flagged this month. Continue the current operating rhythm and use this period to compound on the items in the watch list.`,
    "",
    `Cash conversion, scheduling, and patient experience metrics tell a coherent story when read together. The recommendations below sequence them in priority order so your team can act, not just analyze.`,
  ].join("\n");

  const recsList = [
    ...flagged.slice(0, 2),
    ...watch.slice(0, 2),
  ].slice(0, 4);
  const recommendations = recsList.length
    ? recsList
        .map((s, i) => {
          const direction = s.higherIsBetter ? "raise" : "reduce";
          return `${i + 1}. **${s.label}.** Current ${fmt(s.value, s.unit)} vs. specialty median ${fmt(s.median, s.unit)}. Goal this month: ${direction} toward median by 30 days.`;
        })
        .join("\n")
    : "1. Maintain current operating rhythm. Use this month to compound the gains already on band.";

  return {
    title: `${practice.name} — ${monthName} ${submission.year} Briefing`,
    executiveSummary: exec,
    narrative: appendScorecard(narrative, tableRows),
    recommendations,
  };
}

function appendScorecard(narrativeMd: string, tableRows: string) {
  return `${narrativeMd}

## KPI Scorecard

| KPI | This Month | Specialty Median | Status |
| --- | --- | --- | --- |
${tableRows}
`;
}
