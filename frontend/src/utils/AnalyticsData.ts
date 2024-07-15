import { useMemo } from "react";
import { DataItem } from "../types";

export const AnalyticsData = (data: DataItem[]) => {
  const analyticsData = useMemo(() => {
    const totalInsights = data.length;
    const uniqueTopics = new Set(data.map((item) => item.topic)).size - 1;
    const uniqueSectors = new Set(data.map((item) => item.sector)).size - 1;

    const startYears = data.map((item) => item.start_year).filter(Boolean);
    const endYears = data.map((item) => item.end_year).filter(Boolean);
    const minYear = Math.min(...startYears, ...endYears);
    const maxYear = Math.max(...startYears, ...endYears);
    const timeSpan = `${minYear} - ${maxYear}`;

    return {
      totalInsights,
      uniqueTopics,
      uniqueSectors,
      timeSpan,
    };
  }, [data]);

  return {
    analyticsData,
  };
};
