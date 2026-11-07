import { BarChart as GiftedBarChart } from 'react-native-gifted-charts';
import { useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';

import { EmptyState } from '@/components/common/EmptyState';
import type { DashboardChartPoint } from '@/types/dashboard.types';
import { useTheme } from '@/hooks/useTheme';
import { formatCompactCurrency } from '@/utils/formatCompactCurrency';

export interface BarChartProps {
  accessibilityLabel: string;
  data: DashboardChartPoint[];
  formatAxisValue?: (value: number) => string;
  height?: number;
  maxValue: number;
}

export function BarChart({
  accessibilityLabel,
  data,
  formatAxisValue = formatCompactCurrency,
  height = 132,
  maxValue,
}: BarChartProps) {
  const { theme } = useTheme();
  const [chartWidth, setChartWidth] = useState(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    setChartWidth(event.nativeEvent.layout.width);
  };

  const hasValidData =
    data.length > 0 && data.every((point) => Number.isFinite(point.value));

  return (
    <View
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="image"
      onLayout={handleLayout}
      style={styles.container}
    >
      {!hasValidData ? (
        <EmptyState
          description="Check back when analytics data is available."
          title="No chart data"
        />
      ) : chartWidth > 0 ? (
        <GiftedBarChart
          barBorderRadius={4}
          barWidth={12}
          data={data}
          endSpacing={4}
          frontColor={theme.chartColors.primary}
          height={height}
          initialSpacing={4}
          maxValue={maxValue}
          noOfSections={3}
          parentWidth={chartWidth}
          rulesColor={theme.colors.border}
          rulesThickness={StyleSheet.hairlineWidth}
          spacing={Math.max(12, (chartWidth - 48) / data.length - 12)}
          xAxisColor={theme.colors.border}
          xAxisLabelTextStyle={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.size.caption,
          }}
          yAxisColor="transparent"
          yAxisLabelWidth={36}
          yAxisTextStyle={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.size.caption,
          }}
          formatYLabel={(label) => formatAxisValue(Number(label))}
          isAnimated
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 132,
    width: '100%',
  },
});
