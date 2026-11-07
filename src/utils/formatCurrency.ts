const inrFormatter = new Intl.NumberFormat('en-IN', {
  currency: 'INR',
  maximumFractionDigits: 0,
  style: 'currency',
});

export function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) {
    return '—';
  }

  return inrFormatter.format(value);
}
