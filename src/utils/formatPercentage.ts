const percentageFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});

export function formatPercentage(value: number): string {
  if (!Number.isFinite(value)) {
    return '—';
  }

  const sign = value > 0 ? '+' : '';
  return `${sign}${percentageFormatter.format(value)}%`;
}

export function formatPercentageValue(value: number): string {
  if (!Number.isFinite(value)) {
    return '—';
  }

  return `${percentageFormatter.format(value)}%`;
}
