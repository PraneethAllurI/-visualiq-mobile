import { describe, expect, it } from '@jest/globals';

import { formatCompactCurrency } from '@/utils/formatCompactCurrency';

describe('formatCompactCurrency', () => {
  it('formats chart axis labels compactly', () => {
    expect(formatCompactCurrency(25000)).toBe('₹25k');
    expect(formatCompactCurrency(500)).toBe('₹500');
    expect(formatCompactCurrency(-1500)).toBe('₹-2k');
  });

  it('returns an empty label for non-finite chart values', () => {
    expect(formatCompactCurrency(Number.NaN)).toBe('');
  });
});
