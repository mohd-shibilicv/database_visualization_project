import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { X } from 'lucide-react';
import { FilterSelect } from './FilterSelect';
import { IntensityChart, LikelihoodVsRelevanceChart, SectorDistributionChart, TimelineChart } from './ChartComponents';
import { LoadingSpinner } from './LoadingSpinner';
import { useFilteredData } from './hooks/useFilteredData';
import { useChartData } from './hooks/useChartData';
import { DataItem } from '../../types';

const ChartsGroup: React.FC<{ data: DataItem[] }> = ({ data }) => {
  const {
    filteredData,
    filters,
    isLoading,
    isAnyFilterActive,
    getUniqueValues,
    endYearOptions,
    handleFilterChange,
    resetFilters,
  } = useFilteredData(data);

  const {
    intensityData,
    likelihoodVsRelevanceData,
    sectorDistributionData,
    timelineData,
  } = useChartData(filteredData);

  const renderChart = (title: string, ChartComponent: React.FC<{ data: any[] }>, chartData: any[]) => (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ChartComponent data={chartData} />
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="">
      <motion.div
        className="grid grid-cols-4 gap-4 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {(Object.keys(filters) as Array<keyof typeof filters>).map((key) => (
          <FilterSelect
            key={key}
            label={key}
            value={filters[key] ? filters[key] : ""}
            options={key === 'endYear' ? endYearOptions : getUniqueValues(key as keyof DataItem)}
            onChange={handleFilterChange(key)}
          />
        ))}
        {isAnyFilterActive && (
          <Button onClick={resetFilters} className="flex items-center justify-center col-span-4 bg-transparent text-black dark:text-white hover:bg-black-100">
            Reset Filters &nbsp;&nbsp;&nbsp;<X size={18} />
          </Button>
        )}
      </motion.div>

      <motion.div
        className="grid grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {renderChart("Top 10 Topics by Intensity", IntensityChart, intensityData)}
        {renderChart("Likelihood vs Relevance", LikelihoodVsRelevanceChart, likelihoodVsRelevanceData)}
        {renderChart("Sector Distribution", SectorDistributionChart, sectorDistributionData)}
        {renderChart("Timeline", TimelineChart, timelineData)}
      </motion.div>
    </div>
  );
};

export default ChartsGroup;