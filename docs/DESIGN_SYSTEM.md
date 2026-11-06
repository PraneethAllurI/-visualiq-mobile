# VisualIQ – Design System and UI Specifications

## 1. Design Philosophy

VisualIQ uses a modern, premium analytics dashboard design.

The interface should feel:

- Professional.
- Minimal.
- Data-focused.
- Clean.
- Modern.
- Consistent across Android and iOS.

Avoid unnecessary decorative elements.

Prioritize readability and information hierarchy.

## 2. Theme

Default theme: Dark.

Support both:

- Dark mode.
- Light mode.

Dark mode is the initial application theme.

Theme preference must persist across application restarts.

All shared components must consume theme tokens rather than hardcode colors.

## 3. Color Palette

### Dark Theme

| Token             | Hex     |
| ----------------- | ------- |
| Background        | #101322 |
| Surface           | #1B2236 |
| Surface Secondary | #232C43 |
| Primary           | #8B7CFF |
| Primary Light     | #A99DFF |
| Success           | #42D6A4 |
| Danger            | #FF6B81 |
| Warning           | #FFC46B |
| Text Primary      | #FFFFFF |
| Text Secondary    | #A6AEC5 |
| Border            | #303A52 |

### Light Theme

| Token             | Hex     |
| ----------------- | ------- |
| Background        | #F5F6FA |
| Surface           | #FFFFFF |
| Surface Secondary | #ECEEF5 |
| Primary           | #6F5CDE |
| Primary Light     | #8B7CFF |
| Success           | #168F6B |
| Danger            | #D94C65 |
| Warning           | #A76C16 |
| Text Primary      | #182033 |
| Text Secondary    | #687187 |
| Border            | #E0E4ED |

### Chart Colors

- Primary series: #8B7CFF.
- Secondary series: #42D6A4.
- Tertiary series: #FFB86B.
- Additional series: #5CA9FF.
- Negative indicators: #FF6B81.

Chart colors must remain distinguishable in both themes.

## 4. Typography

Use the platform's default system font.

Recommended hierarchy:

| Element         | Size |
| --------------- | ---: |
| Screen title    |   24 |
| Section heading |   18 |
| Card title      |   15 |
| Metric value    |   25 |
| Body text       |   14 |
| Secondary text  |   12 |
| Caption         |   11 |

Font weights:

- Regular: 400.
- Medium: 500.
- Semibold: 600.
- Bold: 700.

Maintain consistent typography across all screens.

## 5. Spacing System

Use a consistent spacing scale:

| Token | Value |
| ----- | ----: |
| XS    |     4 |
| SM    |     8 |
| MD    |    12 |
| LG    |    16 |
| XL    |    20 |
| XXL   |    24 |
| XXXL  |    32 |

Default horizontal screen padding: 20.

Default vertical section spacing: 24.

Default card internal padding: 16.

## 6. Component Styling

### Cards

- Background: theme surface color.
- Border radius: 14.
- Border: subtle theme border.
- Internal padding: 16.
- Avoid excessive shadows.
- Maintain consistent card spacing.

### Buttons

- Primary color: theme primary.
- Border radius: 12.
- Minimum height: 44.
- Clear pressed state.
- Appropriate accessibility labels.

### Inputs

- Background: theme surface.
- Border radius: 12.
- Border: theme border.
- Clear placeholder color.
- Consistent internal padding.

### Icons

Use Lucide React Native.

Maintain consistent icon sizes:

- Navigation: 22–24.
- Header: 20–22.
- Inline actions: 18–20.

## 7. Global Layout

Every screen must:

- Respect device safe areas.
- Use consistent horizontal padding.
- Support vertical scrolling where necessary.
- Avoid horizontal overflow.
- Support smaller mobile screens.
- Use the shared theme.
- Maintain consistent headers.

Use ScrollView for screen content and FlatList for dynamic collections.

Avoid hardcoded screen widths and device dimensions.

## 8. Screen Wireframes

### 8.1 Dashboard

Layout order:

1. Header.
2. Metric cards.
3. Revenue overview.
4. Weekly performance.
5. Recent activity.

Header:

- VisualIQ title.
- Notification icon.

Metric cards:

- Two-column grid.
- Total Revenue.
- Active Users.
- Metric value.
- Growth percentage.
- Growth indicator.

Revenue overview:

- Section title.
- Total revenue.
- Percentage growth.
- Line chart.
- Weekly labels.

Weekly performance:

- Bar chart.
- Performance comparison.

Recent activity:

- Activity title.
- Activity icon.
- Activity description.
- Timestamp.

### 8.2 Explore

Layout order:

1. Screen heading.
2. Date range selector.
3. Metric selector.
4. Revenue trend chart.
5. Performance chart.
6. Category distribution chart.

Date options:

- 7 Days.
- 30 Days.
- 90 Days.

Metric options:

- Revenue.
- Users.
- Orders.

All selectors must provide visible active states.

Charts must update when selection changes.

### 8.3 Reports

Layout order:

1. Screen heading.
2. Search input.
3. Category filters.
4. Summary statistics.
5. Report list.

Categories:

- All.
- Revenue.
- Users.
- Performance.

Report cards:

- Report title.
- Category.
- Date.
- Summary value.
- Growth indicator.
- View details action.

Provide a clean empty state when no reports match the selected filters.

### 8.4 Profile

Layout order:

1. Screen heading.
2. User profile card.
3. Preferences section.
4. Notification settings.
5. About section.

Profile card:

- Avatar.
- Name.
- Email.

Settings:

- Theme toggle.
- Notification toggle.
- About VisualIQ.
- Version information.

Theme toggle must update the entire application.

## 9. Bottom Navigation

Four tabs:

| Tab       | Icon                   |
| --------- | ---------------------- |
| Dashboard | house                  |
| Explore   | chart-no-axes-combined |
| Reports   | file-text              |
| Profile   | user-round             |

Requirements:

- Fixed bottom tab navigation.
- Active tab uses primary color.
- Inactive tabs use secondary text color.
- Support safe area insets.
- Clear active state.
- Consistent height across platforms.

Use Expo Router tab navigation.

## 10. Responsive Design

- Do not hardcode device widths.
- Use flex layouts.
- Use two-column metric cards where space permits.
- Allow content to adapt on smaller devices.
- Avoid chart clipping.
- Maintain readable text sizes.
- Test narrow and wider device layouts.

## 11. Interaction Design

All interactive elements must have:

- Clear touch feedback.
- Appropriate touch target sizes.
- Accessibility labels where appropriate.
- Visible selected states.
- Predictable behavior.

Use Pressable for custom interactions.

Avoid using non-interactive Views as buttons.

## 12. Visual Quality Constraints

- Do not mix unrelated color palettes.
- Do not introduce arbitrary font families.
- Do not create inconsistent card radii.
- Do not use excessive gradients.
- Do not overcrowd dashboards.
- Do not use emoji as primary interface icons.
- Do not compromise contrast for visual appearance.

Follow the design system consistently across all screens.
