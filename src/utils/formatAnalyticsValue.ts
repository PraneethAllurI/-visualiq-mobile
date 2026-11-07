import type { AnalyticsMetric } from '@/types/analytics.types';
import { formatCompactCurrency } from '@/utils/formatCompactCurrency';
import { formatCompactNumber } from '@/utils/formatCompactNumber';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatNumber } from '@/utils/formatNumber';

export function formatAnalyticsValue(
  metric: AnalyticsMetric,
  value: number,
): string {
  return metric === 'revenue' ? formatCurrency(value) : formatNumber(value);
}

export function formatCompactAnalyticsValue(
  metric: AnalyticsMetric,
  value: number,
): string {
  if (!Number.isFinite(value)) {
    return '';
  }

  return metric === 'revenue'
    ? formatCompactCurrency(value)
    : formatCompactNumber(value);
}
