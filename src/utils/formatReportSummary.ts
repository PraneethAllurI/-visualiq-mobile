import type { ReportSummary } from '@/types/report.types';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatPercentageValue } from '@/utils/formatPercentage';
import { formatNumber } from '@/utils/formatNumber';

export function formatReportSummary(summary: ReportSummary): string {
  if (!Number.isFinite(summary.value)) {
    return '—';
  }

  if (summary.format === 'currency') {
    return formatCurrency(summary.value);
  }

  if (summary.format === 'percentage') {
    return formatPercentageValue(summary.value);
  }

  return formatNumber(summary.value);
}
