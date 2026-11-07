import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/useTheme';

export interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  const { theme } = useTheme();

  return (
    <View
      accessibilityLabel={message}
      accessibilityRole="progressbar"
      style={[
        styles.container,
        {
          padding: theme.spacing.xxl,
        },
      ]}
    >
      <ActivityIndicator
        accessibilityLabel={message}
        color={theme.colors.primary}
        size="large"
      />
      <Text
        style={[
          styles.message,
          {
            color: theme.colors.textSecondary,
            fontSize: theme.typography.size.body,
            marginTop: theme.spacing.md,
          },
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
  },
});
