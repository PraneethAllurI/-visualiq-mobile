import { describe, expect, it } from '@jest/globals';

import { formatNumber } from '@/utils/formatNumber';

describe('formatNumber', () => {
  it('formats values with Indian digit grouping', () => {
    expect(formatNumber(8420)).toBe('8,420');
    expect(formatNumber(12345678)).toBe('1,23,45,678');
  });

  it('formats zero and indicates non-finite values as unavailable', () => {
    expect(formatNumber(0)).toBe('0');
    expect(formatNumber(Number.NaN)).toBe('—');
  });
});
