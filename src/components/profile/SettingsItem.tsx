import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/useTheme';

export interface SettingsItemProps {
  description?: string;
  label: string;
  trailing?: ReactNode;
}

export function SettingsItem({
  description,
  label,
  trailing,
}: SettingsItemProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          minHeight: theme.layout.buttonMinimumHeight,
          paddingVertical: theme.spacing.sm,
        },
      ]}
    >
      <View style={styles.copy}>
        <Text
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.typography.size.body,
            fontWeight: '600',
          }}
        >
          {label}
        </Text>
        {description ? (
          <Text
            style={{
              color: theme.colors.textSecondary,
              fontSize: theme.typography.size.secondary,
              marginTop: theme.spacing.xs,
            }}
          >
            {description}
          </Text>
        ) : null}
      </View>
      {trailing ? (
        <View style={[styles.trailing, { marginLeft: theme.spacing.md }]}>
          {trailing}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minWidth: 0,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  trailing: {
    flexShrink: 0,
  },
});
