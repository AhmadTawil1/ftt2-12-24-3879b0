export interface User {
  id: number;
  role: string;
  height: number | null;
}

export interface Child {
  id: number;
  currentWeight: number | null;
  age: number | null;
  gender: string | null;
  perinatalParameters: Record<string, unknown> | null;
  postnatalParameters: Record<string, unknown> | null;
}

export interface Diagnosis {
  id: number;
  childId: number | null;
  fetalBirthWeightIndication: string | null;
  fetalGrowthIndication: string | null;
  postnatalGrowthIndication: string | null;
  firstTrimesterPi: number | null;
  lastTrimesterPi: number | null;
  birthPercentile: string | null;
  month6Percentile: string | null;
  month12Percentile: string | null;
  month18Percentile: string | null;
  month24Percentile: string | null;
  month36Percentile: string | null;
  month48Percentile: string | null;
  month60Percentile: string | null;
}

export interface PostnatalGrowthAnalysis {
  id: number;
  diagnosisId: number | null;
  majorPercentilesCrossed: number | null;
  severity: number | null;
  lastPercentileAge: string | null;
  period1PercentilesCrossed: number | null;
  lastPercentileAgePeriod1: string | null;
  period2PercentilesCrossed: number | null;
  lastPercentileAgePeriod2: string | null;
  period3PercentilesCrossed: number | null;
}

export interface TreatmentProtocol {
  id: number;
  diagnosisId: number | null;
  dailyCaloricValue: number | null;
  medianWeight: number | null;
  multiCaloriesProducts: Record<string, unknown> | null;
  micronutrients: Record<string, unknown> | null;
}

export interface ImplicationSet {
  id: number;
  diagnosisId: number | null;
  description: string | null;
}

export interface Father {
  id: number;
}

export interface Mother {
  id: number;
}

export interface SimpleEntity {
  id: number;
}

export interface ProcessRequest {
  [key: string]: unknown;
}

export interface ProcessResponse {
  status: string;
  [key: string]: unknown;
}