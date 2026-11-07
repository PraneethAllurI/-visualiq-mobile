import { LineChart as GiftedLineChart } from 'react-native-gifted-charts';
import { useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';

import { EmptyState } from '@/components/common/EmptyState';
import type { DashboardChartPoint } from '@/types/dashboard.types';
import { useTheme } from '@/hooks/useTheme';
import { formatCompactCurrency } from '@/utils/formatCompactCurrency';

export interface LineChartProps {
  accessibilityLabel: string;
  data: DashboardChartPoint[];
  formatAxisValue?: (value: number) => string;
  height?: number;
  maxValue: number;
}

export function LineChart({
  accessibilityLabel,
  data,
  formatAxisValue = formatCompactCurrency,
  height = 152,
  maxValue,
}: LineChartProps) {
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
        <GiftedLineChart
          areaChart
          curved
          data={data}
          endSpacing={8}
          height={height}
          hideRules={false}
          initialSpacing={8}
          maxValue={maxValue}
          noOfSections={3}
          parentWidth={chartWidth}
          rulesColor={theme.colors.border}
          rulesThickness={StyleSheet.hairlineWidth}
          spacing={
            data.length > 1
              ? Math.max(28, (chartWidth - 36) / (data.length - 1))
              : 28
          }
          thickness={2}
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
          color={theme.chartColors.primary}
          startFillColor={theme.chartColors.primary}
          endFillColor={theme.colors.surface}
          startOpacity={0.28}
          endOpacity={0.02}
          formatYLabel={(label) => formatAxisValue(Number(label))}
          isAnimated
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 152,
    width: '100%',
  },
});
