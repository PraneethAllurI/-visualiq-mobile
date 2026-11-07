import type { Report } from '@/types/report.types';

export const REPORTS: Report[] = [
  {
    id: 'report-revenue-october',
    title: 'October Revenue Overview',
    category: 'Revenue',
    date: '2026-11-02',
    description:
      'A review of revenue performance across subscriptions, services, and retail during October.',
    summary: {
      format: 'currency',
      label: 'Total revenue',
      value: 284000,
    },
    growthPercentage: 15.4,
    highlights: [
      'Recurring subscriptions remained the largest revenue source.',
      'Service revenue grew steadily through the final two weeks.',
      'Overall revenue finished above the previous month.',
    ],
  },
  {
    id: 'report-sales-quarterly',
    title: 'Quarterly Sales Performance',
    category: 'Sales',
    date: '2026-10-28',
    description:
      'A quarterly summary of completed orders, conversion trends, and sales mix.',
    summary: {
      format: 'number',
      label: 'Orders completed',
      value: 8910,
    },
    growthPercentage: 8.2,
    highlights: [
      'Order volume increased compared with the prior quarter.',
      'Subscriptions contributed the most completed orders.',
      'Weekend order activity showed the strongest improvement.',
    ],
  },
  {
    id: 'report-user-growth',
    title: 'User Growth and Engagement',
    category: 'Users',
    date: '2026-10-22',
    description:
      'An overview of active users, acquisition sources, and engagement patterns.',
    summary: {
      format: 'number',
      label: 'Active users',
      value: 8420,
    },
    growthPercentage: 6.8,
    highlights: [
      'Active users reached a new period high.',
      'Direct traffic remained the leading acquisition source.',
      'Referral engagement improved during the month.',
    ],
  },
  {
    id: 'report-recurring-revenue',
    title: 'Recurring Revenue Analysis',
    category: 'Revenue',
    date: '2026-10-16',
    description:
      'A breakdown of recurring revenue and subscription retention indicators.',
    summary: {
      format: 'currency',
      label: 'Recurring revenue',
      value: 172500,
    },
    growthPercentage: 11.3,
    highlights: [
      'Subscription revenue remained consistent across the period.',
      'Plan upgrades contributed to recurring revenue growth.',
      'Retention indicators were stable.',
    ],
  },
  {
    id: 'report-sales-conversion',
    title: 'Sales Conversion Review',
    category: 'Sales',
    date: '2026-10-09',
    description:
      'A focused review of sales conversion rates and order completion.',
    summary: {
      format: 'percentage',
      label: 'Conversion rate',
      value: 3.7,
    },
    growthPercentage: -1.2,
    highlights: [
      'Conversion softened slightly from the previous period.',
      'Returning customers converted at a higher rate.',
      'The largest drop occurred in the initial checkout step.',
    ],
  },
  {
    id: 'report-audience-overview',
    title: 'Audience Overview',
    category: 'Users',
    date: '2026-10-03',
    description:
      'A summary of audience segments and changes in active user behavior.',
    summary: {
      format: 'number',
      label: 'Returning users',
      value: 5210,
    },
    growthPercentage: 4.5,
    highlights: [
      'Returning users represented a larger share of active users.',
      'Mobile engagement remained consistent.',
      'Search and referral sources both contributed new users.',
    ],
  },
];
