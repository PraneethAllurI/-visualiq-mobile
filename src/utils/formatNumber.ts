const numberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
});

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return '—';
  }

  return numberFormatter.format(value);
}
