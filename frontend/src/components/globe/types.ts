import { FeatureCollection, Feature, Geometry, GeoJsonProperties } from 'geojson';
import { DataItem } from '../../types';

export interface GlobeProps {
    data: DataItem[];
}

export interface GlobeState {
    worldData?: FeatureCollection | 'LOADING';
    rotation: [number, number, number];
    scale: number;
    translation: [number, number];
    initialScale: number;
}

export interface CountryData {
    country: string;
    insightCount: number;
    avgIntensity: number;
    avgLikelihood: number;
    avgRelevance: number;
    feature: Feature<Geometry, GeoJsonProperties>;
}
