import { useState, useEffect } from 'react';
import { feature } from 'topojson-client';
import { FeatureCollection, Geometry } from 'geojson';

const worldAtlasURL = 'https://unpkg.com/world-atlas@2/countries-110m.json';

export const useWorldData = () => {
    const [worldData, setWorldData] = useState<FeatureCollection | 'LOADING' | undefined>(undefined);

    useEffect(() => {
        if (worldData === undefined) {
            setWorldData('LOADING');
            fetch(worldAtlasURL)
                .then((response) => response.json())
                .then((topoJSONData) => {
                    const data = feature(
                        topoJSONData,
                        topoJSONData.objects.countries
                    ) as unknown as FeatureCollection<Geometry>;
                    setWorldData(data);
                });
        }
    }, [worldData]);

    return worldData;
};