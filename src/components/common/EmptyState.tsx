import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/useTheme';

export interface EmptyStateProps {
  description?: string;
  icon?: ReactNode;
  title: string;
}

export function EmptyState({ description, icon, title }: EmptyStateProps) {
  const { theme } = useTheme();

  return (
    <View
      accessibilityRole="summary"
      style={[
        styles.container,
        {
          padding: theme.spacing.xxl,
        },
      ]}
    >
      {icon ? <View style={{ marginBottom: theme.spacing.md }}>{icon}</View> : null}
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.textPrimary,
            fontSize: theme.typography.size.sectionHeading,
          },
        ]}
      >
        {title}
      </Text>
      {description ? (
        <Text
          style={[
            styles.description,
            {
              color: theme.colors.textSecondary,
              fontSize: theme.typography.size.body,
              marginTop: theme.spacing.sm,
            },
          ]}
        >
          {description}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  description: {
    lineHeight: 20,
    maxWidth: 320,
    textAlign: 'center',
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
  },
});
