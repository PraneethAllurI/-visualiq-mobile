import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/useTheme';

export interface SectionHeaderProps {
  action?: ReactNode;
  title: string;
}

export function SectionHeader({ action, title }: SectionHeaderProps) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: theme.spacing.md }]}>
      <Text
        numberOfLines={2}
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontWeight: '600',
    minWidth: 0,
  },
});
