import { render, screen } from '@testing-library/react-native';
import { describe, expect, it, jest } from '@jest/globals';
import type { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import { AppCard } from '@/components/common/AppCard';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { SectionHeader } from '@/components/common/SectionHeader';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ThemeProvider } from '@/context/ThemeContext';

jest.mock(
  '@react-native-async-storage/async-storage',
  () =>
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require(
      '@react-native-async-storage/async-storage/jest/async-storage-mock',
    ),
);

function renderWithTheme({ children }: PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('reusable UI foundation', () => {
  it('renders screen content in the shared screen container', async () => {
    await render(
      <ScreenContainer>
        <Text>Screen content</Text>
      </ScreenContainer>,
      { wrapper: renderWithTheme },
    );

    expect(screen.getByText('Screen content')).toBeTruthy();
  });

  it('renders a screen title, subtitle, and optional action', async () => {
    await render(
      <ScreenHeader
        action={<Text>More</Text>}
        subtitle="Performance overview"
        title="Dashboard"
      />,
      { wrapper: renderWithTheme },
    );

    expect(screen.getByText('Dashboard')).toBeTruthy();
    expect(screen.getByText('Performance overview')).toBeTruthy();
    expect(screen.getByText('More')).toBeTruthy();
  });

  it('renders an app card and section header action', async () => {
    await render(
      <>
        <AppCard>
          <Text>Card content</Text>
        </AppCard>
        <SectionHeader action={<Text>View all</Text>} title="Revenue" />
      </>,
      { wrapper: renderWithTheme },
    );

    expect(screen.getByText('Card content')).toBeTruthy();
    expect(screen.getByText('Revenue')).toBeTruthy();
    expect(screen.getByText('View all')).toBeTruthy();
  });

  it('renders metric values and the supplied trend', async () => {
    await render(
      <MetricCard
        label="Total revenue"
        trend={{ direction: 'positive', label: '+12.5%' }}
        value="₹24,680"
      />,
      { wrapper: renderWithTheme },
    );

    expect(screen.getByText('Total revenue')).toBeTruthy();
    expect(screen.getByText('₹24,680')).toBeTruthy();
    expect(screen.getByLabelText('Trend positive: +12.5%')).toBeTruthy();
  });

  it('renders empty and loading states accessibly', async () => {
    await render(
      <>
        <EmptyState
          description="Try changing your filters."
          title="No reports found"
        />
        <LoadingState message="Loading reports" />
      </>,
      { wrapper: renderWithTheme },
    );

    expect(screen.getByText('No reports found')).toBeTruthy();
    expect(screen.getByText('Try changing your filters.')).toBeTruthy();
    expect(screen.getByText('Loading reports')).toBeTruthy();
  });
});
