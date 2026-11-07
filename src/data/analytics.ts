import type { ExploreAnalyticsDataset } from '@/types/analytics.types';

export const EXPLORE_ANALYTICS: ExploreAnalyticsDataset = {
  '7d': {
    revenue: {
      series: [
        { label: 'Mon', value: 12400 },
        { label: 'Tue', value: 15800 },
        { label: 'Wed', value: 14200 },
        { label: 'Thu', value: 19100 },
        { label: 'Fri', value: 17800 },
        { label: 'Sat', value: 22400 },
        { label: 'Sun', value: 24680 },
      ],
      distribution: [
        { label: 'Subscriptions', value: 38400 },
        { label: 'Services', value: 26800 },
        { label: 'Retail', value: 15400 },
        { label: 'Other', value: 13780 },
      ],
    },
    users: {
      series: [
        { label: 'Mon', value: 5120 },
        { label: 'Tue', value: 5480 },
        { label: 'Wed', value: 5310 },
        { label: 'Thu', value: 6020 },
        { label: 'Fri', value: 6480 },
        { label: 'Sat', value: 7210 },
        { label: 'Sun', value: 8420 },
      ],
      distribution: [
        { label: 'Direct', value: 3560 },
        { label: 'Search', value: 2310 },
        { label: 'Referral', value: 1580 },
        { label: 'Other', value: 970 },
      ],
    },
    orders: {
      series: [
        { label: 'Mon', value: 184 },
        { label: 'Tue', value: 216 },
        { label: 'Wed', value: 203 },
        { label: 'Thu', value: 248 },
        { label: 'Fri', value: 276 },
        { label: 'Sat', value: 314 },
        { label: 'Sun', value: 352 },
      ],
      distribution: [
        { label: 'Subscriptions', value: 428 },
        { label: 'Services', value: 316 },
        { label: 'Retail', value: 246 },
        { label: 'Other', value: 173 },
      ],
    },
  },
  '30d': {
    revenue: {
      series: [
        { label: 'Week 1', value: 68400 },
        { label: 'Week 2', value: 72100 },
        { label: 'Week 3', value: 78500 },
        { label: 'Week 4', value: 82400 },
        { label: 'Week 5', value: 24680 },
      ],
      distribution: [
        { label: 'Subscriptions', value: 132000 },
        { label: 'Services', value: 89600 },
        { label: 'Retail', value: 51400 },
        { label: 'Other', value: 30080 },
      ],
    },
    users: {
      series: [
        { label: 'Week 1', value: 6320 },
        { label: 'Week 2', value: 6810 },
        { label: 'Week 3', value: 7460 },
        { label: 'Week 4', value: 8010 },
        { label: 'Week 5', value: 8420 },
      ],
      distribution: [
        { label: 'Direct', value: 14200 },
        { label: 'Search', value: 9240 },
        { label: 'Referral', value: 6310 },
        { label: 'Other', value: 3780 },
      ],
    },
    orders: {
      series: [
        { label: 'Week 1', value: 812 },
        { label: 'Week 2', value: 904 },
        { label: 'Week 3', value: 978 },
        { label: 'Week 4', value: 1086 },
        { label: 'Week 5', value: 352 },
      ],
      distribution: [
        { label: 'Subscriptions', value: 1640 },
        { label: 'Services', value: 1210 },
        { label: 'Retail', value: 936 },
        { label: 'Other', value: 642 },
      ],
    },
  },
  '90d': {
    revenue: {
      series: [
        { label: 'Aug', value: 218000 },
        { label: 'Sep', value: 246000 },
        { label: 'Oct', value: 284000 },
      ],
      distribution: [
        { label: 'Subscriptions', value: 402000 },
        { label: 'Services', value: 267000 },
        { label: 'Retail', value: 152000 },
        { label: 'Other', value: 87000 },
      ],
    },
    users: {
      series: [
        { label: 'Aug', value: 6940 },
        { label: 'Sep', value: 7580 },
        { label: 'Oct', value: 8420 },
      ],
      distribution: [
        { label: 'Direct', value: 18600 },
        { label: 'Search', value: 12400 },
        { label: 'Referral', value: 8460 },
        { label: 'Other', value: 5140 },
      ],
    },
    orders: {
      series: [
        { label: 'Aug', value: 2480 },
        { label: 'Sep', value: 2910 },
        { label: 'Oct', value: 3520 },
      ],
      distribution: [
        { label: 'Subscriptions', value: 4120 },
        { label: 'Services', value: 3070 },
        { label: 'Retail', value: 2310 },
        { label: 'Other', value: 1580 },
      ],
    },
  },
};
