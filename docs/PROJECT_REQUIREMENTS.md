# VisualIQ – Project Requirements

## 1. Project Overview

VisualIQ is a cross-platform mobile analytics and data visualization application built using React Native, Expo and TypeScript.

The application allows users to explore business analytics, monitor performance metrics, visualize data through interactive charts, review reports and manage application preferences.

**Platforms:** Android and iOS  
**Project Type:** Mobile application  
**Architecture:** Component-based, feature-oriented  
**Application Type:** MVP using local mock data

## 2. Project Objectives

- Build a functional Android and iOS application.
- Implement four primary screens.
- Develop reusable React Native components.
- Demonstrate interactive data visualization.
- Implement responsive mobile layouts.
- Establish maintainable and testable architecture.
- Follow professional Git and GitHub workflows.

## 3. Technology Stack

| Layer                | Technology                        |
| -------------------- | --------------------------------- |
| Framework            | React Native                      |
| Development platform | Expo                              |
| Language             | TypeScript                        |
| Navigation           | Expo Router                       |
| Styling              | React Native StyleSheet           |
| Charts               | React Native Gifted Charts        |
| Icons                | Lucide React Native               |
| State management     | React Context API and React Hooks |
| Local persistence    | AsyncStorage                      |
| Unit testing         | Jest                              |
| Component testing    | React Native Testing Library      |
| E2E testing          | Maestro                           |

Use compatible stable dependency versions. Do not arbitrarily upgrade the Expo SDK or React Native versions.

## 4. Application Navigation

The application must contain exactly four primary bottom navigation tabs:

1. Dashboard
2. Explore
3. Reports
4. Profile

Use Expo Router with file-based routing.

Each screen must maintain a consistent header, spacing, styling and navigation experience.

## 5. Screen Requirements

### 5.1 Dashboard

Purpose: Display an overview of business performance.

Components:

- Application header with logo/title and notification icon.
- Total revenue metric card.
- Active users metric card.
- Growth percentage indicators.
- Revenue overview line chart.
- Weekly performance visualization.
- Recent activity section.

Functional requirements:

- Display realistic mock analytics data.
- Display formatted currency values.
- Display percentage growth.
- Support vertically scrollable content.
- Use reusable metric cards.
- Charts must render from typed data.
- Provide meaningful empty states where applicable.

### 5.2 Explore

Purpose: Provide detailed interactive analytics.

Components:

- Screen title and subtitle.
- Date range selector.
- Metric selection controls.
- Revenue line chart.
- Performance bar chart.
- Category distribution donut chart.

Functional requirements:

- Provide selectable periods: 7 days, 30 days and 90 days.
- Changing the period must update chart datasets.
- Allow switching between available metrics.
- Chart values and labels must correspond to the selected metric.
- Support chart interaction and tooltips where supported.
- Handle missing or empty datasets.
- Maintain responsive chart widths.

### 5.3 Reports

Purpose: Provide detailed analytical reports.

Components:

- Screen header.
- Search input.
- Category filter chips.
- Summary statistics.
- Report cards.
- Report metadata and date.

Functional requirements:

- Search reports by title.
- Filter reports by category.
- Combine search and category filtering.
- Provide a clear-filter action.
- Display appropriate empty results state.
- Use FlatList for report collections.
- Open a report detail view or detail presentation when a report is selected.

For the MVP, report details can use a modal or an appropriate secondary route without introducing another primary tab.

### 5.4 Profile

Purpose: Display user information and application preferences.

Components:

- User avatar.
- User name and email.
- Account preferences.
- Theme preference.
- Notification preference.
- About application.
- Application version.

Functional requirements:

- Implement a working dark/light theme toggle.
- Persist theme preference locally using AsyncStorage.
- Implement a local notification preference toggle.
- Display application information.
- Use accessible touch targets.

Notification preferences are local UI settings only. Do not implement actual push notifications.

## 6. Design Requirements

Default theme: Dark.

Visual direction:

- Modern analytics dashboard.
- Clean and premium mobile interface.
- Dark navy background.
- Purple primary accent.
- Green positive performance indicators.
- Rounded metric cards.
- Minimal visual clutter.

All screens must follow DESIGN_SYSTEM.md.

## 7. Data Requirements

- Use local mock JSON/TypeScript datasets.
- Do not implement backend integration.
- Keep datasets separate from UI components.
- Define TypeScript interfaces for all major data structures.
- Keep data transformations inside services or utilities.
- Format currency, percentages and dates consistently.

Example data categories:

- Revenue analytics.
- Active users.
- Weekly performance.
- Category distribution.
- Recent activity.
- Analytical reports.

Currency: INR (₹).

## 8. Non-Functional Requirements

### Performance

- Avoid unnecessary re-renders.
- Use FlatList for dynamic collections.
- Avoid unnecessarily large component trees.
- Keep chart rendering efficient.

### Responsiveness

- Support small and large mobile devices.
- Avoid hardcoded screen dimensions.
- Support different aspect ratios.
- Prevent horizontal overflow.

### Accessibility

- Provide meaningful accessibility labels.
- Use sufficient color contrast.
- Maintain readable typography.
- Use appropriate touch target sizes.

### Maintainability

- Strict TypeScript.
- Reusable components.
- Separation of business logic and presentation.
- Consistent naming conventions.
- Automated testing.

## 9. Out of Scope

The following features are excluded from the MVP:

- Authentication and registration.
- Backend API integration.
- Live analytics data.
- Database integration.
- Payment functionality.
- Actual push notification infrastructure.
- Multi-user account management.
- Cloud synchronization.

## 10. Definition of Done

The MVP is complete when:

- All four primary screens render correctly.
- Bottom tab navigation works.
- Charts display realistic data.
- Explore filters update visualizations.
- Reports search and filters work.
- Theme switching works and persists.
- Notification preference works locally.
- Android and iOS layouts are compatible.
- Automated tests pass.
- No critical runtime errors remain.
- Project documentation and GitHub repository are updated.
