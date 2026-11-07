import { PieChart } from 'react-native-gifted-charts';
import { StyleSheet, Text, View } from 'react-native';

import { EmptyState } from '@/components/common/EmptyState';
import type { DashboardChartPoint } from '@/types/dashboard.types';
import { useTheme } from '@/hooks/useTheme';

export interface DonutChartProps {
  accessibilityLabel: string;
  data: DashboardChartPoint[];
  formatValue: (value: number) => string;
}

export function DonutChart({
  accessibilityLabel,
  data,
  formatValue,
}: DonutChartProps) {
  const { theme } = useTheme();
  const colors = [
    theme.chartColors.primary,
    theme.chartColors.secondary,
    theme.chartColors.tertiary,
    theme.chartColors.additional,
    theme.chartColors.negative,
  ];
  const validData = data.filter(
    (point) => Number.isFinite(point.value) && point.value > 0,
  );

  if (validData.length === 0) {
    return (
      <EmptyState
        description="Try another date range or metric."
        title="No chart data"
      />
    );
  }

  return (
    <View>
      <View
        accessible
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="image"
        style={styles.chart}
      >
        <PieChart
          data={validData.map((point, index) => ({
            color: colors[index % colors.length],
            tooltipText: `${point.label}: ${formatValue(point.value)}`,
            value: point.value,
          }))}
          donut
          innerCircleColor={theme.colors.surface}
          innerRadius={45}
          isAnimated
          radius={68}
          showTooltip
          centerLabelComponent={() => (
            <View style={styles.centerLabel}>
              <Text
                style={{
                  color: theme.colors.textSecondary,
                  fontSize: theme.typography.size.caption,
                }}
              >
                Category
              </Text>
              <Text
                style={{
                  color: theme.colors.textPrimary,
                  fontSize: theme.typography.size.body,
                  fontWeight: '600',
                }}
              >
                Mix
              </Text>
            </View>
          )}
        />
      </View>
      <View
        style={[
          styles.legend,
          { gap: theme.spacing.sm, marginTop: theme.spacing.lg },
        ]}
      >
        {validData.map((point, index) => (
          <View key={point.label} style={styles.legendItem}>
            <View
              style={[
                styles.swatch,
                {
                  backgroundColor: colors[index % colors.length],
                  borderRadius: theme.spacing.xs,
                  marginRight: theme.spacing.xs,
                },
              ]}
            />
            <Text
              numberOfLines={1}
              style={{
                color: theme.colors.textSecondary,
                fontSize: theme.typography.size.caption,
              }}
            >
              {point.label}: {formatValue(point.value)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chart: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 144,
  },
  centerLabel: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  legendItem: {
    alignItems: 'center',
    flexDirection: 'row',
    maxWidth: '100%',
  },
  swatch: {
    height: 8,
    width: 8,
  },
});
