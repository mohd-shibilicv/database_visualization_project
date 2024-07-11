import axios from "axios";
import { API_BASE_URL } from "../constants/apiConstants";
import { DataItem, Filters } from "../types";

export const fetchData = async (
  filters: Partial<Filters> = {}
): Promise<{ data: DataItem[] }> => {
  const response = await axios.get<{ data: DataItem[] }>(
    `${API_BASE_URL}/data`,
    { params: filters }
  );
  return response.data;
};

export const fetchFilters = async (): Promise<Filters> => {
  const response = await axios.get<Filters>(`${API_BASE_URL}/filters`);
  return response.data;
};
