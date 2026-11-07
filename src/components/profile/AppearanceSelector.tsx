import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import type { ThemeMode } from '@/constants/colors';

export interface AppearanceSelectorProps {
  onSelect: (mode: ThemeMode) => void;
  selectedMode: ThemeMode;
}

const APPEARANCE_OPTIONS: { label: string; value: ThemeMode }[] = [
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' },
];

export function AppearanceSelector({
  onSelect,
  selectedMode,
}: AppearanceSelectorProps) {
  const { theme } = useTheme();

  return (
    <View
      accessibilityLabel="Appearance options"
      style={[styles.container, { gap: theme.spacing.sm }]}
    >
      {APPEARANCE_OPTIONS.map((option) => {
        const isSelected = selectedMode === option.value;

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            key={option.value}
            onPress={() => onSelect(option.value)}
            style={({ pressed }) => [
              styles.option,
              {
                backgroundColor: isSelected
                  ? theme.colors.primary
                  : theme.colors.surfaceSecondary,
                borderColor: isSelected
                  ? theme.colors.primary
                  : theme.colors.border,
                borderRadius: theme.borderRadius.button,
                minHeight: theme.layout.buttonMinimumHeight,
                opacity: pressed ? 0.8 : 1,
                paddingHorizontal: theme.spacing.md,
              },
            ]}
          >
            <Text
              style={{
                color: isSelected
                  ? theme.colors.textPrimary
                  : theme.colors.textSecondary,
                fontSize: theme.typography.size.secondary,
                fontWeight: '600',
              }}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  option: {
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    minWidth: 68,
  },
});
