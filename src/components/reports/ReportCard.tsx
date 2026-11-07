import { ArrowDownRight, ArrowUpRight, ChevronRight } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppCard } from '@/components/common/AppCard';
import { useTheme } from '@/hooks/useTheme';
import type { Report } from '@/types/report.types';
import { formatDate } from '@/utils/formatDate';
import { formatReportSummary } from '@/utils/formatReportSummary';

export interface ReportCardProps {
  onPress: (report: Report) => void;
  report: Report;
}

export function ReportCard({ onPress, report }: ReportCardProps) {
  const { theme } = useTheme();
  const isPositive = report.growthPercentage >= 0;
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  const trendColor = isPositive ? theme.colors.success : theme.colors.danger;

  return (
    <AppCard style={{ marginBottom: theme.spacing.md, padding: 0 }}>
      <Pressable
        accessibilityHint="Opens report details"
        accessibilityLabel={`${report.title}, ${report.category}, ${formatDate(report.date)}, ${report.summary.label} ${formatReportSummary(report.summary)}`}
        accessibilityRole="button"
        onPress={() => onPress(report)}
        style={({ pressed }) => [
          styles.pressable,
          {
            borderRadius: theme.borderRadius.card,
            opacity: pressed ? 0.8 : 1,
            padding: theme.layout.cardPadding,
          },
        ]}
      >
        <View style={styles.header}>
          <View
            style={[
              styles.categoryBadge,
              {
                backgroundColor: theme.colors.surfaceSecondary,
                borderRadius: theme.borderRadius.button,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
              },
            ]}
          >
            <Text
              style={{
                color: theme.colors.primaryLight,
                fontSize: theme.typography.size.caption,
                fontWeight: '600',
              }}
            >
              {report.category}
            </Text>
          </View>
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: theme.typography.size.caption,
            }}
          >
            {formatDate(report.date)}
          </Text>
        </View>

        <Text
          numberOfLines={2}
          style={[
            styles.title,
            {
              color: theme.colors.textPrimary,
              fontSize: theme.typography.size.cardTitle,
              marginTop: theme.spacing.md,
            },
          ]}
        >
          {report.title}
        </Text>

        <View style={[styles.footer, { marginTop: theme.spacing.md }]}>
          <View style={styles.summary}>
            <Text
              style={{
                color: theme.colors.textSecondary,
                fontSize: theme.typography.size.caption,
              }}
            >
              {report.summary.label}
            </Text>
            <Text
              style={{
                color: theme.colors.textPrimary,
                fontSize: theme.typography.size.body,
                fontWeight: '700',
                marginTop: theme.spacing.xs,
              }}
            >
              {formatReportSummary(report.summary)}
            </Text>
          </View>
          <View style={styles.trailing}>
            <View style={styles.trend}>
              <TrendIcon color={trendColor} size={16} />
              <Text
                style={{
                  color: trendColor,
                  fontSize: theme.typography.size.secondary,
                  fontWeight: '600',
                }}
              >
                {`${report.growthPercentage > 0 ? '+' : ''}${report.growthPercentage.toFixed(1)}%`}
              </Text>
            </View>
            <ChevronRight
              color={theme.colors.textSecondary}
              size={18}
              style={{ marginLeft: theme.spacing.sm }}
            />
          </View>
        </View>
      </Pressable>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  categoryBadge: {
    alignSelf: 'flex-start',
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pressable: {
    minWidth: 0,
  },
  summary: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontWeight: '600',
  },
  trailing: {
    alignItems: 'center',
    flexDirection: 'row',
    flexShrink: 0,
  },
  trend: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
