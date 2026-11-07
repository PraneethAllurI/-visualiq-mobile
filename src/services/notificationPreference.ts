import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTIFICATION_PREFERENCE_KEY = '@visualiq/notifications-enabled';
export const DEFAULT_NOTIFICATIONS_ENABLED = true;

export async function getNotificationsEnabled(): Promise<boolean> {
  const savedPreference = await AsyncStorage.getItem(
    NOTIFICATION_PREFERENCE_KEY,
  );

  if (savedPreference === 'true') {
    return true;
  }

  if (savedPreference === 'false') {
    return false;
  }

  return DEFAULT_NOTIFICATIONS_ENABLED;
}

export async function saveNotificationsEnabled(
  isEnabled: boolean,
): Promise<void> {
  await AsyncStorage.setItem(
    NOTIFICATION_PREFERENCE_KEY,
    String(isEnabled),
  );
}
