import { useEffect, useState } from "react";
import { DataItem } from "../types";
import { fetchData } from "../services/api";
import GlobeContainer from "./GlobeContainer";
import ChartsGroup from "./charts/ChartsGroup";

const Dashboard = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataAndFilters = async () => {
      try {
        const [dataResponse] = await Promise.all([
          fetchData(),
        ]);
        setData(dataResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchDataAndFilters();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="dashboard mt-3">
      <div className="charts-container">
        <ChartsGroup data={data} />
        <GlobeContainer data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
