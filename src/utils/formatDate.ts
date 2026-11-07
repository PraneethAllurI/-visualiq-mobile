const reportDateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

export function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);

  if (!Number.isFinite(date.getTime())) {
    return 'Date unavailable';
  }

  return reportDateFormatter.format(date);
}
