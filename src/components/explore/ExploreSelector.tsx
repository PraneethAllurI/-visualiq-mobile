import { Pressable, StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/hooks/useTheme';

export interface ExploreSelectorOption<Value extends string> {
  label: string;
  value: Value;
}

export interface ExploreSelectorProps<Value extends string> {
  accessibilityLabel: string;
  onSelect: (value: Value) => void;
  options: ExploreSelectorOption<Value>[];
  selectedValue: Value;
  title: string;
}

export function ExploreSelector<Value extends string>({
  accessibilityLabel,
  onSelect,
  options,
  selectedValue,
  title,
}: ExploreSelectorProps<Value>) {
  const { theme } = useTheme();

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      style={{ marginBottom: theme.spacing.lg }}
    >
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.textSecondary,
            fontSize: theme.typography.size.secondary,
            marginBottom: theme.spacing.sm,
          },
        ]}
      >
        {title}
      </Text>
      <View style={[styles.options, { gap: theme.spacing.sm }]}>
        {options.map((option) => {
          const isSelected = option.value === selectedValue;

          return (
            <Pressable
              accessibilityLabel={option.label}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              key={option.value}
              onPress={() => onSelect(option.value)}
              style={({ pressed }) => [
                styles.option,
                {
                  backgroundColor: isSelected
                    ? theme.colors.primary
                    : theme.colors.surface,
                  borderColor: isSelected
                    ? theme.colors.primary
                    : theme.colors.border,
                  borderRadius: theme.borderRadius.button,
                  minHeight: theme.layout.buttonMinimumHeight,
                  opacity: pressed ? 0.8 : 1,
                  paddingHorizontal: theme.spacing.sm,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  styles.optionLabel,
                  {
                    color: isSelected
                      ? theme.colors.textPrimary
                      : theme.colors.textSecondary,
                    fontSize: theme.typography.size.secondary,
                  },
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,
    justifyContent: 'center',
    minWidth: 0,
  },
  optionLabel: {
    fontWeight: '600',
    textAlign: 'center',
  },
  options: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: '600',
  },
});
