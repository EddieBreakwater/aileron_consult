/**
 * AileronMD Consult — shared domain constants.
 * Used by both client and server. Keep this file pure (no runtime imports).
 */

export const SPECIALTIES = [
  { slug: "primary_care", label: "Primary Care" },
  { slug: "gastroenterology", label: "Gastroenterology" },
  { slug: "orthopedics", label: "Orthopedics" },
  { slug: "hematology_oncology", label: "Hematology / Oncology" },
  { slug: "optometry", label: "Optometry" },
  { slug: "ophthalmology", label: "Ophthalmology" },
  { slug: "urology", label: "Urology" },
  { slug: "plastic_surgery", label: "Plastic Surgery" },
  { slug: "radiology", label: "Radiology" },
  { slug: "cardiology", label: "Cardiology" },
  { slug: "pain_management", label: "Pain Management" },
] as const;

export type SpecialtySlug = (typeof SPECIALTIES)[number]["slug"];

export const SPECIALTY_LABELS: Record<string, string> = Object.fromEntries(
  SPECIALTIES.map(s => [s.slug, s.label]),
);

export const PRICING = {
  solo: { id: "solo", label: "Solo Practice", price: 199, period: "month" },
  group: { id: "group", label: "Group Practice", price: 349, period: "month" },
} as const;

/**
 * 16 KPIs across 6 domains.
 * `key` matches the column name in the kpiSubmissions table.
 */
export type KpiUnit = "usd" | "days" | "percent" | "ratio" | "score";
export type KpiDomain =
  | "Revenue Cycle"
  | "Payer Contracts"
  | "Scheduling & Access"
  | "People & Staffing"
  | "Overhead"
  | "Resilience";

export interface KpiDef {
  key: string;
  label: string;
  short: string;
  domain: KpiDomain;
  unit: KpiUnit;
  /** Whether higher is better (for benchmarking direction). */
  higherIsBetter: boolean;
  /** Helper text shown on the form. */
  helper: string;
  /** Where to find the data in EHR. */
  source: string;
}

export const KPI_DEFINITIONS: KpiDef[] = [
  // Domain 1: Revenue Cycle
  {
    key: "revenuePerProvider",
    label: "Revenue per Provider",
    short: "Revenue / Provider",
    domain: "Revenue Cycle",
    unit: "usd",
    higherIsBetter: true,
    helper: "Total monthly revenue divided by number of full-time-equivalent providers.",
    source: "EHR Revenue Report ÷ # of FTE providers",
  },
  {
    key: "daysInAR",
    label: "Days in Accounts Receivable (A/R)",
    short: "Days in A/R",
    domain: "Revenue Cycle",
    unit: "days",
    higherIsBetter: false,
    helper: "Average number of days from charge to collection.",
    source: "EHR A/R Aging Report",
  },
  {
    key: "netCollectionRate",
    label: "Net Collection Rate",
    short: "Net Collection",
    domain: "Revenue Cycle",
    unit: "percent",
    higherIsBetter: true,
    helper: "Collections as a percentage of charges, after contractual adjustments.",
    source: "(Collections ÷ Charges) × 100",
  },
  {
    key: "contractualAdjustmentRate",
    label: "Contractual Adjustment Rate",
    short: "Contract. Adj.",
    domain: "Revenue Cycle",
    unit: "percent",
    higherIsBetter: false,
    helper: "Adjustments as a percentage of gross revenue.",
    source: "(Adjustments ÷ Gross Revenue) × 100",
  },

  // Domain 2: Payer Contracts
  {
    key: "insuranceMixCommercial",
    label: "Insurance Mix (% Commercial)",
    short: "% Commercial",
    domain: "Payer Contracts",
    unit: "percent",
    higherIsBetter: true,
    helper: "Share of revenue from commercial payers.",
    source: "EHR Payer Mix Report",
  },
  {
    key: "avgReimbursementRate",
    label: "Average Reimbursement Rate",
    short: "Avg. Reimbursement",
    domain: "Payer Contracts",
    unit: "percent",
    higherIsBetter: true,
    helper: "Average allowed amount divided by gross charge.",
    source: "EHR Payer Contracts",
  },

  // Domain 3: Scheduling & Access
  {
    key: "thirdNextAvailable",
    label: "Third Next Available Appointment",
    short: "Third Next Avail.",
    domain: "Scheduling & Access",
    unit: "days",
    higherIsBetter: false,
    helper: "Average days until the third available appointment slot.",
    source: "EHR Scheduling Report",
  },
  {
    key: "noShowRate",
    label: "No-Show Rate",
    short: "No-Show Rate",
    domain: "Scheduling & Access",
    unit: "percent",
    higherIsBetter: false,
    helper: "Share of appointments where the patient did not arrive.",
    source: "(No-Shows ÷ Total Appointments) × 100",
  },
  {
    key: "schedulingEfficiency",
    label: "Scheduling Efficiency",
    short: "Scheduling Eff.",
    domain: "Scheduling & Access",
    unit: "percent",
    higherIsBetter: true,
    helper: "Provider-utilized time as a share of available scheduled time.",
    source: "(Scheduled Hours ÷ Available Hours) × 100",
  },

  // Domain 4: People & Staffing
  {
    key: "staffToProviderRatio",
    label: "Staff-to-Provider Ratio",
    short: "Staff / Provider",
    domain: "People & Staffing",
    unit: "ratio",
    higherIsBetter: false,
    helper: "Total FTE staff divided by total FTE providers.",
    source: "EHR Staffing Report",
  },
  {
    key: "providerTurnoverRate",
    label: "Provider Turnover Rate",
    short: "Provider Turnover",
    domain: "People & Staffing",
    unit: "percent",
    higherIsBetter: false,
    helper: "Annualized share of providers who have left.",
    source: "Trailing-12-month separations ÷ avg. providers",
  },
  {
    key: "staffTrainingInvestment",
    label: "Staff Training Investment",
    short: "Training Spend",
    domain: "People & Staffing",
    unit: "percent",
    higherIsBetter: true,
    helper: "Training budget as a share of total payroll.",
    source: "Training $ ÷ Total Payroll × 100",
  },

  // Domain 5: Overhead
  {
    key: "operatingExpenseRatio",
    label: "Operating Expense Ratio",
    short: "Op. Expense Ratio",
    domain: "Overhead",
    unit: "percent",
    higherIsBetter: false,
    helper: "Operating expenses as a share of net revenue.",
    source: "Operating Expenses ÷ Net Revenue × 100",
  },
  {
    key: "costPerPatientVisit",
    label: "Cost per Patient Visit",
    short: "Cost / Visit",
    domain: "Overhead",
    unit: "usd",
    higherIsBetter: false,
    helper: "Total operating expenses divided by total patient visits.",
    source: "Op. Expenses ÷ Total Visits",
  },

  // Domain 6: Resilience
  {
    key: "patientSatisfactionScore",
    label: "Patient Satisfaction Score",
    short: "Pt. Satisfaction",
    domain: "Resilience",
    unit: "score",
    higherIsBetter: true,
    helper: "Average patient satisfaction score (out of 5).",
    source: "Press Ganey or in-EHR survey",
  },
  {
    key: "qualityComplianceRate",
    label: "Quality Compliance Rate",
    short: "Quality Compliance",
    domain: "Resilience",
    unit: "percent",
    higherIsBetter: true,
    helper: "Share of quality measures in compliance.",
    source: "Compliant measures ÷ Total measures × 100",
  },
];

export const KPI_DOMAINS: KpiDomain[] = [
  "Revenue Cycle",
  "Payer Contracts",
  "Scheduling & Access",
  "People & Staffing",
  "Overhead",
  "Resilience",
];

export function kpiByKey(key: string): KpiDef | undefined {
  return KPI_DEFINITIONS.find(k => k.key === key);
}

export function formatKpiValue(value: number | string | null | undefined, unit: KpiUnit): string {
  if (value === null || value === undefined || value === "") return "—";
  const n = typeof value === "string" ? Number(value) : value;
  if (!Number.isFinite(n)) return "—";
  switch (unit) {
    case "usd":
      return n >= 1000
        ? `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
        : `$${n.toFixed(2)}`;
    case "days":
      return `${n.toFixed(0)} days`;
    case "percent":
      return `${n.toFixed(1)}%`;
    case "ratio":
      return n.toFixed(2);
    case "score":
      return `${n.toFixed(1)} / 5`;
  }
}

/** Return signed delta in standard direction (positive = better). */
export function deltaInGoodDirection(
  current: number,
  prior: number | null | undefined,
  higherIsBetter: boolean,
): number | null {
  if (prior === null || prior === undefined || !Number.isFinite(prior)) return null;
  const raw = current - prior;
  return higherIsBetter ? raw : -raw;
}

export type BenchmarkStatus = "good" | "watch" | "flag";

export function statusForValue(
  value: number | null | undefined,
  median: number | null | undefined,
  flag: number | null | undefined,
  higherIsBetter: boolean,
): BenchmarkStatus | null {
  if (value === null || value === undefined || median === null || median === undefined) return null;
  if (higherIsBetter) {
    if (flag !== null && flag !== undefined && value < flag) return "flag";
    if (value >= median) return "good";
    return "watch";
  } else {
    if (flag !== null && flag !== undefined && value > flag) return "flag";
    if (value <= median) return "good";
    return "watch";
  }
}
