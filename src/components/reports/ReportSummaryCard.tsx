import { StyleSheet, Text } from 'react-native';

import { AppCard } from '@/components/common/AppCard';
import { useTheme } from '@/hooks/useTheme';

export interface ReportSummaryCardProps {
  label: string;
  value: string;
}

export function ReportSummaryCard({
  label,
  value,
}: ReportSummaryCardProps) {
  const { theme } = useTheme();

  return (
    <AppCard style={styles.card}>
      <Text
        numberOfLines={1}
        style={{
          color: theme.colors.textSecondary,
          fontSize: theme.typography.size.caption,
        }}
      >
        {label}
      </Text>
      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.75}
        numberOfLines={1}
        style={{
          color: theme.colors.textPrimary,
          fontSize: theme.typography.size.metricValue,
          fontWeight: '700',
          marginTop: theme.spacing.xs,
        }}
      >
        {value}
      </Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
  },
});
