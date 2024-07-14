import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ScatterChart, Scatter, PieChart, Pie, Cell } from 'recharts';
import { CustomTooltip, CustomYearTooltip } from './CustomTooltips';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

export const IntensityChart: React.FC<{ data: any[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis type='number' />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="intensity" name="Intensity" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

export const LikelihoodVsRelevanceChart: React.FC<{ data: any[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <ScatterChart>
      <CartesianGrid />
      <XAxis type="number" dataKey="likelihood" name="Likelihood" domain={[0, 5]} />
      <YAxis type="number" dataKey="relevance" name="Relevance" domain={[0, 7]} />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
      <Legend />
      <Scatter name="Topics" data={data} fill="#8884d8" />
    </ScatterChart>
  </ResponsiveContainer>
);

export const SectorDistributionChart: React.FC<{ data: any[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export const TimelineChart: React.FC<{ data: any[] }> = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <ScatterChart>
      <CartesianGrid />
      <XAxis type="number" dataKey="start" name="Start Year" domain={[2000, 2050]} />
      <YAxis type="number" dataKey="end" name="End Year" domain={[2000, 2250]} />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomYearTooltip />} />
      <Legend />
      <Scatter name="Timeline" data={data} fill="#8884d8" />
    </ScatterChart>
  </ResponsiveContainer>
);