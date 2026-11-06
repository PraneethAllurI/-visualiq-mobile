# VisualIQ – Testing Strategy

## 1. Testing Objectives

Testing must ensure:

- Business logic produces correct results.
- Components render correctly.
- User interactions work.
- Filters and selectors behave correctly.
- Theme preferences persist.
- Existing functionality is not broken by new changes.

Tests must be meaningful and focus on observable application behavior.

## 2. Testing Technology

### Unit Testing

Jest with jest-expo.

Used for:

- Utility functions.
- Currency formatting.
- Percentage formatting.
- Growth calculations.
- Analytics transformations.
- Report filtering.

### Component Testing

React Native Testing Library.

Used for:

- Component rendering.
- User interactions.
- Accessibility queries.
- Empty states.
- Conditional rendering.

### End-to-End Testing

Maestro.

Used for:

- Application launch.
- Bottom tab navigation.
- Dashboard visibility.
- Explore interactions.
- Report filtering.
- Theme switching.

E2E testing is an additional validation layer and must not delay the core MVP.

## 3. Testing Folder Structure

```text
__tests__/
│
├── utils/
│   ├── formatCurrency.test.ts
│   ├── formatPercentage.test.ts
│   └── calculateGrowth.test.ts
│
├── services/
│   ├── analyticsService.test.ts
│   └── reportService.test.ts
│
└── components/
    ├── MetricCard.test.tsx
    ├── ReportCard.test.tsx
    └── EmptyState.test.tsx
```

Keep test filenames consistent with their source files.

## 4. Unit Testing Standards

All pure utility functions must have unit tests.

Examples:

### Currency Formatting

Test:

- Positive currency values.
- Zero.
- Decimal values.
- Large values.
- INR formatting.

### Growth Calculation

Formula:

Growth Percentage = ((Current Value - Previous Value) / Previous Value) × 100

Test:

- Positive growth.
- Negative growth.
- Zero growth.
- Previous value equal to zero.
- Invalid input handling.

Define the expected behavior for division by zero explicitly.

### Report Filtering

Test:

- All categories.
- Individual categories.
- Search by title.
- Case-insensitive search.
- Combined search and category filters.
- No matching results.

## 5. Component Testing Standards

Use React Native Testing Library.

Test:

- Component renders with valid props.
- Correct data is displayed.
- Missing optional values are handled.
- Buttons respond to presses.
- Toggles update state.
- Empty states render correctly.
- Accessibility labels are available.

Prefer queries based on accessible roles and visible text.

Avoid testing internal implementation details.

## 6. Screen Testing

### Dashboard

- Header renders.
- Metric cards display correct values.
- Charts receive valid datasets.
- Recent activity displays correctly.

### Explore

- Default date range is selected.
- Changing date range updates chart data.
- Metric selector updates the selected metric.
- Empty data is handled.

### Reports

- Reports render.
- Search filters results.
- Category filters work.
- Search and category filters work together.
- Empty state appears when no results match.

### Profile

- User details render.
- Theme preference can be changed.
- Notification preference can be changed.
- Theme preference persists across application restarts.

## 7. Jest Configuration

Use the Expo-compatible Jest preset.

Expected configuration in package.json:

```json
{
  "jest": {
    "preset": "jest-expo",
    "setupFilesAfterEnv": ["<rootDir>/jest.setup.ts"]
  }
}
```

Create jest.setup.ts for shared test setup and matchers when required by the installed testing library version.

Mock native modules such as AsyncStorage when necessary.

Do not mock ordinary business logic that should be tested directly.

## 8. Package Scripts

Maintain these scripts in package.json:

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "lint": "expo lint",
    "typecheck": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

Preserve existing Expo scripts where appropriate.

## 9. Test Naming Convention

Use descriptive test names.

Examples:

```tsx
it("displays the formatted revenue value", () => {});

it("calculates positive growth correctly", () => {});

it("filters reports by category", () => {});

it("updates the selected date range", () => {});
```

Tests should describe expected behavior rather than implementation details.

## 10. Coverage Expectations

Prioritize complete coverage of critical business logic.

Initial targets:

- Utility functions: 90% or higher.
- Services: 85% or higher.
- Reusable components: important rendering and interaction paths covered.
- Screen functionality: critical user flows covered.

These are targets, not reasons to write meaningless tests.

## 11. Development Testing Workflow

After implementing a feature:

1. Run TypeScript checks.
2. Run relevant unit tests.
3. Run component tests.
4. Launch the Expo application.
5. Validate Android behavior.
6. Review iOS compatibility.
7. Fix errors before opening the Pull Request.

Commands:

```bash
npm run typecheck
npm test
npm run lint
```

## 12. Pull Request Testing Requirements

Before merging a feature PR:

- No TypeScript errors.
- Relevant tests pass.
- No critical runtime errors.
- Existing functionality remains intact.
- Android and iOS implications have been reviewed.
- No unrelated files have been modified.

## 13. Testing Principles

- Test behavior, not implementation details.
- Keep tests independent.
- Use predictable mock datasets.
- Avoid unnecessary snapshots.
- Do not ignore failing tests.
- Do not disable tests to make a build pass.
- Fix root causes instead of hiding errors.
