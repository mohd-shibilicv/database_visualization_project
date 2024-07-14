import React, { useEffect, useRef, useState } from 'react';
import { select } from 'd3';
import { GlobeState, GlobeProps } from './types';
import { useWorldData } from './hooks/useWorldData';
import { useGlobeSetup } from './hooks/useGlobeSetup';
import { renderMap } from './utils/renderMap';
import { handleDrag, handleZoom } from './utils/interactionHandlers';
import Tooltip from './Tooltip';

const Globe: React.FC<GlobeProps> = ({ data }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<GlobeState>({
        rotation: [0, -20, 0],
        scale: 0,
        translation: [0, 0],
        initialScale: 0,
    });

    const worldData = useWorldData();
    const { width, height } = useGlobeSetup(containerRef, setState);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !worldData || worldData === 'LOADING') return;

        const svg = select(container)
            .selectAll('svg')
            .data([null])
            .join('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background-color', 'transparent');

        renderMap(svg as unknown as d3.Selection<SVGSVGElement, unknown, null, undefined>, { ...state, worldData }, data);

        svg.call(handleDrag(setState) as any);
        svg.call(handleZoom(setState) as any);
    }, [state, data, worldData, width, height]);

    return (
        <>
            <div
                ref={containerRef}
                style={{
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    backgroundColor: 'transparent'
                }}
                className='rounded-[50px] border border-gray-200 dark:border-gray-800'
            />
            <Tooltip />
        </>
    );
};

export default Globe;