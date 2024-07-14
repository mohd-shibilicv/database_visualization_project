export interface DataItem {
  end_year: number;
  intensity: number;
  sector: string;
  topic: string;
  insight: string;
  url: string;
  region: string;
  start_year: number;
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
  endYear?: string;
  topic?: string;
  sector?: string;
  region?: string;
  pestle?: string;
  source?: string;
  swot?: string;
  country?: string;
}

export interface ChartProps {
  data: DataItem[];
}

export interface FilterPanelProps {
  filters: Filters;
  onFilterChange: (newFilters: Partial<Filters>) => void;
}
