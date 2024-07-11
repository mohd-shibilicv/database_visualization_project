import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { DataItem } from '../../types';
import { processData } from '../../services/dataManipulation';

interface IntensityChartProps {
  data: DataItem[];
}

const IntensityChart: React.FC<IntensityChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (data.length === 0 || !svgRef.current) return;

    const processedData = processData(data);
    const intensityData = Object.entries(processedData.intensityOverTime).map(([year, intensities]) => ({
      year: parseInt(year),
      avgIntensity: d3.mean(intensities) || 0
    }))
    .filter(d => d.avgIntensity > 0)
    .filter(d => !!d.year)

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 1000 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .domain(intensityData.map(d => d.year.toString()))
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(intensityData, d => d.avgIntensity) || 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d => d.toString()));

    svg.append('g')
      .call(d3.axisLeft(y));

    svg.selectAll('rect')
      .data(intensityData)
      .enter()
      .append('rect')
      .attr('x', d => x(d.year.toString()) || 0)
      .attr('y', d => y(d.avgIntensity))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.avgIntensity))
      .attr('fill', 'steelblue');

    // Add labels
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + margin.bottom)
      .attr('text-anchor', 'middle')
      .text('Year');

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Average Intensity');

  }, [data]);

  return <svg ref={svgRef}></svg>;
}

export default IntensityChart;