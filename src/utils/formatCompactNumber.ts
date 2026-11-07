const numberFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
});

export function formatCompactNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return '';
  }

  if (Math.abs(value) >= 1000) {
    const thousands = Math.round(Math.abs(value) / 1000) * Math.sign(value);
    return `${thousands}k`;
  }

  return numberFormatter.format(value);
}
