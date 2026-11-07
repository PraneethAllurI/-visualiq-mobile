import { EXPLORE_ANALYTICS } from '@/data/analytics';
import type {
  AnalyticsDateRange,
  AnalyticsMetric,
  ExploreAnalyticsDataset,
  PreparedExploreData,
} from '@/types/analytics.types';

const METRIC_LABELS: Record<AnalyticsMetric, string> = {
  revenue: 'Revenue',
  users: 'Users',
  orders: 'Orders',
};

const RANGE_LABELS: Record<AnalyticsDateRange, string> = {
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
};

export function getExploreData(
  dateRange: AnalyticsDateRange,
  metric: AnalyticsMetric,
  dataset: ExploreAnalyticsDataset = EXPLORE_ANALYTICS,
): PreparedExploreData {
  const selectedData = dataset[dateRange][metric];
  const series = selectedData.series.filter(
    (point) => Number.isFinite(point.value) && point.value >= 0,
  );
  const distribution = selectedData.distribution.filter(
    (point) => Number.isFinite(point.value) && point.value > 0,
  );
  const latestPoint = series[series.length - 1];
  const summaryValue =
    metric === 'users'
      ? (latestPoint?.value ?? 0)
      : series.reduce((sum, point) => sum + point.value, 0);
  const peak = series.reduce(
    (maximum, point) => Math.max(maximum, point.value),
    0,
  );

  return {
    distribution: distribution.map((point) => ({ ...point })),
    maxValue: peak > 0 ? peak * 1.15 : 1,
    metric,
    metricLabel: METRIC_LABELS[metric],
    rangeLabel: RANGE_LABELS[dateRange],
    series: series.map((point) => ({ ...point })),
    summaryValue,
  };
}
