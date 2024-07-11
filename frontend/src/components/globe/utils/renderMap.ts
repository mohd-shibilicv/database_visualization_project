import { Selection } from 'd3';
import { GlobeState } from '../types';
import { drawSphere, drawGraticule, drawCountries, drawDataPoints } from './drawingFunctions';
import { processData } from './dataProcessing';
import { DataItem } from '../../../types';

export const renderMap = (
    selection: Selection<SVGSVGElement, unknown, null, undefined>,
    state: GlobeState,
    data: DataItem[]
) => {
    const { worldData } = state;
    if (worldData === 'LOADING' || !worldData) return;

    selection.selectAll('*').remove();
    const globe = selection.append('g');

    drawSphere(globe, state);
    drawGraticule(globe, state);
    drawCountries(globe, state);

    const processedData = processData(data, worldData);
    drawDataPoints(globe, processedData, state);
};