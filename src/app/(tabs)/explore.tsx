import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BarChart } from '@/components/charts/BarChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { LineChart } from '@/components/charts/LineChart';
import { AppCard } from '@/components/common/AppCard';
import { EmptyState } from '@/components/common/EmptyState';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { SectionHeader } from '@/components/common/SectionHeader';
import {
  ExploreSelector,
  type ExploreSelectorOption,
} from '@/components/explore/ExploreSelector';
import { useTheme } from '@/hooks/useTheme';
import { getExploreData } from '@/services/analyticsService';
import type {
  AnalyticsDateRange,
  AnalyticsMetric,
  ExploreChartType,
} from '@/types/analytics.types';
import {
  formatAnalyticsValue,
  formatCompactAnalyticsValue,
} from '@/utils/formatAnalyticsValue';

const DATE_RANGE_OPTIONS: ExploreSelectorOption<AnalyticsDateRange>[] = [
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '90 Days', value: '90d' },
];

const METRIC_OPTIONS: ExploreSelectorOption<AnalyticsMetric>[] = [
  { label: 'Revenue', value: 'revenue' },
  { label: 'Users', value: 'users' },
  { label: 'Orders', value: 'orders' },
];

const CHART_OPTIONS: ExploreSelectorOption<ExploreChartType>[] = [
  { label: 'Line', value: 'line' },
  { label: 'Bar', value: 'bar' },
  { label: 'Donut', value: 'donut' },
];

export default function ExploreRoute() {
  const { theme } = useTheme();
  const [dateRange, setDateRange] = useState<AnalyticsDateRange>('7d');
  const [metric, setMetric] = useState<AnalyticsMetric>('revenue');
  const [chartType, setChartType] = useState<ExploreChartType>('line');
  const data = getExploreData(dateRange, metric);
  const chartTitle =
    chartType === 'donut'
      ? `${data.metricLabel} by Category`
      : chartType === 'bar'
        ? `${data.metricLabel} Performance`
        : `${data.metricLabel} Trend`;
  const chartHasData =
    chartType === 'donut'
      ? data.distribution.length > 0
      : data.series.length > 0;

  return (
    <ScreenContainer
      contentContainerStyle={{
        paddingBottom: theme.spacing.xxl,
        paddingTop: theme.spacing.xl,
      }}
      edges={['top', 'left', 'right']}
      scrollable
    >
      <ScreenHeader
        subtitle="Compare your business performance"
        title="Explore"
      />

      <ExploreSelector
        accessibilityLabel="Date range filter"
        onSelect={setDateRange}
        options={DATE_RANGE_OPTIONS}
        selectedValue={dateRange}
        title="Date range"
      />
      <ExploreSelector
        accessibilityLabel="Metric filter"
        onSelect={setMetric}
        options={METRIC_OPTIONS}
        selectedValue={metric}
        title="Metric"
      />
      <ExploreSelector
        accessibilityLabel="Chart type filter"
        onSelect={setChartType}
        options={CHART_OPTIONS}
        selectedValue={chartType}
        title="Chart type"
      />

      <SectionHeader title={chartTitle} />
      <AppCard style={{ marginBottom: theme.spacing.xxl }}>
        {chartHasData ? (
          <>
            <View style={[styles.summary, { marginBottom: theme.spacing.md }]}>
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  fontSize: theme.typography.size.secondary,
                }}
              >
                {data.rangeLabel}
              </Text>
              <Text
                accessibilityLabel={`${data.metricLabel} ${formatAnalyticsValue(metric, data.summaryValue)} for ${data.rangeLabel}`}
                style={{
                  color: theme.colors.textPrimary,
                  fontSize: theme.typography.size.cardTitle,
                  fontWeight: '700',
                }}
              >
                {formatAnalyticsValue(metric, data.summaryValue)}
              </Text>
            </View>
            {chartType === 'line' ? (
              <LineChart
                accessibilityLabel={`${data.metricLabel} trend for ${data.rangeLabel}`}
                data={data.series}
                formatAxisValue={(value) =>
                  formatCompactAnalyticsValue(metric, value)
                }
                maxValue={data.maxValue}
              />
            ) : chartType === 'bar' ? (
              <BarChart
                accessibilityLabel={`${data.metricLabel} performance for ${data.rangeLabel}`}
                data={data.series}
                formatAxisValue={(value) =>
                  formatCompactAnalyticsValue(metric, value)
                }
                maxValue={data.maxValue}
              />
            ) : (
              <DonutChart
                accessibilityLabel={`${data.metricLabel} category distribution for ${data.rangeLabel}`}
                data={data.distribution}
                formatValue={(value) => formatAnalyticsValue(metric, value)}
              />
            )}
          </>
        ) : (
          <EmptyState
            description="Try another date range or metric."
            title="No analytics available"
          />
        )}
      </AppCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  summary: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
