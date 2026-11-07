import { describe, expect, it } from '@jest/globals';

import { EXPLORE_ANALYTICS } from '@/data/analytics';
import { getExploreData } from '@/services/analyticsService';
import type { ExploreAnalyticsDataset } from '@/types/analytics.types';

describe('getExploreData', () => {
  it('selects the series and category data for the requested period and metric', () => {
    const weeklyRevenue = getExploreData('7d', 'revenue');
    const monthlyUsers = getExploreData('30d', 'users');

    expect(weeklyRevenue.metricLabel).toBe('Revenue');
    expect(weeklyRevenue.rangeLabel).toBe('Last 7 days');
    expect(weeklyRevenue.series).toEqual(EXPLORE_ANALYTICS['7d'].revenue.series);
    expect(weeklyRevenue.series[0]?.label).toBe('Mon');
    expect(weeklyRevenue.distribution).toEqual(
      EXPLORE_ANALYTICS['7d'].revenue.distribution,
    );
    expect(monthlyUsers.metricLabel).toBe('Users');
    expect(monthlyUsers.rangeLabel).toBe('Last 30 days');
    expect(monthlyUsers.series[0]?.label).toBe('Week 1');
    expect(monthlyUsers.summaryValue).toBe(8420);
    expect(monthlyUsers.maxValue).toBeGreaterThan(
      Math.max(...monthlyUsers.series.map((point) => point.value)),
    );
  });

  it('returns empty chart data and a safe scale when selected data is invalid', () => {
    const dataset: ExploreAnalyticsDataset = {
      ...EXPLORE_ANALYTICS,
      '7d': {
        ...EXPLORE_ANALYTICS['7d'],
        revenue: {
          series: [
            { label: 'Invalid', value: Number.NaN },
            { label: 'Negative', value: -10 },
          ],
          distribution: [
            { label: 'Invalid', value: Number.POSITIVE_INFINITY },
            { label: 'Zero', value: 0 },
          ],
        },
      },
    };

    expect(getExploreData('7d', 'revenue', dataset)).toMatchObject({
      distribution: [],
      maxValue: 1,
      series: [],
      summaryValue: 0,
    });
  });
});
