import { COLORS, type ThemeMode } from '@/constants/colors';

export const CHART_COLORS = {
  primary: COLORS.dark.primary,
  secondary: COLORS.dark.success,
  tertiary: '#FFB86B',
  additional: '#5CA9FF',
  negative: COLORS.dark.danger,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const TYPOGRAPHY = {
  size: {
    screenTitle: 24,
    sectionHeading: 18,
    cardTitle: 15,
    metricValue: 25,
    body: 14,
    secondary: 12,
    caption: 11,
  },
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

export const BORDER_RADIUS = {
  card: 14,
  button: 12,
  input: 12,
} as const;

export const LAYOUT = {
  screenHorizontalPadding: 20,
  sectionVerticalSpacing: 24,
  cardPadding: 16,
  buttonMinimumHeight: 44,
} as const;

const SHARED_TOKENS = {
  chartColors: CHART_COLORS,
  spacing: SPACING,
  typography: TYPOGRAPHY,
  borderRadius: BORDER_RADIUS,
  layout: LAYOUT,
} as const;

export const THEMES = {
  dark: {
    ...SHARED_TOKENS,
    mode: 'dark',
    colors: COLORS.dark,
  },
  light: {
    ...SHARED_TOKENS,
    mode: 'light',
    colors: COLORS.light,
  },
} as const;

export type VisualIQTheme = (typeof THEMES)[ThemeMode];
