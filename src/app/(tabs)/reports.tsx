import { X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { EmptyState } from '@/components/common/EmptyState';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ReportDetailsModal } from '@/components/reports/ReportDetailsModal';
import { ReportFilter } from '@/components/reports/ReportFilter';
import { ReportCard } from '@/components/reports/ReportCard';
import { ReportSearch } from '@/components/reports/ReportSearch';
import { ReportSummaryCard } from '@/components/reports/ReportSummaryCard';
import { REPORTS } from '@/data/reports';
import { useTheme } from '@/hooks/useTheme';
import { filterReports, getReportSummaryStats } from '@/services/reportService';
import type { Report, ReportCategoryFilter } from '@/types/report.types';

export default function ReportsRoute() {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<ReportCategoryFilter>('All');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const filteredReports = useMemo(
    () => filterReports(REPORTS, searchQuery, selectedCategory),
    [searchQuery, selectedCategory],
  );
  const summaryStats = useMemo(() => getReportSummaryStats(REPORTS), []);
  const hasActiveFilters =
    searchQuery.trim().length > 0 || selectedCategory !== 'All';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <ScreenContainer edges={['top', 'left', 'right']}>
      <FlatList
        contentContainerStyle={[
          styles.listContent,
          {
            paddingBottom: theme.spacing.xxxl,
            paddingTop: theme.spacing.xl,
          },
        ]}
        data={filteredReports}
        keyExtractor={(report) => report.id}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          REPORTS.length === 0 ? (
            <EmptyState
              description="Published reports will be available here."
              title="No reports yet"
            />
          ) : (
            <View>
              <EmptyState
                description="Try a different title or category."
                title="No reports match your filters"
              />
              {hasActiveFilters ? (
                <Pressable
                  accessibilityRole="button"
                  onPress={clearFilters}
                  style={[
                    styles.emptyAction,
                    {
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                      borderRadius: theme.borderRadius.button,
                      minHeight: theme.layout.buttonMinimumHeight,
                      marginHorizontal: theme.spacing.xxl,
                      paddingHorizontal: theme.spacing.lg,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: theme.colors.primaryLight,
                      fontSize: theme.typography.size.body,
                      fontWeight: '600',
                    }}
                  >
                    Clear filters
                  </Text>
                </Pressable>
              ) : null}
            </View>
          )
        }
        ListHeaderComponent={
          <View>
            <ScreenHeader
              subtitle="Find and review your business insights"
              title="Reports"
            />

            <Text
              style={[
                styles.overviewTitle,
                {
                  color: theme.colors.textPrimary,
                  fontSize: theme.typography.size.cardTitle,
                  marginBottom: theme.spacing.sm,
                },
              ]}
            >
              Overview
            </Text>
            <View
              style={[
                styles.summaryRow,
                { gap: theme.spacing.sm, marginBottom: theme.spacing.lg },
              ]}
            >
              <ReportSummaryCard
                label="Total reports"
                value={String(summaryStats.reportCount)}
              />
              <ReportSummaryCard
                label="Positive trends"
                value={String(summaryStats.positiveTrendCount)}
              />
              <ReportSummaryCard
                label="Categories"
                value={String(summaryStats.categoryCount)}
              />
            </View>

            <ReportSearch onChangeText={setSearchQuery} value={searchQuery} />
            <ReportFilter
              onSelect={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
            <SectionHeader
              action={
                hasActiveFilters ? (
                  <Pressable
                    accessibilityRole="button"
                    onPress={clearFilters}
                    style={styles.clearFilters}
                  >
                    <X color={theme.colors.primaryLight} size={16} />
                    <Text
                      style={{
                        color: theme.colors.primaryLight,
                        fontSize: theme.typography.size.secondary,
                        fontWeight: '600',
                        marginLeft: theme.spacing.xs,
                      }}
                    >
                      Clear
                    </Text>
                  </Pressable>
                ) : null
              }
              title={`Reports (${filteredReports.length})`}
            />
          </View>
        }
        renderItem={({ item }) => (
          <ReportCard onPress={setSelectedReport} report={item} />
        )}
        showsVerticalScrollIndicator={false}
      />
      <ReportDetailsModal
        onClose={() => setSelectedReport(null)}
        report={selectedReport}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  clearFilters: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 32,
  },
  emptyAction: {
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
  },
  listContent: {
    flexGrow: 1,
  },
  overviewTitle: {
    fontWeight: '600',
  },
  summaryRow: {
    flexDirection: 'row',
  },
});
