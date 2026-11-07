import { describe, expect, it } from '@jest/globals';

import { formatCurrency } from '@/utils/formatCurrency';

describe('formatCurrency', () => {
  it('formats positive INR values with Indian digit grouping', () => {
    expect(formatCurrency(24680)).toBe('₹24,680');
    expect(formatCurrency(12345678)).toBe('₹1,23,45,678');
  });

  it('formats zero and rounds fractional amounts to whole rupees', () => {
    expect(formatCurrency(0)).toBe('₹0');
    expect(formatCurrency(1250.75)).toBe('₹1,251');
  });

  it('indicates non-finite values as unavailable', () => {
    expect(formatCurrency(Number.NaN)).toBe('—');
    expect(formatCurrency(Number.POSITIVE_INFINITY)).toBe('—');
  });
});
