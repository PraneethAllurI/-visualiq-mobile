import { X } from 'lucide-react-native';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppCard } from '@/components/common/AppCard';
import { useTheme } from '@/hooks/useTheme';
import type { Report } from '@/types/report.types';
import { formatDate } from '@/utils/formatDate';
import { formatPercentage } from '@/utils/formatPercentage';
import { formatReportSummary } from '@/utils/formatReportSummary';

export interface ReportDetailsModalProps {
  onClose: () => void;
  report: Report | null;
}

export function ReportDetailsModal({
  onClose,
  report,
}: ReportDetailsModalProps) {
  const { theme } = useTheme();

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      transparent
      visible={report !== null}
    >
      <View
        style={[
          styles.backdrop,
          { backgroundColor: `${theme.colors.background}E8` },
        ]}
      >
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
          {report ? (
            <View
              style={[
                styles.sheet,
                {
                  backgroundColor: theme.colors.surface,
                  borderColor: theme.colors.border,
                  borderTopLeftRadius: theme.borderRadius.card,
                  borderTopRightRadius: theme.borderRadius.card,
                  paddingHorizontal: theme.layout.screenHorizontalPadding,
                  paddingTop: theme.spacing.lg,
                },
              ]}
            >
              <View style={[styles.heading, { marginBottom: theme.spacing.lg }]}>
                <View style={styles.headingText}>
                  <Text
                    style={{
                      color: theme.colors.primaryLight,
                      fontSize: theme.typography.size.secondary,
                      fontWeight: '600',
                    }}
                  >
                    {report.category} report
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.textPrimary,
                      fontSize: theme.typography.size.sectionHeading,
                      fontWeight: '700',
                      marginTop: theme.spacing.xs,
                    }}
                  >
                    {report.title}
                  </Text>
                </View>
                <Pressable
                  accessibilityLabel="Close report details"
                  accessibilityRole="button"
                  onPress={onClose}
                  style={[
                    styles.closeButton,
                    {
                      backgroundColor: theme.colors.surfaceSecondary,
                      borderRadius: theme.borderRadius.button,
                    },
                  ]}
                >
                  <X color={theme.colors.textPrimary} size={20} />
                </Pressable>
              </View>

              <ScrollView
                contentContainerStyle={{ paddingBottom: theme.spacing.xxl }}
                showsVerticalScrollIndicator={false}
              >
                <AppCard style={{ marginBottom: theme.spacing.lg }}>
                  <Text
                    style={{
                      color: theme.colors.textSecondary,
                      fontSize: theme.typography.size.secondary,
                    }}
                  >
                    {report.summary.label}
                  </Text>
                  <Text
                    style={{
                      color: theme.colors.textPrimary,
                      fontSize: theme.typography.size.metricValue,
                      fontWeight: '700',
                      marginTop: theme.spacing.xs,
                    }}
                  >
                    {formatReportSummary(report.summary)}
                  </Text>
                  <View
                    style={[
                      styles.metadata,
                      { marginTop: theme.spacing.md },
                    ]}
                  >
                    <Text
                      style={{
                        color: theme.colors.textSecondary,
                        fontSize: theme.typography.size.secondary,
                      }}
                    >
                      {formatDate(report.date)}
                    </Text>
                    <Text
                      style={{
                        color:
                          report.growthPercentage >= 0
                            ? theme.colors.success
                            : theme.colors.danger,
                        fontSize: theme.typography.size.secondary,
                        fontWeight: '600',
                      }}
                    >
                      {formatPercentage(report.growthPercentage)}
                    </Text>
                  </View>
                </AppCard>

                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: theme.colors.textPrimary,
                      fontSize: theme.typography.size.cardTitle,
                      marginBottom: theme.spacing.sm,
                    },
                  ]}
                >
                  Overview
                </Text>
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.size.body,
                    lineHeight: 22,
                    marginBottom: theme.spacing.xl,
                  }}
                >
                  {report.description}
                </Text>

                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: theme.colors.textPrimary,
                      fontSize: theme.typography.size.cardTitle,
                      marginBottom: theme.spacing.sm,
                    },
                  ]}
                >
                  Key insights
                </Text>
                {report.highlights.map((highlight) => (
                  <View
                    key={`${report.id}-${highlight}`}
                    style={[
                      styles.highlight,
                      { marginBottom: theme.spacing.sm },
                    ]}
                  >
                    <View
                      style={[
                        styles.bullet,
                        {
                          backgroundColor: theme.colors.primary,
                          borderRadius: theme.spacing.xs,
                          marginRight: theme.spacing.sm,
                          marginTop: 6,
                        },
                      ]}
                    />
                    <Text
                      style={{
                        color: theme.colors.textSecondary,
                        flex: 1,
                        fontSize: theme.typography.size.body,
                        lineHeight: 21,
                      }}
                    >
                      {highlight}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : null}
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bullet: {
    height: 7,
    width: 7,
  },
  closeButton: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  heading: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headingText: {
    flex: 1,
    minWidth: 0,
  },
  highlight: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  metadata: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sectionTitle: {
    fontWeight: '600',
  },
  sheet: {
    borderTopWidth: StyleSheet.hairlineWidth,
    maxHeight: '90%',
    minHeight: '55%',
  },
});
