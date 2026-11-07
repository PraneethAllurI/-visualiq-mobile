import { describe, expect, it } from '@jest/globals';

import { formatCompactNumber } from '@/utils/formatCompactNumber';

describe('formatCompactNumber', () => {
  it('formats small values and rounds larger values to thousands', () => {
    expect(formatCompactNumber(352)).toBe('352');
    expect(formatCompactNumber(8420)).toBe('8k');
    expect(formatCompactNumber(-1500)).toBe('-2k');
  });

  it('returns an empty label for non-finite chart values', () => {
    expect(formatCompactNumber(Number.POSITIVE_INFINITY)).toBe('');
  });
});
