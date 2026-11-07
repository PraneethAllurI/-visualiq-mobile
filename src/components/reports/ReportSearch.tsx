import { Search, X } from 'lucide-react-native';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { useTheme } from '@/hooks/useTheme';

export interface ReportSearchProps {
  onChangeText: (value: string) => void;
  value: string;
}

export function ReportSearch({ onChangeText, value }: ReportSearchProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.borderRadius.input,
          marginBottom: theme.spacing.lg,
          minHeight: theme.layout.buttonMinimumHeight,
          paddingHorizontal: theme.spacing.md,
        },
      ]}
    >
      <Search color={theme.colors.textSecondary} size={18} />
      <TextInput
        accessibilityLabel="Search reports by title"
        onChangeText={onChangeText}
        placeholder="Search reports"
        placeholderTextColor={theme.colors.textSecondary}
        returnKeyType="search"
        style={[
          styles.input,
          {
            color: theme.colors.textPrimary,
            fontSize: theme.typography.size.body,
            marginHorizontal: theme.spacing.sm,
          },
        ]}
        value={value}
      />
      {value.length > 0 ? (
        <Pressable
          accessibilityLabel="Clear report search"
          accessibilityRole="button"
          onPress={() => onChangeText('')}
          style={styles.clearButton}
        >
          <X color={theme.colors.textSecondary} size={18} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  clearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 32,
    minWidth: 32,
  },
  container: {
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 10,
  },
});
