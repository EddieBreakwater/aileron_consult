/**
 * Specialty-specific benchmark seed values.
 * Each row maps a (specialty, metric) pair to median, p25, p75, flag threshold.
 *
 * Numbers are realistic but illustrative, drawn from MGMA-style ranges adjusted by specialty.
 * higherIsBetter: 1 = good when higher; 0 = good when lower.
 */

import type { InsertBenchmark } from "../../drizzle/schema";

type BenchmarkRow = Omit<InsertBenchmark, "updatedAt">;

const MAKE = (
  specialty: string,
  rows: Array<[string, number, number | null, number | null, number | null, 0 | 1, string | null]>,
): BenchmarkRow[] =>
  rows.map(([metric, median, p25, p75, flag, higherIsBetter, unit]) => ({
    specialty,
    metric,
    medianValue: String(median),
    percentile25: p25 === null ? null : String(p25),
    percentile75: p75 === null ? null : String(p75),
    flagThreshold: flag === null ? null : String(flag),
    higherIsBetter,
    unit,
  }));

export const BENCHMARK_SEEDS: BenchmarkRow[] = [
  // Primary Care
  ...MAKE("primary_care", [
    ["revenuePerProvider", 38000, 30000, 46000, 25000, 1, "usd"],
    ["daysInAR", 36, 28, 44, 55, 0, "days"],
    ["netCollectionRate", 96.0, 93.5, 97.8, 90, 1, "percent"],
    ["contractualAdjustmentRate", 36, 30, 42, 50, 0, "percent"],
    ["insuranceMixCommercial", 58, 45, 70, 30, 1, "percent"],
    ["avgReimbursementRate", 62, 55, 70, 50, 1, "percent"],
    ["thirdNextAvailable", 6, 3, 12, 21, 0, "days"],
    ["noShowRate", 8.0, 5.5, 10.5, 15, 0, "percent"],
    ["schedulingEfficiency", 82, 75, 90, 65, 1, "percent"],
    ["staffToProviderRatio", 4.0, 3.4, 4.6, 5.5, 0, "ratio"],
    ["providerTurnoverRate", 9, 5, 14, 20, 0, "percent"],
    ["staffTrainingInvestment", 1.8, 1.0, 2.6, 0.5, 1, "percent"],
    ["operatingExpenseRatio", 62, 55, 68, 75, 0, "percent"],
    ["costPerPatientVisit", 175, 150, 210, 260, 0, "usd"],
    ["patientSatisfactionScore", 4.5, 4.2, 4.7, 4.0, 1, "score"],
    ["qualityComplianceRate", 92, 87, 96, 80, 1, "percent"],
  ]),

  // Gastroenterology
  ...MAKE("gastroenterology", [
    ["revenuePerProvider", 75000, 60000, 90000, 45000, 1, "usd"],
    ["daysInAR", 38, 30, 46, 58, 0, "days"],
    ["netCollectionRate", 96.2, 93.5, 98.0, 90, 1, "percent"],
    ["contractualAdjustmentRate", 32, 26, 38, 46, 0, "percent"],
    ["insuranceMixCommercial", 64, 50, 76, 35, 1, "percent"],
    ["avgReimbursementRate", 70, 62, 78, 55, 1, "percent"],
    ["thirdNextAvailable", 15, 10, 22, 30, 0, "days"],
    ["noShowRate", 7.4, 5.0, 10.0, 14, 0, "percent"],
    ["schedulingEfficiency", 80, 73, 88, 65, 1, "percent"],
    ["staffToProviderRatio", 2.5, 2.0, 3.0, 3.8, 0, "ratio"],
    ["providerTurnoverRate", 8, 4, 12, 18, 0, "percent"],
    ["staffTrainingInvestment", 2.0, 1.2, 2.8, 0.5, 1, "percent"],
    ["operatingExpenseRatio", 66, 60, 72, 78, 0, "percent"],
    ["costPerPatientVisit", 220, 185, 260, 320, 0, "usd"],
    ["patientSatisfactionScore", 4.5, 4.2, 4.7, 4.0, 1, "score"],
    ["qualityComplianceRate", 93, 88, 96, 80, 1, "percent"],
  ]),

  // Orthopedics
  ...MAKE("orthopedics", [
    ["revenuePerProvider", 95000, 75000, 115000, 55000, 1, "usd"],
    ["daysInAR", 40, 32, 48, 60, 0, "days"],
    ["netCollectionRate", 95.8, 93.0, 97.6, 90, 1, "percent"],
    ["contractualAdjustmentRate", 34, 28, 40, 48, 0, "percent"],
    ["insuranceMixCommercial", 68, 55, 80, 40, 1, "percent"],
    ["avgReimbursementRate", 72, 64, 80, 56, 1, "percent"],
    ["thirdNextAvailable", 14, 8, 20, 30, 0, "days"],
    ["noShowRate", 9.0, 6.0, 12.0, 17, 0, "percent"],
    ["schedulingEfficiency", 78, 70, 86, 62, 1, "percent"],
    ["staffToProviderRatio", 3.2, 2.6, 3.8, 4.6, 0, "ratio"],
    ["providerTurnoverRate", 7, 4, 11, 17, 0, "percent"],
    ["staffTrainingInvestment", 1.8, 1.0, 2.6, 0.5, 1, "percent"],
    ["operatingExpenseRatio", 64, 58, 70, 76, 0, "percent"],
    ["costPerPatientVisit", 240, 200, 290, 340, 0, "usd"],
    ["patientSatisfactionScore", 4.4, 4.1, 4.6, 3.9, 1, "score"],
    ["qualityComplianceRate", 91, 86, 95, 78, 1, "percent"],
  ]),

  // Hematology / Oncology
  ...MAKE("hematology_oncology", [
    ["revenuePerProvider", 120000, 95000, 150000, 70000, 1, "usd"],
    ["daysInAR", 42, 34, 52, 65, 0, "days"],
    ["netCollectionRate", 96.5, 94.0, 98.2, 91, 1, "percent"],
    ["contractualAdjustmentRate", 28, 22, 34, 42, 0, "percent"],
    ["insuranceMixCommercial", 60, 48, 72, 35, 1, "percent"],
    ["avgReimbursementRate", 74, 66, 82, 58, 1, "percent"],
    ["thirdNextAvailable", 5, 2, 9, 14, 0, "days"],
    ["noShowRate", 5.5, 3.5, 7.5, 11, 0, "percent"],
    ["schedulingEfficiency", 84, 76, 90, 68, 1, "percent"],
    ["staffToProviderRatio", 4.5, 3.8, 5.2, 6.4, 0, "ratio"],
    ["providerTurnoverRate", 6, 3, 9, 14, 0, "percent"],
    ["staffTrainingInvestment", 2.4, 1.6, 3.2, 0.8, 1, "percent"],
    ["operatingExpenseRatio", 70, 64, 76, 82, 0, "percent"],
    ["costPerPatientVisit", 360, 290, 430, 520, 0, "usd"],
    ["patientSatisfactionScore", 4.6, 4.3, 4.8, 4.1, 1, "score"],
    ["qualityComplianceRate", 94, 90, 97, 84, 1, "percent"],
  ]),

  // Optometry
  ...MAKE("optometry", [
    ["revenuePerProvider", 42000, 33000, 52000, 25000, 1, "usd"],
    ["daysInAR", 28, 20, 36, 48, 0, "days"],
    ["netCollectionRate", 95.0, 92.0, 97.0, 88, 1, "percent"],
    ["contractualAdjustmentRate", 24, 18, 30, 38, 0, "percent"],
    ["insuranceMixCommercial", 55, 42, 68, 30, 1, "percent"],
    ["avgReimbursementRate", 60, 52, 68, 46, 1, "percent"],
    ["thirdNextAvailable", 8, 4, 14, 21, 0, "days"],
    ["noShowRate", 7.5, 5.0, 10.0, 14, 0, "percent"],
    ["schedulingEfficiency", 80, 72, 88, 64, 1, "percent"],
    ["staffToProviderRatio", 3.6, 3.0, 4.2, 5.0, 0, "ratio"],
    ["providerTurnoverRate", 10, 6, 14, 20, 0, "percent"],
    ["staffTrainingInvestment", 1.6, 0.8, 2.4, 0.4, 1, "percent"],
    ["operatingExpenseRatio", 60, 54, 66, 73, 0, "percent"],
    ["costPerPatientVisit", 145, 120, 180, 220, 0, "usd"],
    ["patientSatisfactionScore", 4.6, 4.3, 4.8, 4.1, 1, "score"],
    ["qualityComplianceRate", 90, 85, 94, 78, 1, "percent"],
  ]),

  // Ophthalmology
  ...MAKE("ophthalmology", [
    ["revenuePerProvider", 110000, 85000, 135000, 60000, 1, "usd"],
    ["daysInAR", 36, 28, 44, 56, 0, "days"],
    ["netCollectionRate", 96.0, 93.5, 97.8, 90, 1, "percent"],
    ["contractualAdjustmentRate", 30, 24, 36, 44, 0, "percent"],
    ["insuranceMixCommercial", 60, 48, 72, 35, 1, "percent"],
    ["avgReimbursementRate", 70, 62, 78, 54, 1, "percent"],
    ["thirdNextAvailable", 12, 7, 18, 26, 0, "days"],
    ["noShowRate", 6.5, 4.5, 9.0, 13, 0, "percent"],
    ["schedulingEfficiency", 82, 75, 89, 66, 1, "percent"],
    ["staffToProviderRatio", 3.4, 2.8, 4.0, 4.8, 0, "ratio"],
    ["providerTurnoverRate", 7, 4, 11, 16, 0, "percent"],
    ["staffTrainingInvestment", 2.0, 1.2, 2.8, 0.6, 1, "percent"],
    ["operatingExpenseRatio", 62, 56, 68, 75, 0, "percent"],
    ["costPerPatientVisit", 220, 180, 270, 320, 0, "usd"],
    ["patientSatisfactionScore", 4.5, 4.2, 4.7, 4.0, 1, "score"],
    ["qualityComplianceRate", 92, 87, 96, 80, 1, "percent"],
  ]),
];
