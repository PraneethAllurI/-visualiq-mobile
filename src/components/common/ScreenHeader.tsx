import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/useTheme';

export interface ScreenHeaderProps {
  action?: ReactNode;
  subtitle?: string;
  title: string;
}

export function ScreenHeader({ action, subtitle, title }: ScreenHeaderProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { marginBottom: theme.spacing.lg },
      ]}
    >
      <View style={styles.textContent}>
        <Text
          numberOfLines={2}
          style={[
            styles.title,
            {
              color: theme.colors.textPrimary,
              fontSize: theme.typography.size.screenTitle,
            },
          ]}
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.textSecondary,
                fontSize: theme.typography.size.body,
                marginTop: theme.spacing.xs,
              },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      {action ? (
        <View style={[styles.action, { marginLeft: theme.spacing.md }]}>
          {action}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  action: {
    flexShrink: 0,
  },
  container: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtitle: {
    lineHeight: 20,
  },
  textContent: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontWeight: '700',
  },
});
