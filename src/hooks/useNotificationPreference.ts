import { useCallback, useEffect, useState } from 'react';

import {
  DEFAULT_NOTIFICATIONS_ENABLED,
  getNotificationsEnabled,
  saveNotificationsEnabled,
} from '@/services/notificationPreference';

export function useNotificationPreference() {
  const [isEnabled, setIsEnabled] = useState(
    DEFAULT_NOTIFICATIONS_ENABLED,
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPreference() {
      try {
        const savedPreference = await getNotificationsEnabled();

        if (isMounted) {
          setIsEnabled(savedPreference);
        }
      } catch (error) {
        console.error('Unable to load the notification preference.', error);

        if (isMounted) {
          setErrorMessage('Could not load your saved notification setting.');
        }
      } finally {
        if (isMounted) {
          setIsLoaded(true);
        }
      }
    }

    void loadPreference();

    return () => {
      isMounted = false;
    };
  }, []);

  const setNotificationsEnabled = useCallback(async (nextValue: boolean) => {
    setIsEnabled(nextValue);
    setErrorMessage(null);

    try {
      await saveNotificationsEnabled(nextValue);
    } catch (error) {
      console.error('Unable to save the notification preference.', error);
      setErrorMessage('Could not save this setting. Please try again.');
    }
  }, []);

  return {
    errorMessage,
    isEnabled,
    isLoaded,
    setNotificationsEnabled,
  };
}
