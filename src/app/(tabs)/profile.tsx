import Constants from 'expo-constants';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import { AppCard } from '@/components/common/AppCard';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { ScreenHeader } from '@/components/common/ScreenHeader';
import { SectionHeader } from '@/components/common/SectionHeader';
import { AppearanceSelector } from '@/components/profile/AppearanceSelector';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { SettingsItem } from '@/components/profile/SettingsItem';
import { PROFILE_USER } from '@/data/profile';
import { useNotificationPreference } from '@/hooks/useNotificationPreference';
import { useTheme } from '@/hooks/useTheme';
import type { ThemeMode } from '@/constants/colors';

export default function ProfileRoute() {
  const { theme, themeMode, setThemeMode } = useTheme();
  const {
    errorMessage: notificationError,
    isEnabled: notificationsEnabled,
    isLoaded: isNotificationPreferenceLoaded,
    setNotificationsEnabled,
  } = useNotificationPreference();
  const [themeError, setThemeError] = useState<string | null>(null);

  const handleThemeChange = async (mode: ThemeMode) => {
    setThemeError(null);

    try {
      await setThemeMode(mode);
    } catch (error) {
      console.error('Unable to save the theme preference.', error);
      setThemeError('Theme changed, but could not be saved for next time.');
    }
  };

  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <ScreenContainer edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: theme.spacing.xxxl,
            paddingTop: theme.spacing.xl,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          subtitle="Manage your preferences"
          title="Profile"
        />
        <ProfileHeader user={PROFILE_USER} />

        <View style={{ marginTop: theme.spacing.xl }}>
          <SectionHeader title="Preferences" />
          <AppCard>
            <SettingsItem
              description="Choose your preferred theme"
              label="Appearance"
              trailing={
                <AppearanceSelector
                  onSelect={(mode) => void handleThemeChange(mode)}
                  selectedMode={themeMode}
                />
              }
            />
            {themeError ? (
              <Text
                accessibilityRole="alert"
                style={[
                  styles.error,
                  {
                    color: theme.colors.danger,
                    fontSize: theme.typography.size.caption,
                    marginTop: theme.spacing.sm,
                  },
                ]}
              >
                {themeError}
              </Text>
            ) : null}
          </AppCard>
        </View>

        <View style={{ marginTop: theme.spacing.xl }}>
          <SectionHeader title="Notifications" />
          <AppCard>
            <SettingsItem
              description="Receive in-app updates and reminders"
              label="Notifications"
              trailing={
                <Switch
                  accessibilityLabel="Notifications preference"
                  accessibilityRole="switch"
                  disabled={!isNotificationPreferenceLoaded}
                  ios_backgroundColor={theme.colors.surfaceSecondary}
                  onValueChange={(value) => {
                    void setNotificationsEnabled(value);
                  }}
                  thumbColor={theme.colors.textPrimary}
                  trackColor={{
                    false: theme.colors.surfaceSecondary,
                    true: theme.colors.primary,
                  }}
                  value={notificationsEnabled}
                />
              }
            />
            {notificationError ? (
              <Text
                accessibilityRole="alert"
                style={[
                  styles.error,
                  {
                    color: theme.colors.danger,
                    fontSize: theme.typography.size.caption,
                    marginTop: theme.spacing.sm,
                  },
                ]}
              >
                {notificationError}
              </Text>
            ) : null}
          </AppCard>
        </View>

        <View style={{ marginTop: theme.spacing.xl }}>
          <SectionHeader title="About" />
          <AppCard>
            <SettingsItem
              description="Analytics, made clear"
              label="VisualIQ"
              trailing={
                <Text
                  style={{
                    color: theme.colors.textSecondary,
                    fontSize: theme.typography.size.secondary,
                  }}
                >
                  Version {appVersion}
                </Text>
              }
            />
          </AppCard>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  error: {
    lineHeight: 16,
  },
});
