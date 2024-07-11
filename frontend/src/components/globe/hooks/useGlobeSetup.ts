import { useEffect, useState, RefObject } from 'react';
import { geoOrthographic } from 'd3';
import { GlobeState } from '../types';

const margin = 20;

export const useGlobeSetup = (containerRef: RefObject<HTMLDivElement>, setState: React.Dispatch<React.SetStateAction<GlobeState>>) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const { clientWidth: width, clientHeight: height } = container;
        setDimensions({ width, height });

        const fittedProjection = geoOrthographic().fitExtent(
            [[margin, margin], [width - margin, height - margin]],
            { type: 'Sphere' }
        );
        const initialScale = fittedProjection.scale();
        const initialTranslation = fittedProjection.translate();

        setState((prevState) => ({
            ...prevState,
            initialScale,
            scale: initialScale,
            translation: initialTranslation as [number, number],
        }));
    }, [containerRef, setState]);

    return dimensions;
};