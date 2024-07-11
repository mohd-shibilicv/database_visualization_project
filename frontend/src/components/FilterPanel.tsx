import React from 'react';
import Select, { SingleValue, ActionMeta } from 'react-select';
import { FilterPanelProps, OptionType } from '../types';

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
  const handleChange = (
    selectedOption: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    if (selectedOption && actionMeta.name) {
      onFilterChange({ [actionMeta.name]: selectedOption.value });
    }
  };

  return (
    <div className="filter-panel">
      <Select<OptionType>
        name="end_year"
        options={filters.end_years?.map(year => ({ value: year, label: year }))}
        onChange={handleChange}
        placeholder="Select End Year"
      />
      <Select<OptionType>
        name="topic"
        options={filters.topics?.map(topic => ({ value: topic, label: topic }))}
        onChange={handleChange}
        placeholder="Select Topic"
      />
      {/* Add more Select components for other filters */}
    </div>
  );
};

export default FilterPanel;