export type ReportCategory = 'Sales' | 'Users' | 'Revenue';
export type ReportSummaryFormat = 'currency' | 'number' | 'percentage';

export interface ReportSummary {
  format: ReportSummaryFormat;
  label: string;
  value: number;
}

export interface Report {
  category: ReportCategory;
  date: string;
  description: string;
  growthPercentage: number;
  highlights: string[];
  id: string;
  summary: ReportSummary;
  title: string;
}

export type ReportCategoryFilter = 'All' | ReportCategory;

export interface ReportSummaryStats {
  categoryCount: number;
  positiveTrendCount: number;
  reportCount: number;
}
