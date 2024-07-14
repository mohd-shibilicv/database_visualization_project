import { useState, useEffect, useMemo, useCallback } from 'react';
import { DataItem, Filters } from '../../../types';

export const useFilteredData = (data: DataItem[]) => {
  const initialFilters: Filters = {
    endYear: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
  };

  const [filteredData, setFilteredData] = useState<DataItem[]>(data);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);

  const isAnyFilterActive = useMemo(() =>
    Object.values(filters).some(value => value !== ''),
    [filters]
  );

  const getUniqueValues = useCallback((key: keyof DataItem): string[] => {
    return [...new Set(data.map(item => item[key]))].filter(Boolean) as string[];
  }, [data]);

  const endYearOptions = useMemo(() => {
    const years = getUniqueValues('end_year' as keyof DataItem);
    return years.filter(year => {
      const numYear = Number(year);
      return !isNaN(numYear) && numYear >= 2000 && numYear <= 2250;
    }).sort((a, b) => Number(a) - Number(b));
  }, [getUniqueValues]);

  useEffect(() => {
    setIsLoading(true);
    const newFilteredData = data.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        if (key === 'endYear') {
          return item.end_year?.toString() === value;
        }
        return item[key as keyof DataItem]?.toString() === value;
      });
    });
    setFilteredData(newFilteredData);
    setTimeout(() => setIsLoading(false), 500);
  }, [filters, data]);

  const handleFilterChange = useCallback((filterName: keyof Filters) => (value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  return {
    filteredData,
    filters,
    isLoading,
    isAnyFilterActive,
    getUniqueValues,
    endYearOptions,
    handleFilterChange,
    resetFilters,
  };
};