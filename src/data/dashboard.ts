import type {
  DashboardActivity,
  DashboardChartPoint,
  DashboardMetric,
} from '@/types/dashboard.types';

export const DASHBOARD_METRICS: {
  revenue: DashboardMetric;
  users: DashboardMetric;
} = {
  revenue: {
    value: 24680,
    growthPercentage: 12.5,
  },
  users: {
    value: 8420,
    growthPercentage: 6.8,
  },
};

export const REVENUE_TREND: DashboardChartPoint[] = [
  { label: 'Mon', value: 15000 },
  { label: 'Tue', value: 16000 },
  { label: 'Wed', value: 22000 },
  { label: 'Thu', value: 19000 },
  { label: 'Fri', value: 23000 },
  { label: 'Sat', value: 24000 },
  { label: 'Sun', value: 28000 },
];

export const WEEKLY_PERFORMANCE: DashboardChartPoint[] = [
  { label: 'Mon', value: 12000 },
  { label: 'Tue', value: 15000 },
  { label: 'Wed', value: 18000 },
  { label: 'Thu', value: 22000 },
  { label: 'Fri', value: 16000 },
  { label: 'Sat', value: 14000 },
  { label: 'Sun', value: 19000 },
];

export const RECENT_ACTIVITIES: DashboardActivity[] = [
  {
    id: 'activity-1',
    kind: 'revenue',
    title: 'New subscription received',
    description: 'Acme Studio upgraded to the Pro plan',
    timeLabel: '2 hours ago',
  },
  {
    id: 'activity-2',
    kind: 'user',
    title: 'New active user',
    description: 'A new team member joined Northstar',
    timeLabel: '4 hours ago',
  },
  {
    id: 'activity-3',
    kind: 'order',
    title: 'Order completed',
    description: 'Quarterly analytics package',
    timeLabel: 'Yesterday',
  },
  {
    id: 'activity-4',
    kind: 'report',
    title: 'Weekly report generated',
    description: 'Your performance summary is ready',
    timeLabel: 'Yesterday',
  },
];
