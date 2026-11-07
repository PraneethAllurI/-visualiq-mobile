export const COLORS = {
  dark: {
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
  },
  light: {
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
  },
} as const;

export type ThemeMode = keyof typeof COLORS;
