import { useMemo } from 'react';
import { DataItem } from '../../../types';

export const useChartData = (filteredData: DataItem[]) => {
  const intensityData = useMemo(() => {
    const topicIntensities = filteredData.reduce((acc, item) => {
      const key = item.topic || "N/A";
      acc[key] = (acc[key] || 0) + item.intensity;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(topicIntensities)
      .map(([name, intensity]) => ({ name, intensity }))
      .sort((a, b) => b.intensity - a.intensity)
      .slice(0, 10);
  }, [filteredData]);

  const likelihoodVsRelevanceData = useMemo(() =>
    filteredData.map(item => ({
      name: item.topic || item.title.slice(0, 20),
      likelihood: item.likelihood,
      relevance: item.relevance,
      topic: item.topic
    })),
    [filteredData]
  );

  const sectorDistributionData = useMemo(() => {
    const sectorCounts = filteredData.reduce((acc, item) => {
      const key = item.sector || "N/A";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(sectorCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 7);
  }, [filteredData]);

  const timelineData = useMemo(() =>
    filteredData
      .filter(item => item.start_year && item.end_year &&
        item.start_year >= 2000 && item.start_year <= 2050 &&
        item.end_year >= 2000 && item.end_year <= 2250)
      .map(item => ({
        name: item.topic || item.title.slice(0, 20),
        start: item.start_year,
        end: item.end_year
      })),
    [filteredData]
  );

  return {
    intensityData,
    likelihoodVsRelevanceData,
    sectorDistributionData,
    timelineData,
  };
};