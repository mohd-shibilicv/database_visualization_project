export interface DataItem {
  end_year: string;
  intensity: number;
  sector: string;
  topic: string;
  insight: string;
  url: string;
  region: string;
  start_year: string;
  impact: string;
  added: string;
  published: string;
  country: string;
  relevance: number;
  pestle: string;
  source: string;
  title: string;
  likelihood: number;
  city?: string;
  swot?: string;
}

export interface Filters {
  end_years?: number[];
  topics?: string[];
  sectors?: string[];
  regions?: string[];
  pest?: string[];
  sources?: string[];
  swot?: string[];
  countries?: string[];
  cities?: string[];
}

export interface ChartProps {
  data: DataItem[];
}

export interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
}

export interface OptionType {
  value: string | number;
  label: string | number;
}

