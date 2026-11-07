import { describe, expect, it } from '@jest/globals';

import {
  formatAnalyticsValue,
  formatCompactAnalyticsValue,
} from '@/utils/formatAnalyticsValue';

describe('formatAnalyticsValue', () => {
  it('formats currency and count metrics with the correct units', () => {
    expect(formatAnalyticsValue('revenue', 24680)).toBe('₹24,680');
    expect(formatAnalyticsValue('users', 8420)).toBe('8,420');
    expect(formatAnalyticsValue('orders', 352)).toBe('352');
  });

  it('formats compact chart axis values for currency and count metrics', () => {
    expect(formatCompactAnalyticsValue('revenue', 24000)).toBe('₹24k');
    expect(formatCompactAnalyticsValue('users', 8420)).toBe('8k');
    expect(formatCompactAnalyticsValue('orders', 352)).toBe('352');
    expect(formatCompactAnalyticsValue('orders', Number.NaN)).toBe('');
  });
});
