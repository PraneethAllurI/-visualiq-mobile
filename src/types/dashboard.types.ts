export interface DashboardChartPoint {
  label: string;
  value: number;
}

export interface DashboardMetric {
  growthPercentage: number;
  value: number;
}

export type ActivityKind = 'revenue' | 'user' | 'order' | 'report';

export interface DashboardActivity {
  description: string;
  id: string;
  kind: ActivityKind;
  timeLabel: string;
  title: string;
}
