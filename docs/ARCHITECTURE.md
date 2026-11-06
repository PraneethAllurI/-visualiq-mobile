# VisualIQ – Application Architecture

## 1. Architecture Overview

VisualIQ follows a feature-oriented, component-based architecture using React Native, Expo and TypeScript.

The architecture separates application responsibilities into:

- Navigation and routing.
- Screen-level presentation.
- Reusable UI components.
- Design tokens.
- Global application state.
- Data management.
- Business logic.
- Utility functions.
- Type definitions.
- Automated testing.

The primary objective is to maintain a scalable, maintainable and testable codebase without unnecessary architectural complexity.

## 2. Final Project Structure

```text
visualiq-mobile/
│
├── src/
│   │
│   ├── app/
│   │   ├── _layout.tsx
│   │   │
│   │   └── (tabs)/
│   │       ├── _layout.tsx
│   │       ├── index.tsx
│   │       ├── explore.tsx
│   │       ├── reports.tsx
│   │       └── profile.tsx
│   │
│   ├── components/
│   │   │
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
│   ├── hooks/
│   │   └── useTheme.ts
│   │
│   ├── data/
│   │   ├── dashboard.ts
│   │   ├── analytics.ts
│   │   ├── activities.ts
│   │   └── reports.ts
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
├── __tests__/
│   ├── components/
│   ├── services/
│   └── utils/
│
├── .github/
│   └── copilot-instructions.md
│
├── app.json
├── package.json
├── tsconfig.json
├── expo-env.d.ts
├── AGENTS.md
├── README.md
└── .gitignore
```

This is the target structure, not a requirement to create every file immediately.

Create directories and components only when they are needed by an implementation task.

Preserve existing Expo configuration files.

## 3. Application Routing

Expo Router uses file-based routing.

The routing directory is:

`src/app/`

Do not create another root-level `app/` directory.

### Root Layout

File: `src/app/_layout.tsx`

Responsibilities:

- Configure the root navigation layout.
- Register global application providers.
- Register ThemeProvider.
- Configure application-wide status bar behavior.
- Provide the global navigation context.

Keep this file focused on application initialization.

### Tab Layout

File: `src/app/(tabs)/_layout.tsx`

Responsibilities:

- Configure bottom tab navigation.
- Register four primary tabs.
- Configure tab icons.
- Configure active and inactive states.
- Apply theme colors.
- Respect device safe areas.

### Route Responsibilities

| Route                | Screen    |
| -------------------- | --------- |
| `(tabs)/index.tsx`   | Dashboard |
| `(tabs)/explore.tsx` | Explore   |
| `(tabs)/reports.tsx` | Reports   |
| `(tabs)/profile.tsx` | Profile   |

Route files must remain lightweight.

They should import and render their respective screen content or feature components.

Avoid placing extensive business logic inside route files.

## 4. Component Architecture

Components are organized according to their responsibilities.

### Common Components

Location: `src/components/common/`

Contains application-wide reusable UI.

Examples:

- AppHeader
- AppCard
- ScreenContainer
- EmptyState

These components must not depend on individual screen implementations.

### Dashboard Components

Location: `src/components/dashboard/`

Contains dashboard-specific presentation components.

Examples:

- MetricCard
- RevenueChart
- PerformanceChart
- ActivityList

### Chart Components

Location: `src/components/charts/`

Contains reusable chart wrappers.

Supported visualizations:

- Line chart.
- Bar chart.
- Donut chart.

Chart components must receive prepared data through typed props.

### Explore Components

Location: `src/components/explore/`

Contains date range and metric selection components.

### Reports Components

Location: `src/components/reports/`

Contains report cards, search and filtering components.

### Profile Components

Location: `src/components/profile/`

Contains profile and settings-related components.

## 5. Design Tokens

Location: `src/constants/`

Contains centralized design values.

### colors.ts

Defines dark and light theme palettes.

### spacing.ts

Defines the application's spacing scale.

### typography.ts

Defines font sizes, weights and typography styles.

Avoid duplicating design tokens across components.

Follow DESIGN_SYSTEM.md.

## 6. Global State Management

Location: `src/context/`

The MVP uses React Context API for genuinely shared application state.

ThemeContext is responsible for:

- Current theme.
- Theme switching.
- Theme initialization.
- Theme persistence.
- Exposing theme values to components.

Use AsyncStorage for local theme preference persistence.

Location: `src/hooks/`

Custom hooks expose shared functionality.

Example:

`useTheme.ts`

This hook provides convenient access to ThemeContext.

Do not create separate theme state inside individual screens.

## 7. Data Architecture

Location: `src/data/`

Contains static mock datasets.

Examples:

- Dashboard metrics.
- Revenue analytics.
- User analytics.
- Activity records.
- Reports.

All datasets must have corresponding TypeScript types.

Do not hardcode business data inside presentation components.

## 8. Service Layer

Location: `src/services/`

Responsible for data transformations and business logic.

### analyticsService.ts

Responsibilities:

- Prepare dashboard analytics.
- Transform chart datasets.
- Filter analytics by date range.
- Prepare metric comparisons.

### reportService.ts

Responsibilities:

- Search reports.
- Filter reports by category.
- Prepare report summaries.
- Transform report data.

Services must not depend on React components.

Prefer pure functions wherever possible.

## 9. Type Definitions

Location: `src/types/`

Contains shared TypeScript interfaces and types.

Examples:

- AnalyticsMetric.
- RevenueDataPoint.
- ActivityItem.
- Report.
- ReportCategory.
- DateRange.

Avoid duplicating interfaces across files.

Use strict TypeScript.

Avoid the `any` type.

## 10. Utility Functions

Location: `src/utils/`

Contains reusable pure helper functions.

Examples:

- formatCurrency.ts
- formatPercentage.ts
- formatDate.ts
- calculateGrowth.ts

Utilities must be independent of presentation components.

Write unit tests for utility functions.

## 11. Data Flow

The application's standard data flow is:

```text
Data Sources
    |
    v
Services
    |
    v
Screen Routes
    |
    v
Feature Components
    |
    v
Reusable UI Components
```

Example: Dashboard

1. Mock analytics data is defined in `src/data/dashboard.ts`.
2. `analyticsService.ts` prepares the required metrics.
3. The dashboard route consumes the prepared information.
4. MetricCard and chart components render the data.

Presentation components must not independently calculate business metrics.

## 12. Styling Architecture

Use React Native StyleSheet.

All components must follow DESIGN_SYSTEM.md.

Rules:

- Use centralized theme tokens.
- Use Flexbox.
- Avoid hardcoded device dimensions.
- Avoid unnecessary inline styling.
- Support dark and light themes.
- Respect safe areas.
- Support Android and iOS.
- Prevent horizontal overflow.

Do not introduce a web CSS styling architecture into native components.

## 13. Testing Architecture

Location: `__tests__/`

Organize tests by responsibility:

- components/
- services/
- utils/

Use Jest with jest-expo and React Native Testing Library.

Test observable application behavior.

Follow TESTING.md.

## 14. Import Conventions

Use the configured `@/` alias for imports from `src/`.

Examples:

```tsx
import { MetricCard } from "@/components/dashboard/MetricCard";

import { COLORS } from "@/constants/colors";

import { useTheme } from "@/hooks/useTheme";
```

Avoid inconsistent relative import conventions.

Preserve the existing TypeScript configuration.

## 15. Architecture Constraints

- Do not create duplicate navigation directories.
- Do not place business logic inside presentation components.
- Do not place datasets inside screen files.
- Do not duplicate theme implementations.
- Do not introduce unnecessary state management libraries.
- Do not introduce unnecessary dependencies.
- Do not create unused components.
- Do not modify unrelated Expo configuration.
- Do not migrate away from `src/app/` without explicit approval.

## 16. Future Extensibility

The architecture must allow future replacement of mock datasets with backend API responses.

Screens and components must not depend directly on the underlying data source.

The service layer should provide a clear boundary between data retrieval and presentation.

Backend integration is outside the current MVP scope.

## 17. Development Principle

Follow this implementation sequence:

1. Inspect existing files.
2. Understand the requirements.
3. Identify reusable components.
4. Implement the smallest meaningful change.
5. Validate TypeScript.
6. Run relevant tests.
7. Validate Android and iOS behavior.
8. Document significant architectural changes.

Prioritize maintainability, correctness and simplicity over unnecessary abstraction.
