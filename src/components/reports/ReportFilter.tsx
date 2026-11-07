import { ScrollView, StyleSheet, Pressable, Text, View } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import type { ReportCategoryFilter } from '@/types/report.types';

const CATEGORIES: ReportCategoryFilter[] = [
  'All',
  'Sales',
  'Users',
  'Revenue',
];

export interface ReportFilterProps {
  onSelect: (category: ReportCategoryFilter) => void;
  selectedCategory: ReportCategoryFilter;
}

export function ReportFilter({
  onSelect,
  selectedCategory,
}: ReportFilterProps) {
  const { theme } = useTheme();

  return (
    <View style={{ marginBottom: theme.spacing.lg }}>
      <Text
        style={[
          styles.label,
          {
            color: theme.colors.textSecondary,
            fontSize: theme.typography.size.secondary,
            marginBottom: theme.spacing.sm,
          },
        ]}
      >
        Category
      </Text>
      <ScrollView
        accessibilityLabel="Report category filters"
        contentContainerStyle={{ gap: theme.spacing.sm }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              key={category}
              onPress={() => onSelect(category)}
              style={({ pressed }) => [
                styles.chip,
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
                  paddingHorizontal: theme.spacing.lg,
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
                {category}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
  },
  label: {
    fontWeight: '600',
  },
});
