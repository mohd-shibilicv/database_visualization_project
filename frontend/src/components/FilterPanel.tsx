import React from 'react';
import { FilterPanelProps } from '../types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const handleChange = (value: string, filterName: string) => {
    onFilterChange({ [filterName]: value });
  };

  // Function to filter out empty values and create SelectItem components
  const createSelectItems = (options: string[]) => {
    return options
      .filter(option => option !== null && option !== undefined && option !== '')
      .map(option => (
        <SelectItem key={option} value={option}>
          {option}
        </SelectItem>
      ));
  };

  return (
    <div className="w-full flex justify-center items-center gap-2 my-2">
      <Select onValueChange={(value) => handleChange(value, 'end_year')}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select End Year" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {createSelectItems(filters.end_years || [])}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleChange(value, 'topic')}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Topic" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {createSelectItems(filters.topics || [])}
          </SelectGroup>
        </SelectContent>
      </Select>
      
      {/* Add more Select components for other filters */}
    </div>
  );
};

export default FilterPanel;