import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react-native';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import type { PropsWithChildren } from 'react';
import { Text } from 'react-native';

import ProfileRoute from '@/app/(tabs)/profile';
import { ThemeProvider } from '@/context/ThemeContext';
import { useTheme } from '@/hooks/useTheme';

jest.mock(
  '@react-native-async-storage/async-storage',
  () =>
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require(
      '@react-native-async-storage/async-storage/jest/async-storage-mock',
    ),
);

function renderWithTheme({ children }: PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

function ThemeModeProbe() {
  const { themeMode } = useTheme();

  return <Text testID="profile-theme-mode">{themeMode}</Text>;
}

function RenderProfileWithThemeProbe() {
  return (
    <>
      <ThemeModeProbe />
      <ProfileRoute />
    </>
  );
}

describe('Profile screen', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('shows the sample profile, appearance options, notification switch, and app version', async () => {
    await render(<ProfileRoute />, { wrapper: renderWithTheme });
    await waitFor(() => {
      expect(screen.getByRole('switch', { name: 'Notifications preference' }))
        .toBeTruthy();
    });

    expect(screen.getByText('Alex Morgan')).toBeTruthy();
    expect(screen.getByText('alex.morgan@example.com')).toBeTruthy();
    expect(screen.getByText('AM')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Dark', selected: true }))
      .toBeTruthy();
    expect(screen.getByRole('button', { name: 'Light' })).toBeTruthy();
    expect(screen.getByText('VisualIQ')).toBeTruthy();
    expect(screen.getByText('Version 1.0.0')).toBeTruthy();
  });

  it('updates the shared theme immediately and persists the theme preference', async () => {
    await render(<RenderProfileWithThemeProbe />, { wrapper: renderWithTheme });
    await waitFor(() => {
      expect(screen.getByRole('switch', { name: 'Notifications preference' }))
        .toBeTruthy();
    });

    await act(async () => {
      fireEvent.press(screen.getByRole('button', { name: 'Light' }));
    });

    expect(screen.getByTestId('profile-theme-mode').props.children).toBe('light');
    expect(screen.getByRole('button', { name: 'Light', selected: true }))
      .toBeTruthy();
    await waitFor(async () => {
      await expect(AsyncStorage.getItem('@visualiq/theme')).resolves.toBe('light');
    });
  });

  it('persists and restores the local notification preference', async () => {
    await AsyncStorage.setItem('@visualiq/notifications-enabled', 'false');
    const firstRender = await render(<ProfileRoute />, { wrapper: renderWithTheme });

    await waitFor(() => {
      expect(
        screen.getByRole('switch', { name: 'Notifications preference' }).props
          .value,
      ).toBe(false);
    });

    await act(async () => {
      fireEvent(
        screen.getByRole('switch', { name: 'Notifications preference' }),
        'valueChange',
        true,
      );
    });

    await waitFor(async () => {
      await expect(
        AsyncStorage.getItem('@visualiq/notifications-enabled'),
      ).resolves.toBe('true');
    });

    firstRender.unmount();
    await render(<ProfileRoute />, { wrapper: renderWithTheme });

    await waitFor(() => {
      expect(
        screen.getByRole('switch', { name: 'Notifications preference' }).props
          .value,
      ).toBe(true);
    });
  });
});
