import { Bell, Banknote, UsersRound } from 'lucide-react-native';
import { FlatList, StyleSheet, View } from 'react-native';

import { BarChart } from '@/components/charts/BarChart';
import { LineChart } from '@/components/charts/LineChart';
import { AppCard } from '@/components/common/AppCard';
import { EmptyState } from '@/components/common/EmptyState';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ActivityList } from '@/components/dashboard/ActivityList';
import { MetricCard } from '@/components/dashboard/MetricCard';
import {
  DASHBOARD_METRICS,
  RECENT_ACTIVITIES,
  REVENUE_TREND,
  WEEKLY_PERFORMANCE,
} from '@/data/dashboard';
import { useTheme } from '@/hooks/useTheme';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatNumber } from '@/utils/formatNumber';
import { formatPercentage } from '@/utils/formatPercentage';

export default function DashboardRoute() {
  const { theme } = useTheme();
  const revenueGrowth = DASHBOARD_METRICS.revenue.growthPercentage;
  const usersGrowth = DASHBOARD_METRICS.users.growthPercentage;

  return (
    <ScreenContainer
      contentContainerStyle={{ paddingTop: theme.spacing.xl }}
      edges={['top', 'left', 'right']}
    >
      <FlatList
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: theme.spacing.xxxl },
        ]}
        data={RECENT_ACTIVITIES}
        ItemSeparatorComponent={() => (
          <View style={{ height: theme.spacing.xs }} />
        )}
        keyExtractor={(activity) => activity.id}
        ListEmptyComponent={
          <EmptyState
            description="New updates will appear here."
            title="No recent activity"
          />
        }
        ListHeaderComponent={
          <View>
            <ScreenHeader
              action={
                <View
                  accessible
                  accessibilityLabel="Notifications"
                  accessibilityRole="image"
                  style={[
                    styles.notificationButton,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                      borderRadius: theme.borderRadius.button,
                    },
                  ]}
                >
                  <Bell color={theme.colors.textPrimary} size={20} />
                </View>
              }
              subtitle="Your business at a glance"
              title="VisualIQ"
            />

            <View
              style={[
                styles.metricRow,
                {
                  gap: theme.spacing.md,
                  marginBottom: theme.spacing.xl,
                },
              ]}
            >
              <MetricCard
                icon={
                  <Banknote color={theme.chartColors.secondary} size={18} />
                }
                label="Total Revenue"
                trend={{
                  direction: revenueGrowth >= 0 ? 'positive' : 'negative',
                  label: `${formatPercentage(revenueGrowth)} this week`,
                }}
                value={formatCurrency(DASHBOARD_METRICS.revenue.value)}
              />
              <MetricCard
                icon={<UsersRound color={theme.chartColors.primary} size={18} />}
                label="Active Users"
                trend={{
                  direction: usersGrowth >= 0 ? 'positive' : 'negative',
                  label: `${formatPercentage(usersGrowth)} this week`,
                }}
                value={formatNumber(DASHBOARD_METRICS.users.value)}
              />
            </View>

            <SectionHeader title="Revenue Trend" />
            <AppCard style={{ marginBottom: theme.spacing.xl }}>
              <LineChart
                accessibilityLabel="Revenue trend chart"
                data={REVENUE_TREND}
                maxValue={30000}
              />
            </AppCard>

            <SectionHeader title="Weekly Performance" />
            <AppCard style={{ marginBottom: theme.spacing.xl }}>
              <BarChart
                accessibilityLabel="Weekly performance chart"
                data={WEEKLY_PERFORMANCE}
                maxValue={25000}
              />
            </AppCard>

            <SectionHeader title="Recent Activity" />
          </View>
        }
        renderItem={({ item }) => <ActivityList activity={item} />}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
  },
  metricRow: {
    flexDirection: 'row',
  },
  notificationButton: {
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
});
