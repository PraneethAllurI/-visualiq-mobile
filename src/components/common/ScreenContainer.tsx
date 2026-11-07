import type { PropsWithChildren } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import {
  SafeAreaView,
  type Edge,
} from 'react-native-safe-area-context';

import { useTheme } from '@/hooks/useTheme';

export interface ScreenContainerProps extends PropsWithChildren {
  contentContainerStyle?: StyleProp<ViewStyle>;
  edges?: Edge[];
  scrollable?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ScreenContainer({
  children,
  contentContainerStyle,
  edges = ['top', 'right', 'bottom', 'left'],
  scrollable = false,
  style,
}: ScreenContainerProps) {
  const { theme } = useTheme();

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.safeArea, { backgroundColor: theme.colors.background }, style]}
    >
      {scrollable ? (
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: theme.layout.screenHorizontalPadding },
            contentContainerStyle,
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View
          style={[
            styles.content,
            { paddingHorizontal: theme.layout.screenHorizontalPadding },
            contentContainerStyle,
          ]}
        >
          {children}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  safeArea: {
    flex: 1,
  },
});
