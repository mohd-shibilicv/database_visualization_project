import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import { CountryData } from '../types';
import { DataItem } from '../../../types';

export const processData = (data: DataItem[], worldData: FeatureCollection): CountryData[] => {
    const countryDataMap = data.reduce((acc, item) => {
        if (!acc.has(item.country)) {
            acc.set(item.country, {
                country: item.country,
                insightCount: 1,
                totalIntensity: item.intensity,
                totalLikelihood: item.likelihood,
                totalRelevance: item.relevance,
            });
        } else {
            const countryData = acc.get(item.country)!;
            countryData.insightCount++;
            countryData.totalIntensity += item.intensity;
            countryData.totalLikelihood += item.likelihood;
            countryData.totalRelevance += item.relevance;
        }
        return acc;
    }, new Map<string, {
        country: string;
        insightCount: number;
        totalIntensity: number;
        totalLikelihood: number;
        totalRelevance: number;
    }>());

    return Array.from(countryDataMap.values())
        .map(d => {
            const country = worldData.features.find(f => isFeature(f) && f.properties && f.properties.name === d.country);
            if (country && isFeature(country)) {
                return {
                    country: d.country,
                    insightCount: d.insightCount,
                    avgIntensity: d.totalIntensity / d.insightCount,
                    avgLikelihood: d.totalLikelihood / d.insightCount,
                    avgRelevance: d.totalRelevance / d.insightCount,
                    feature: country,
                };
            }
            return null;
        })
        .filter((d): d is CountryData => d !== null);
};

function isFeature(object: any): object is Feature<Geometry, GeoJsonProperties> {
    return object && typeof object === 'object' && 'properties' in object;
}