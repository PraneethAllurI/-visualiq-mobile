# VisualIQ – Application Architecture

## 1. Architecture Overview

VisualIQ follows a component-based, feature-oriented architecture.

The application separates:

- Navigation.
- Screen presentation.
- Reusable components.
- Business logic.
- Data management.
- Shared state.
- Utilities.
- Automated tests.

The architecture must remain lightweight and appropriate for a four-screen MVP.

Do not introduce unnecessary architectural patterns or dependencies.

## 2. Proposed Folder Structure

```text
visualiq-mobile/
│
├── app/
│   ├── _layout.tsx
│   │
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── index.tsx
│       ├── explore.tsx
│       ├── reports.tsx
│       └── profile.tsx
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppHeader.tsx
│   │   │   ├── AppCard.tsx
│   │   │   ├── ScreenContainer.tsx
│   │   │   └── EmptyState.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── MetricCard.tsx
│   │   │   ├── RevenueChart.tsx
│   │   │   ├── PerformanceChart.tsx
│   │   │   └── ActivityList.tsx
│   │   │
│   │   ├── charts/
│   │   │   ├── LineChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   └── DonutChart.tsx
│   │   │
│   │   ├── explore/
│   │   │   ├── DateRangeSelector.tsx
│   │   │   └── MetricSelector.tsx
│   │   │
│   │   ├── reports/
│   │   │   ├── ReportCard.tsx
│   │   │   ├── ReportFilter.tsx
│   │   │   └── ReportSearch.tsx
│   │   │
│   │   └── profile/
│   │       ├── ProfileHeader.tsx
│   │       └── SettingsItem.tsx
│   │
│   ├── constants/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   └── typography.ts
│   │
│   ├── context/
│   │   └── ThemeContext.tsx
│   │
│   ├── data/
│   │   ├── dashboard.ts
│   │   ├── analytics.ts
│   │   ├── activities.ts
│   │   └── reports.ts
│   │
│   ├── hooks/
│   │   └── useTheme.ts
│   │
│   ├── services/
│   │   ├── analyticsService.ts
│   │   └── reportService.ts
│   │
│   ├── types/
│   │   ├── analytics.types.ts
│   │   ├── report.types.ts
│   │   └── common.types.ts
│   │
│   └── utils/
│       ├── formatCurrency.ts
│       ├── formatPercentage.ts
│       ├── formatDate.ts
│       └── calculateGrowth.ts
│
├── __tests__/
│   ├── utils/
│   ├── services/
│   └── components/
│
├── assets/
│   ├── images/
│   └── fonts/
│
├── docs/
│   ├── PROJECT_REQUIREMENTS.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN_SYSTEM.md
│   └── TESTING.md
│
├── .github/
│   └── copilot-instructions.md
│
├── app.json
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

This is the target structure. Inspect the existing Expo-generated project before making changes. Preserve required Expo configuration and adapt existing files rather than blindly replacing them.

## 3. Folder Responsibilities

### app/

Responsible exclusively for navigation and route entry points.

Route components should remain thin.

They should import and render the relevant screen components rather than contain complex business logic.

### src/components/

Contains reusable presentation components.

Components must receive data through typed props.

Do not fetch or generate business data directly inside reusable presentation components.

### src/constants/

Contains shared design tokens.

Examples:

- Color palette.
- Spacing scale.
- Typography definitions.

Avoid duplicating design values across screens.

### src/context/

Contains globally shared state.

The MVP uses ThemeContext to manage dark and light theme preferences.

Do not place every local state variable inside Context.

### src/data/

Contains static mock datasets.

All mock analytics and report data must be separated from screen components.

### src/hooks/

Contains reusable custom React hooks.

Examples:

- useTheme.

### src/services/

Contains business logic and data transformation functions.

Examples:

- Prepare chart datasets.
- Filter report collections.
- Transform raw analytics data.

Services must not depend on UI components.

### src/types/

Contains reusable TypeScript interfaces and types.

Avoid duplicating interfaces across multiple files.

### src/utils/

Contains pure helper functions.

Examples:

- Currency formatting.
- Percentage formatting.
- Date formatting.
- Growth calculations.

### **tests**/

Contains automated unit and component tests.

Keep test organization consistent with the source code.

## 4. Application Data Flow

The intended data flow is:

Mock Data → Service Layer → Screen → Reusable Components

Example:

1. Dashboard mock data is stored in src/data/dashboard.ts.
2. analyticsService prepares the dashboard metrics.
3. Dashboard screen consumes the prepared data.
4. MetricCard and chart components render the information.

Presentation components must not calculate business metrics independently.

## 5. Navigation Architecture

Use Expo Router.

Primary routes:

- app/(tabs)/index.tsx – Dashboard.
- app/(tabs)/explore.tsx – Explore.
- app/(tabs)/reports.tsx – Reports.
- app/(tabs)/profile.tsx – Profile.

The root layout is responsible for global providers.

The tab layout is responsible for bottom tab navigation.

Use Lucide icons for tab navigation.

Maintain a consistent navigation appearance on Android and iOS.

## 6. Component Design Principles

- Prefer small, focused components.
- Use functional components.
- Use named exports for reusable components.
- Use default exports for Expo route components.
- Define explicit TypeScript props.
- Avoid unnecessary internal state.
- Keep business logic outside presentation components.
- Avoid prop drilling when shared context is appropriate.
- Avoid premature abstractions.

## 7. State Management

Use React Hooks and Context API.

Local component state:

- Search input.
- Selected report category.
- Selected chart metric.
- Selected date range.

Global application state:

- Theme preference.

Do not introduce Redux, Zustand or other state libraries for the MVP.

Persist theme preferences with AsyncStorage.

## 8. Styling Architecture

Use React Native StyleSheet.

Centralize shared design values in constants.

Use Flexbox for layout.

Avoid fixed device dimensions.

Support Android and iOS safe areas.

Use platform-specific styling only when genuinely necessary.

## 9. Naming Conventions

Components:

- PascalCase.
- Example: MetricCard.tsx.

Hooks:

- camelCase with use prefix.
- Example: useTheme.ts.

Utilities:

- camelCase.
- Example: formatCurrency.ts.

Types:

- Descriptive PascalCase interfaces.
- Example: AnalyticsMetric.

Constants:

- UPPER_SNAKE_CASE for individual fixed values where appropriate.

Screens:

- Follow Expo Router route naming.

## 10. Import Conventions

Use the configured @/ alias for src imports where supported.

Example:

```tsx
import { MetricCard } from "@/components/dashboard/MetricCard";
import { COLORS } from "@/constants/colors";
import { useTheme } from "@/hooks/useTheme";
```

Do not introduce inconsistent relative and absolute import conventions.

## 11. Architecture Constraints

- No business logic inside route layouts.
- No chart calculations inside screen components.
- No duplicated mock datasets.
- No direct DOM manipulation.
- No browser APIs.
- No unnecessary dependencies.
- No unnecessary global state.
- No circular imports.
- No direct coupling between UI and future backend implementation.

## 12. Future Extensibility

The architecture should allow future replacement of mock datasets with REST API responses.

The screen and component interfaces should remain independent of the underlying data source.

Do not implement backend infrastructure in the current MVP.
