import { render, screen } from '@testing-library/react-native';
import { describe, expect, it, jest } from '@jest/globals';

import DashboardRoute from '@/app/(tabs)/index';

jest.mock('react-native-gifted-charts', () => ({
  BarChart: () => null,
  LineChart: () => null,
}));

jest.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: jest.requireActual<typeof import('@/constants/theme')>(
      '@/constants/theme',
    ).THEMES.dark,
  }),
}));

jest.mock('lucide-react-native', () => ({
  Banknote: () => null,
  Bell: () => null,
  FileText: () => null,
  ShoppingCart: () => null,
  UserRoundPlus: () => null,
  UsersRound: () => null,
}));

describe('Dashboard screen', () => {
  it('displays the heading, formatted metrics, charts, and recent activity', async () => {
    await render(<DashboardRoute />);

    expect(screen.getByText('VisualIQ')).toBeTruthy();
    expect(screen.getByText('Total Revenue')).toBeTruthy();
    expect(screen.getByText('₹24,680')).toBeTruthy();
    expect(screen.getByText('Active Users')).toBeTruthy();
    expect(screen.getByText('8,420')).toBeTruthy();
    expect(screen.getByLabelText('Trend positive: +12.5% this week')).toBeTruthy();
    expect(screen.getByText('Revenue Trend')).toBeTruthy();
    expect(screen.getByLabelText('Revenue trend chart')).toBeTruthy();
    expect(screen.getByText('Weekly Performance')).toBeTruthy();
    expect(screen.getByLabelText('Weekly performance chart')).toBeTruthy();
    expect(screen.getByText('Recent Activity')).toBeTruthy();
    expect(screen.getByText('New subscription received')).toBeTruthy();
    expect(screen.getByText('Acme Studio upgraded to the Pro plan')).toBeTruthy();
    expect(screen.getByText('2 hours ago')).toBeTruthy();
  });
});
