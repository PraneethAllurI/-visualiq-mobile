import { describe, expect, it } from '@jest/globals';

import { REPORTS } from '@/data/reports';
import {
  filterReports,
  getReportSummaryStats,
} from '@/services/reportService';

describe('reportService', () => {
  it('searches report titles without case sensitivity or surrounding whitespace', () => {
    expect(filterReports(REPORTS, '  revenue  ', 'All').map((report) => report.id))
      .toEqual(['report-revenue-october', 'report-recurring-revenue']);
    expect(filterReports(REPORTS, 'unmatched-title', 'All')).toHaveLength(0);
  });

  it('filters categories and combines category and title search', () => {
    expect(
      filterReports(REPORTS, '', 'Sales').map((report) => report.category),
    ).toEqual(['Sales', 'Sales']);
    expect(
      filterReports(REPORTS, 'sales', 'Revenue').map((report) => report.id),
    ).toEqual([]);
    expect(
      filterReports(REPORTS, 'sales', 'Sales').map((report) => report.id),
    ).toEqual(['report-sales-quarterly', 'report-sales-conversion']);
  });

  it('returns summary counts for available reports', () => {
    expect(getReportSummaryStats()).toEqual({
      categoryCount: 3,
      positiveTrendCount: 5,
      reportCount: 6,
    });
    expect(getReportSummaryStats([])).toEqual({
      categoryCount: 0,
      positiveTrendCount: 0,
      reportCount: 0,
    });
  });
});
