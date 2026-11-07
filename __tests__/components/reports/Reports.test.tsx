import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { describe, expect, it, jest } from '@jest/globals';

import ReportsRoute from '@/app/(tabs)/reports';

jest.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: jest.requireActual<typeof import('@/constants/theme')>(
      '@/constants/theme',
    ).THEMES.dark,
  }),
}));

jest.mock('lucide-react-native', () => {
  const { View } =
    jest.requireActual<typeof import('react-native')>('react-native');
  const Icon = () => <View />;

  return {
    ArrowDownRight: Icon,
    ArrowUpRight: Icon,
    ChevronRight: Icon,
    Search: Icon,
    X: Icon,
  };
});

describe('Reports screen', () => {
  async function pressOption(label: string) {
    await act(async () => {
      fireEvent.press(screen.getByRole('button', { name: label }));
    });
  }

  it('shows summary statistics and report cards', async () => {
    await render(<ReportsRoute />);

    expect(screen.getByText('Total reports')).toBeTruthy();
    expect(screen.getByText('6')).toBeTruthy();
    expect(screen.getByText('Positive trends')).toBeTruthy();
    expect(screen.getByText('October Revenue Overview')).toBeTruthy();
    expect(screen.getAllByText('Revenue').length).toBeGreaterThan(0);
    expect(screen.getByText('02 Nov 2026')).toBeTruthy();
    expect(screen.getByText('₹2,84,000')).toBeTruthy();
  });

  it('combines report title search with category filters and clears them', async () => {
    await render(<ReportsRoute />);

    await act(async () => {
      fireEvent.changeText(
        screen.getByLabelText('Search reports by title'),
        'revenue',
      );
    });
    expect(screen.getByText('October Revenue Overview')).toBeTruthy();
    expect(screen.getByText('Recurring Revenue Analysis')).toBeTruthy();
    expect(screen.queryByText('Quarterly Sales Performance')).toBeNull();

    await pressOption('Sales');
    expect(screen.getByText('No reports match your filters')).toBeTruthy();

    await pressOption('Clear filters');
    expect(screen.getByText('October Revenue Overview')).toBeTruthy();
    expect(screen.getByText('Quarterly Sales Performance')).toBeTruthy();
  });

  it('opens the selected report detail modal and closes it', async () => {
    await render(<ReportsRoute />);

    await pressOption(
      'October Revenue Overview, Revenue, 02 Nov 2026, Total revenue ₹2,84,000',
    );

    expect(screen.getAllByText('Overview').length).toBeGreaterThan(0);
    expect(
      screen.getByText(
        'A review of revenue performance across subscriptions, services, and retail during October.',
      ),
    ).toBeTruthy();
    expect(screen.getByText('Key insights')).toBeTruthy();

    await pressOption('Close report details');
    expect(screen.queryByText('Key insights')).toBeNull();
  });
});
