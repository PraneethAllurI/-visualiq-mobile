import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppCard } from '@/components/common/AppCard';
import { useTheme } from '@/hooks/useTheme';

export type MetricTrendDirection = 'positive' | 'negative' | 'neutral';

export interface MetricTrend {
  direction: MetricTrendDirection;
  label: string;
}

export interface MetricCardProps {
  icon?: ReactNode;
  label: string;
  trend?: MetricTrend;
  value: string;
}

export function MetricCard({ icon, label, trend, value }: MetricCardProps) {
  const { theme } = useTheme();

  const trendColor =
    trend?.direction === 'positive'
      ? theme.colors.success
      : trend?.direction === 'negative'
        ? theme.colors.danger
        : theme.colors.textSecondary;

  return (
    <AppCard style={styles.card}>
      <View style={styles.heading}>
        <Text
          numberOfLines={1}
          style={[
            styles.label,
            {
              color: theme.colors.textSecondary,
              fontSize: theme.typography.size.secondary,
            },
          ]}
        >
          {label}
        </Text>
        {icon ? (
          <View style={[styles.icon, { marginLeft: theme.spacing.sm }]}>
            {icon}
          </View>
        ) : null}
      </View>
      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.75}
        numberOfLines={1}
        style={[
          styles.value,
          {
            color: theme.colors.textPrimary,
            fontSize: theme.typography.size.metricValue,
            marginTop: theme.spacing.xs,
          },
        ]}
      >
        {value}
      </Text>
      {trend ? (
        <Text
          accessibilityLabel={`Trend ${trend.direction}: ${trend.label}`}
          style={[
            styles.trend,
            {
              color: trendColor,
              fontSize: theme.typography.size.secondary,
              marginTop: theme.spacing.xs,
            },
          ]}
        >
          {trend.direction === 'positive'
            ? '↑ '
            : trend.direction === 'negative'
              ? '↓ '
              : ''}
          {trend.label}
        </Text>
      ) : null}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 0,
  },
  icon: {
    flexShrink: 0,
  },
  label: {
    flex: 1,
    minWidth: 0,
  },
  trend: {
    fontWeight: '600',
  },
  value: {
    fontWeight: '700',
  },
});
