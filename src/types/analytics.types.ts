import type { DashboardChartPoint } from '@/types/dashboard.types';

export type AnalyticsDateRange = '7d' | '30d' | '90d';
export type AnalyticsMetric = 'revenue' | 'users' | 'orders';
export type ExploreChartType = 'line' | 'bar' | 'donut';

export type ExploreDistributionPoint = DashboardChartPoint;

export interface ExploreMetricDataset {
  distribution: ExploreDistributionPoint[];
  series: DashboardChartPoint[];
}

export type ExploreAnalyticsDataset = Record<
  AnalyticsDateRange,
  Record<AnalyticsMetric, ExploreMetricDataset>
>;

export interface PreparedExploreData extends ExploreMetricDataset {
  maxValue: number;
  metric: AnalyticsMetric;
  metricLabel: string;
  rangeLabel: string;
  summaryValue: number;
}
