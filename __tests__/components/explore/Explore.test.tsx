import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { describe, expect, it, jest } from '@jest/globals';

import ExploreRoute from '@/app/(tabs)/explore';

jest.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: jest.requireActual<typeof import('@/constants/theme')>(
      '@/constants/theme',
    ).THEMES.dark,
  }),
}));

jest.mock('@/components/charts/LineChart', () => {
  const { Text } =
    jest.requireActual<typeof import('react-native')>('react-native');

  return {
    LineChart: ({
      accessibilityLabel,
      data,
    }: {
      accessibilityLabel: string;
      data: { label: string; value: number }[];
    }) => (
      <Text accessibilityLabel={accessibilityLabel}>
        {data.map((point) => point.label).join(', ')}
      </Text>
    ),
  };
});

jest.mock('@/components/charts/BarChart', () => {
  const { Text } =
    jest.requireActual<typeof import('react-native')>('react-native');

  return {
    BarChart: ({
      accessibilityLabel,
      data,
    }: {
      accessibilityLabel: string;
      data: { label: string; value: number }[];
    }) => (
      <Text accessibilityLabel={accessibilityLabel}>
        {data.map((point) => point.label).join(', ')}
      </Text>
    ),
  };
});

jest.mock('@/components/charts/DonutChart', () => {
  const { Text } =
    jest.requireActual<typeof import('react-native')>('react-native');

  return {
    DonutChart: ({
      accessibilityLabel,
      data,
    }: {
      accessibilityLabel: string;
      data: { label: string; value: number }[];
    }) => (
      <Text accessibilityLabel={accessibilityLabel}>
        {data.map((point) => point.label).join(', ')}
      </Text>
    ),
  };
});

describe('Explore screen', () => {
  async function pressOption(label: string) {
    await act(async () => {
      fireEvent.press(screen.getByRole('button', { name: label }));
    });
  }

  it('updates the displayed time series when the date range changes', async () => {
    await render(<ExploreRoute />);

    expect(screen.getByRole('button', { name: '7 Days' }).props.accessibilityState)
      .toEqual({ selected: true });
    expect(screen.getByLabelText('Revenue trend for Last 7 days')).toBeTruthy();
    expect(screen.getByText('Mon, Tue, Wed, Thu, Fri, Sat, Sun')).toBeTruthy();

    await pressOption('30 Days');

    expect(
      screen.getByRole('button', { name: '30 Days', selected: true }),
    ).toBeTruthy();
    expect(screen.getByLabelText('Revenue trend for Last 30 days')).toBeTruthy();
    expect(screen.getByText('Week 1, Week 2, Week 3, Week 4, Week 5')).toBeTruthy();

    await pressOption('90 Days');
    expect(screen.getByLabelText('Revenue trend for Last 90 days')).toBeTruthy();
    expect(screen.getByText('Aug, Sep, Oct')).toBeTruthy();
  });

  it('updates the metric and switches among line, bar, and donut charts', async () => {
    await render(<ExploreRoute />);

    await pressOption('Users');
    expect(
      screen.getByRole('button', { name: 'Users', selected: true }),
    ).toBeTruthy();
    expect(screen.getByText('8,420')).toBeTruthy();
    expect(screen.getByLabelText('Users trend for Last 7 days')).toBeTruthy();

    await pressOption('Orders');
    expect(screen.getByText('1,793')).toBeTruthy();
    expect(screen.getByLabelText('Orders trend for Last 7 days')).toBeTruthy();

    await pressOption('Bar');
    expect(screen.getByLabelText('Orders performance for Last 7 days')).toBeTruthy();
    expect(screen.getByText('Mon, Tue, Wed, Thu, Fri, Sat, Sun')).toBeTruthy();

    await pressOption('Donut');
    expect(
      screen.getByLabelText('Orders category distribution for Last 7 days'),
    ).toBeTruthy();
    expect(screen.getByText('Subscriptions, Services, Retail, Other')).toBeTruthy();
  });
});
