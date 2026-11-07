import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';

import { type ThemeMode } from '@/constants/colors';
import { THEMES, type VisualIQTheme } from '@/constants/theme';

const THEME_STORAGE_KEY = '@visualiq/theme';

export interface ThemeContextValue {
  isThemeLoaded: boolean;
  setThemeMode: (themeMode: ThemeMode) => Promise<void>;
  theme: VisualIQTheme;
  themeMode: ThemeMode;
  toggleTheme: () => Promise<void>;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('dark');
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const hasUserSelectedTheme = useRef(false);

  useEffect(() => {
    let isMounted = true;

    async function loadThemePreference() {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (
          isMounted &&
          !hasUserSelectedTheme.current &&
          (savedTheme === 'dark' || savedTheme === 'light')
        ) {
          setThemeModeState(savedTheme);
        }
      } catch (error) {
        console.error('Unable to load the saved theme preference.', error);
      } finally {
        if (isMounted) {
          setIsThemeLoaded(true);
        }
      }
    }

    void loadThemePreference();

    return () => {
      isMounted = false;
    };
  }, []);

  const setThemeMode = useCallback(async (nextThemeMode: ThemeMode) => {
    hasUserSelectedTheme.current = true;
    setThemeModeState(nextThemeMode);
    await AsyncStorage.setItem(THEME_STORAGE_KEY, nextThemeMode);
  }, []);

  const toggleTheme = useCallback(async () => {
    const nextThemeMode = themeMode === 'dark' ? 'light' : 'dark';
    await setThemeMode(nextThemeMode);
  }, [setThemeMode, themeMode]);

  const value = useMemo(
    () => ({
      isThemeLoaded,
      setThemeMode,
      theme: THEMES[themeMode],
      themeMode,
      toggleTheme,
    }),
    [isThemeLoaded, setThemeMode, themeMode, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
