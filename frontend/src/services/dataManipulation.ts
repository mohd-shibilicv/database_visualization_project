import { DataItem } from '../types';

export function processData(data: DataItem[]) {
  return {
    intensityOverTime: getIntensityOverTime(data),
    impactOverTime: getImpactOverTime(data),
    insightsByRegion: getInsightsByRegion(data),
    insightsByCountry: getInsightsByCountry(data),
    insightsBySector: getInsightsBySector(data),
    popularTopics: getPopularTopics(data),
    relevanceVsLikelihood: getRelevanceVsLikelihood(data),
    highImpactInsights: getHighImpactInsights(data),
    pestleCategories: getPestleCategories(data),
    swotCategories: getSwotCategories(data),
  };
}

function getIntensityOverTime(data: DataItem[]) {
  return data.reduce((acc, item) => {
    const year = new Date(item.published).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(item.intensity);
    return acc;
  }, {} as Record<number, number[]>);
}

function getImpactOverTime(data: DataItem[]) {
  return data.reduce((acc, item) => {
    if (item.start_year && item.end_year) {
      for (let year = Number(item.start_year); year <= Number(item.end_year); year++) {
        if (!acc[year]) acc[year] = 0;
        acc[year]++;
      }
    }
    return acc;
  }, {} as Record<number, number>);
}

function getInsightsByRegion(data: DataItem[]) {
  return data.reduce((acc, item) => {
    if (item.region) {
      if (!acc[item.region]) acc[item.region] = 0;
      acc[item.region]++;
    }
    return acc;
  }, {} as Record<string, number>);
}

function getInsightsByCountry(data: DataItem[]) {
  return data.reduce((acc, item) => {
    if (item.country) {
      if (!acc[item.country]) acc[item.country] = [];
      acc[item.country].push(item);
    }
    return acc;
  }, {} as Record<string, DataItem[]>);
}

function getInsightsBySector(data: DataItem[]) {
  return data.reduce((acc, item) => {
    if (item.sector) {
      if (!acc[item.sector]) acc[item.sector] = 0;
      acc[item.sector]++;
    }
    return acc;
  }, {} as Record<string, number>);
}

function getPopularTopics(data: DataItem[]) {
  const topicsBySector = data.reduce((acc, item) => {
    if (item.sector && item.topic) {
      if (!acc[item.sector]) acc[item.sector] = {};
      if (!acc[item.sector][item.topic]) acc[item.sector][item.topic] = 0;
      acc[item.sector][item.topic]++;
    }
    return acc;
  }, {} as Record<string, Record<string, number>>);

  return Object.entries(topicsBySector).reduce((acc, [sector, topics]) => {
    acc[sector] = Object.entries(topics)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([topic]) => topic);
    return acc;
  }, {} as Record<string, string[]>);
}

function getRelevanceVsLikelihood(data: DataItem[]) {
  return data.map(item => ({
    relevance: item.relevance,
    likelihood: item.likelihood,
    title: item.title,
  }));
}

function getHighImpactInsights(data: DataItem[]) {
  return data.filter(item => item.relevance > 3 && item.likelihood > 3);
}

function getPestleCategories(data: DataItem[]) {
  return data.reduce((acc, item) => {
    if (item.pestle) {
      if (!acc[item.pestle]) acc[item.pestle] = 0;
      acc[item.pestle]++;
    }
    return acc;
  }, {} as Record<string, number>);
}

function getSwotCategories(data: DataItem[]) {
  // Assuming SWOT information is available in the data
  // You might need to adjust this based on how SWOT data is actually stored
  return data.reduce((acc, item) => {
    if (item.swot) {
      if (!acc[item.swot]) acc[item.swot] = 0;
      acc[item.swot]++;
    }
    return acc;
  }, {} as Record<string, number>);
}