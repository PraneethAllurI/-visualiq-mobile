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
import { Pressable, Text, View } from 'react-native';

import {
  BORDER_RADIUS,
  CHART_COLORS,
  LAYOUT,
  SPACING,
  THEMES,
  TYPOGRAPHY,
} from '@/constants/theme';
import { ThemeProvider } from '@/context/ThemeContext';
import { useTheme } from '@/hooks/useTheme';

// AsyncStorage publishes its test mock through a CommonJS entry point.
jest.mock(
  '@react-native-async-storage/async-storage',
  () =>
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require(
      '@react-native-async-storage/async-storage/jest/async-storage-mock',
    ),
);

function ThemeProbe() {
  const { isThemeLoaded, setThemeMode, theme, themeMode, toggleTheme } = useTheme();

  return (
    <View>
      <Text testID="theme-mode">{themeMode}</Text>
      <Text testID="theme-loaded">{String(isThemeLoaded)}</Text>
      <Text testID="theme-background">{theme.colors.background}</Text>
      <Text testID="small-spacing">{theme.spacing.sm}</Text>
      <Pressable accessibilityRole="button" onPress={() => void toggleTheme()}>
        <Text>Toggle theme</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        onPress={() => void setThemeMode('light')}
      >
        <Text>Set light theme</Text>
      </Pressable>
    </View>
  );
}

function renderThemeProvider({ children }: PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('VisualIQ theme system', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('uses the design system tokens and defaults to dark mode', async () => {
    await render(<ThemeProbe />, { wrapper: renderThemeProvider });

    expect(screen.getByTestId('theme-mode').props.children).toBe('dark');
    expect(screen.getByTestId('theme-background').props.children).toBe('#101322');
    expect(THEMES.dark.colors).toEqual({
      background: '#101322',
      surface: '#1B2236',
      surfaceSecondary: '#232C43',
      primary: '#8B7CFF',
      primaryLight: '#A99DFF',
      success: '#42D6A4',
      danger: '#FF6B81',
      warning: '#FFC46B',
      textPrimary: '#FFFFFF',
      textSecondary: '#A6AEC5',
      border: '#303A52',
    });
    expect(THEMES.light.colors).toEqual({
      background: '#F5F6FA',
      surface: '#FFFFFF',
      surfaceSecondary: '#ECEEF5',
      primary: '#6F5CDE',
      primaryLight: '#8B7CFF',
      success: '#168F6B',
      danger: '#D94C65',
      warning: '#A76C16',
      textPrimary: '#182033',
      textSecondary: '#687187',
      border: '#E0E4ED',
    });
    expect(CHART_COLORS).toEqual({
      primary: '#8B7CFF',
      secondary: '#42D6A4',
      tertiary: '#FFB86B',
      additional: '#5CA9FF',
      negative: '#FF6B81',
    });
    expect(SPACING).toEqual({
      xs: 4,
      sm: 8,
      md: 12,
      lg: 16,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    });
    expect(TYPOGRAPHY.size).toEqual({
      screenTitle: 24,
      sectionHeading: 18,
      cardTitle: 15,
      metricValue: 25,
      body: 14,
      secondary: 12,
      caption: 11,
    });
    expect(TYPOGRAPHY.weight).toEqual({
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    });
    expect(BORDER_RADIUS).toEqual({ card: 14, button: 12, input: 12 });
    expect(LAYOUT).toEqual({
      screenHorizontalPadding: 20,
      sectionVerticalSpacing: 24,
      cardPadding: 16,
      buttonMinimumHeight: 44,
    });
    await waitFor(() => {
      expect(screen.getByTestId('theme-loaded').props.children).toBe('true');
    });
  });

  it('restores a previously saved theme on initialization', async () => {
    await AsyncStorage.setItem('@visualiq/theme', 'light');

    await render(<ThemeProbe />, { wrapper: renderThemeProvider });

    await waitFor(() => {
      expect(screen.getByTestId('theme-mode').props.children).toBe('light');
      expect(screen.getByTestId('theme-background').props.children).toBe('#F5F6FA');
    });
  });

  it('switches themes immediately and persists the selected preference', async () => {
    await render(<ThemeProbe />, { wrapper: renderThemeProvider });
    await waitFor(() => {
      expect(screen.getByTestId('theme-loaded').props.children).toBe('true');
    });

    await act(async () => {
      fireEvent.press(screen.getByRole('button', { name: 'Toggle theme' }));
    });

    expect(screen.getByTestId('theme-mode').props.children).toBe('light');
    expect(screen.getByTestId('theme-background').props.children).toBe('#F5F6FA');
    await waitFor(async () => {
      await expect(AsyncStorage.getItem('@visualiq/theme')).resolves.toBe('light');
    });
  });
});
