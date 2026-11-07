import { describe, expect, it } from '@jest/globals';

import { formatPercentage } from '@/utils/formatPercentage';

describe('formatPercentage', () => {
  it('formats positive, negative, and zero percentages', () => {
    expect(formatPercentage(12.5)).toBe('+12.5%');
    expect(formatPercentage(-2.25)).toBe('-2.3%');
    expect(formatPercentage(0)).toBe('0.0%');
  });

  it('indicates non-finite values as unavailable', () => {
    expect(formatPercentage(Number.NaN)).toBe('—');
    expect(formatPercentage(Number.NEGATIVE_INFINITY)).toBe('—');
  });
});
