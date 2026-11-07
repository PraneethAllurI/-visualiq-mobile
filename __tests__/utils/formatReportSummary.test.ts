import { describe, expect, it } from '@jest/globals';

import { formatReportSummary } from '@/utils/formatReportSummary';

describe('formatReportSummary', () => {
  it('formats a percentage as an absolute value rather than signed growth', () => {
    expect(
      formatReportSummary({
        format: 'percentage',
        label: 'Conversion rate',
        value: 3.7,
      }),
    ).toBe('3.7%');
  });

  it('preserves negative percentage values and handles non-finite values', () => {
    expect(
      formatReportSummary({
        format: 'percentage',
        label: 'Conversion rate',
        value: -2.25,
      }),
    ).toBe('-2.3%');
    expect(
      formatReportSummary({
        format: 'percentage',
        label: 'Conversion rate',
        value: Number.NaN,
      }),
    ).toBe('—');
  });
});
