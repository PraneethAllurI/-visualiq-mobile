import { REPORTS } from '@/data/reports';
import type {
  Report,
  ReportCategoryFilter,
  ReportSummaryStats,
} from '@/types/report.types';

export function filterReports(
  reports: readonly Report[],
  searchQuery: string,
  category: ReportCategoryFilter,
): Report[] {
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase();

  return reports.filter((report) => {
    const matchesCategory = category === 'All' || report.category === category;
    const matchesTitle = report.title
      .toLocaleLowerCase()
      .includes(normalizedQuery);

    return matchesCategory && matchesTitle;
  });
}

export function getReportSummaryStats(
  reports: readonly Report[] = REPORTS,
): ReportSummaryStats {
  return {
    categoryCount: new Set(reports.map((report) => report.category)).size,
    positiveTrendCount: reports.filter(
      (report) => report.growthPercentage > 0,
    ).length,
    reportCount: reports.length,
  };
}
