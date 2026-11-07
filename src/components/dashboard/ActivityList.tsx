import {
  Banknote,
  FileText,
  ShoppingCart,
  UserRoundPlus,
} from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import type { DashboardActivity } from '@/types/dashboard.types';
import { useTheme } from '@/hooks/useTheme';

export interface ActivityListProps {
  activity: DashboardActivity;
}

export function ActivityList({ activity }: ActivityListProps) {
  const { theme } = useTheme();

  const Icon =
    activity.kind === 'revenue'
      ? Banknote
      : activity.kind === 'user'
        ? UserRoundPlus
        : activity.kind === 'order'
          ? ShoppingCart
          : FileText;
  const iconColor =
    activity.kind === 'revenue'
      ? theme.chartColors.secondary
      : activity.kind === 'user'
        ? theme.chartColors.primary
        : activity.kind === 'order'
          ? theme.chartColors.additional
          : theme.chartColors.tertiary;

  return (
    <View
      accessibilityLabel={`${activity.title}. ${activity.description}. ${activity.timeLabel}`}
      style={styles.container}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: theme.colors.surfaceSecondary,
            borderRadius: theme.borderRadius.button,
            marginRight: theme.spacing.md,
          },
        ]}
      >
        <Icon color={iconColor} size={20} />
      </View>
      <View style={styles.copy}>
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            {
              color: theme.colors.textPrimary,
              fontSize: theme.typography.size.body,
            },
          ]}
        >
          {activity.title}
        </Text>
        <Text
          numberOfLines={2}
          style={[
            styles.description,
            {
              color: theme.colors.textSecondary,
              fontSize: theme.typography.size.secondary,
              marginTop: theme.spacing.xs,
            },
          ]}
        >
          {activity.description}
        </Text>
      </View>
      <Text
        style={[
          styles.time,
          {
            color: theme.colors.textSecondary,
            fontSize: theme.typography.size.caption,
            marginLeft: theme.spacing.sm,
          },
        ]}
      >
        {activity.timeLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    minWidth: 0,
    paddingVertical: 10,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  description: {
    lineHeight: 16,
  },
  iconContainer: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  time: {
    flexShrink: 0,
    textAlign: 'right',
  },
  title: {
    fontWeight: '600',
  },
});
