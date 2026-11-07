# GitHub Copilot Instructions – VisualIQ

## 1. Project Context

You are contributing to VisualIQ, a cross-platform Android and iOS analytics application.

The application is built using React Native, Expo and TypeScript.

The application has four primary screens:

1. Dashboard
2. Explore
3. Reports
4. Profile

Before implementing any feature, understand the existing project structure and read:

- docs/PROJECT_REQUIREMENTS.md
- docs/ARCHITECTURE.md
- docs/DESIGN_SYSTEM.md
- docs/TESTING.md

These documents define the project's requirements and engineering standards.

## 2. Core Technology Stack

Use the following technologies:

- React Native
- Expo
- TypeScript
- Expo Router
- React Native StyleSheet
- React Native Gifted Charts
- Lucide React Native
- React Context API
- AsyncStorage
- Jest
- React Native Testing Library

Use compatible versions of dependencies already installed in the project.

Check `package.json` before using or adding a package. Reuse installed dependencies; do not install duplicate or unnecessary packages. Never upgrade Expo, React Native or major dependencies without explicit approval.

## 3. General Development Rules

- Always use TypeScript.
- Use functional components.
- Use React Hooks.
- Prefer named exports for reusable components.
- Use default exports for Expo route components.
- Define explicit component prop types.
- Avoid the any type.
- Use meaningful names.
- Keep functions focused.
- Avoid unnecessary abstractions.
- Avoid duplicated code.
- Avoid unnecessary dependencies.
- Preserve existing working functionality.
- Do not rewrite unrelated files.

## 4. React Native Development Rules

Use React Native primitives.

- View instead of div.
- Text instead of span or p.
- Pressable instead of custom HTML buttons.
- Image instead of img.
- ScrollView for smaller scrollable content.
- FlatList for dynamic collections.
- StyleSheet.create for styling.

Use SafeAreaView from react-native-safe-area-context or the appropriate safe area utilities already configured by Expo.

Never use:

- Browser DOM APIs.
- document.
- window-based layout calculations.
- Direct DOM manipulation.
- Unsupported CSS properties.
- HTML elements.

Remember that React Native does not render HTML.

## 5. Navigation Rules

- Use Expo Router.
- Use file-based routing.
- `src/app/` is the only Expo Router directory.
- Never create a root-level `app/` directory or a second routing directory.
- Follow the documented `src/app/_layout.tsx` and `src/app/(tabs)/` route structure.
- Keep screen presentation components separate from route definitions.
- Implement exactly four primary tabs: Dashboard, Explore, Reports and Profile.
- Maintain navigation consistency.
- Use appropriate icons from Lucide React Native.
- Avoid custom navigation implementations.

## 6. Architecture Rules

Follow docs/ARCHITECTURE.md.

Responsibilities:

- `src/app/`: The only Expo Router directory. Keep the root `_layout.tsx` here and the four routes in `(tabs)/`: `_layout.tsx`, `index.tsx` (Dashboard), `explore.tsx`, `reports.tsx` and `profile.tsx`.
- `src/components/common/`: Shared UI such as AppHeader, AppCard, ScreenContainer and EmptyState.
- `src/components/dashboard/`, `src/components/charts/`, `src/components/explore/`, `src/components/reports/`, `src/components/profile/`: Screen-specific components and reusable chart wrappers.
- `src/constants/`: Centralized colors, spacing and typography tokens.
- `src/context/`: Shared application state, including ThemeContext.
- `src/hooks/`: Custom hooks, including useTheme.
- `src/data/`: Typed static mock datasets.
- `src/services/`: Business logic and data transformations.
- `src/types/`: Shared TypeScript types and interfaces.
- `src/utils/`: Pure utility functions.
- `__tests__/components/`, `__tests__/services/`, `__tests__/utils/`: Automated tests organized by responsibility.
- `assets/` and `docs/`: Application assets and project documentation.

Follow the target folder structure and responsibilities in `docs/ARCHITECTURE.md`; create files only when needed. Do not place complex business logic inside route files.

Do not place data transformations inside presentation components.

Do not create new architectural layers without a valid reason.

The standard data flow is `src/data/` → `src/services/` → route/screen → feature and reusable components. Keep services independent of React components and presentation components independent of mock datasets.

## 7. Component Development

Every reusable component must:

- Have a clear responsibility.
- Accept typed props.
- Support expected data states.
- Follow the design system.
- Avoid unnecessary internal state.
- Avoid direct dependency on mock datasets.
- Be accessible.
- Be reusable when appropriate.

Do not create one enormous component for an entire screen.

Avoid splitting extremely simple elements into unnecessary components.

Maintain a practical balance.

## 8. Styling Rules

Follow docs/DESIGN_SYSTEM.md.

- Use the documented VisualIQ design system; the default theme is dark, and both dark and light themes must be supported.
- Use React Native StyleSheet.
- Centralize color tokens.
- Centralize spacing tokens.
- Centralize typography tokens.
- Support dark and light themes.
- Use Flexbox.
- Avoid hardcoded device dimensions.
- Avoid arbitrary color values.
- Avoid inconsistent card radii.
- Avoid excessive shadows and gradients.
- Support safe areas.
- Prevent horizontal overflow.

Use theme values from the documented theme architecture. Do not introduce a separate styling or web CSS system.

## 9. Theme Management

Use `src/context/ThemeContext.tsx` and the `src/hooks/useTheme.ts` hook.

The application must support:

- Dark theme.
- Light theme.
- Dark as the default theme.
- Theme initialization and persisted theme preference.

Use the already-installed AsyncStorage dependency for local theme persistence. Keep theme state, switching, initialization and persistence in the shared theme context; do not duplicate theme state in screens.

Avoid duplicating theme state across individual screens.

All shared components must respond to theme changes.

## 10. State Management

Use:

- useState for local state.
- useMemo for expensive derived calculations when appropriate.
- useCallback when stable callback references are useful.
- useContext for shared application state.

Avoid unnecessary useEffect calls.

Avoid Redux, Zustand or other state management libraries unless explicitly approved.

Do not introduce global state for simple local interactions.

## 11. Data and Business Logic

- Keep mock datasets inside src/data/.
- Define appropriate TypeScript types.
- Use src/services/ for data preparation and filtering.
- Use src/utils/ for pure calculations.
- Do not hardcode business metrics inside UI components.
- Handle missing and invalid data.
- Avoid mutating source datasets.
- Use INR currency formatting.
- Use consistent date and percentage formatting.

Keep the data layer independent of presentation components.

## 12. Chart Development

Use the installed React Native Gifted Charts dependency and verify its installed API before using properties or methods.

Place reusable chart wrappers in `src/components/charts/` for:

- Line charts.
- Bar charts.
- Donut charts.

Rules:

- Accept typed chart data through props.
- Keep chart configuration inside chart components.
- Handle empty datasets.
- Handle invalid numerical values.
- Use centralized chart colors.
- Support responsive widths.
- Ensure labels remain readable.
- Do not calculate business metrics inside chart components.
- Verify the chart library's installed API before using properties or methods.

## 13. Testing Requirements

Follow docs/TESTING.md.

Use Jest with jest-expo.

Use React Native Testing Library.

Write tests for:

- Utility functions.
- Business logic.
- Data transformations.
- Component rendering.
- User interactions.
- Filtering.
- Theme behavior.

Test user-visible behavior.

Do not write meaningless tests just to increase coverage.

Never disable failing tests to make the build pass.

## 14. Git and Version Control Rules

The project uses:

- main: Stable production branch.
- develop: Integration branch.
- feature/\*: Feature development.
- fix/\*: Bug fixes.
- docs/\*: Documentation changes.

Never directly modify main or develop as part of feature implementation.

Do not execute git commit, git push, git merge or create Pull Requests without explicit developer approval.

Suggest appropriate conventional commit messages.

Never force-push or rewrite Git history without explicit approval.

Preserve existing worktree changes. Do not discard or overwrite unrelated user changes.

## 15. AI Implementation Workflow

Before implementing a task:

1. Inspect the current project structure.
2. Read relevant project documentation.
3. Identify existing components that can be reused.
4. Identify affected files.
5. Explain the implementation plan briefly.
6. Implement only the requested functionality.
7. Add or update relevant tests.
8. Run TypeScript validation.
9. Run relevant automated tests.
10. Summarize modified files and remaining issues.

Do not regenerate the application.

Do not create duplicate files.

Do not assume a component or dependency exists without checking.

Do not silently install new dependencies.

Ask for approval before major architecture changes.

## 16. Debugging Rules

When an error occurs:

1. Identify the actual error.
2. Inspect the relevant implementation.
3. Determine the root cause.
4. Explain the cause briefly.
5. Apply the smallest appropriate fix.
6. Run relevant tests.
7. Verify that existing functionality still works.

Do not suppress errors without understanding them.

Do not use arbitrary timeouts or workarounds to hide rendering issues.

## 17. Definition of Done

A feature is complete only when:

- Requirements are satisfied.
- Code follows the architecture.
- UI follows the design system.
- TypeScript validation passes.
- Relevant automated tests pass.
- Android and iOS compatibility is considered.
- No critical runtime errors remain.
- No unrelated files are modified.

Always prioritize correctness, maintainability and consistency over generating code quickly.

## 18. Developer rules

- Always ask for clarification if requirements are unclear.
- Avoid making assumptions about requirements.
- Avoid making assumptions about existing code.
- Avoid making assumptions about existing dependencies.
- before writing the code in existing files, check the existing code and dependencies to avoid duplication.
