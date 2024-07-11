import { geoPath, geoOrthographic, geoGraticule } from 'd3';
import { GlobeState, CountryData } from '../types';
import { showTooltip, hideTooltip } from './tooltipHandlers';

export const drawSphere = (globe: d3.Selection<SVGGElement, unknown, null, undefined>, state: GlobeState) => {
    const { rotation, scale, translation } = state;
    const projection = geoOrthographic().rotate(rotation).scale(scale).translate(translation);
    const path = geoPath(projection);

    globe.append('path')
        .datum({ type: 'Sphere' })
        .attr('class', 'sphere')
        .attr('d', path as any)
        .attr('fill', '#111');
};

export const drawGraticule = (globe: d3.Selection<SVGGElement, unknown, null, undefined>, state: GlobeState) => {
    const { rotation, scale, translation } = state;
    const projection = geoOrthographic().rotate(rotation).scale(scale).translate(translation);
    const path = geoPath(projection);
    const graticule = geoGraticule();

    globe.append('path')
        .datum(graticule)
        .attr('class', 'graticule')
        .attr('d', path as any)
        .attr('fill', 'none')
        .attr('stroke', '#eee')
        .attr('stroke-width', 0.5);
};

export const drawCountries = (globe: d3.Selection<SVGGElement, unknown, null, undefined>, state: GlobeState) => {
    const { worldData, rotation, scale, translation } = state;
    if (worldData === 'LOADING' || !worldData) return;

    const projection = geoOrthographic().rotate(rotation).scale(scale).translate(translation);
    const path = geoPath(projection);

    globe.selectAll('path.country')
        .data(worldData.features)
        .join('path')
        .attr('d', path as any)
        .attr('class', 'country')
        .attr('fill', '#fff')
        .attr('stroke', '#ccc')
        .attr('stroke-width', 0.5);
};

export const drawDataPoints = (
    globe: d3.Selection<SVGGElement, unknown, null, undefined>,
    data: CountryData[],
    state: GlobeState
) => {
    const { rotation, scale, translation } = state;
    const projection = geoOrthographic().rotate(rotation).scale(scale).translate(translation);
    const path = geoPath(projection);

    globe.selectAll('circle.data-point')
        .data(data)
        .join('circle')
        .attr('class', 'data-point')
        .attr('transform', d => {
            const centroid = path.centroid(d.feature);
            return `translate(${centroid[0]},${centroid[1]})`;
        })
        .attr('r', d => Math.sqrt(d.insightCount) * 2)
        .attr('fill', d => `rgb(${Math.round(d.avgIntensity * 25)}, 0, ${Math.round(d.avgLikelihood * 25)})`)
        .style('pointer-events', 'all')
        .on('mouseover', (event, d) => showTooltip(event, d))
        .on('mouseout', hideTooltip);
};