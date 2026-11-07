import { StyleSheet, Text, View } from 'react-native';

import { AppCard } from '@/components/common/AppCard';
import { useTheme } from '@/hooks/useTheme';
import type { ProfileUser } from '@/types/profile.types';

export interface ProfileHeaderProps {
  user: ProfileUser;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const { theme } = useTheme();
  const initials = user.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();

  return (
    <AppCard style={styles.card}>
      <View
        accessibilityLabel={`${user.name} profile initials ${initials}`}
        accessibilityRole="image"
        style={[
          styles.avatar,
          {
            backgroundColor: theme.colors.surfaceSecondary,
            borderRadius: theme.borderRadius.card,
            marginRight: theme.spacing.lg,
          },
        ]}
      >
        <Text
          style={{
            color: theme.colors.primaryLight,
            fontSize: theme.typography.size.sectionHeading,
            fontWeight: '700',
          }}
        >
          {initials}
        </Text>
      </View>
      <View style={styles.details}>
        <Text
          numberOfLines={1}
          style={{
            color: theme.colors.textPrimary,
            fontSize: theme.typography.size.cardTitle,
            fontWeight: '700',
          }}
        >
          {user.name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.size.secondary,
            marginTop: theme.spacing.xs,
          }}
        >
          {user.email}
        </Text>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  details: {
    flex: 1,
    minWidth: 0,
  },
});
