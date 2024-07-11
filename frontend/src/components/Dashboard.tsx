import { useEffect, useState } from "react";
import { DataItem, Filters } from "../types";
import FilterPanel from "./FilterPanel";
import IntensityChart from "./charts/IntensityChart";
import LikelihoodChart from "./charts/LikelihoodChart";
import RelevanceChart from "./charts/RelevanceChart";
import YearChart from "./charts/YearChart";
import CountryChart from "./charts/CountryChart";
import TopicsChart from "./charts/TopicsChart";
import { fetchData, fetchFilters } from "../services/api";

const Dashboard = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataAndFilters = async () => {
      try {
        const [dataResponse, filtersResponse] = await Promise.all([
          fetchData(),
          fetchFilters()
        ]);
        setData(dataResponse.data);
        setFilters(filtersResponse);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchDataAndFilters();
  }, []);

  const handleFilterChange = async (newFilters: Partial<Filters>) => {
    setLoading(true);
    try {
      const response = await fetchData(newFilters);
      setData(response.data);
    } catch (err) {
      setError('Failed to apply filters. Please try again.');
    }
    setLoading(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard">
      <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
      <div className="charts-container">
        <IntensityChart data={data} />
        <LikelihoodChart data={data} />
        <RelevanceChart data={data} />
        <YearChart data={data} />
        <CountryChart data={data} />
        <TopicsChart data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
