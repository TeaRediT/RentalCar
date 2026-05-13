import { CarsResponse } from "@/types/cars";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = async ({
  page,
}: {
  page: number;
}): Promise<CarsResponse> => {
  const { data } = await axios.get<CarsResponse>(`/cars`, {
    params: {
      limit: 12,
      page,
    },
  });
  return data;
};

export const fetchBrands = async (): Promise<string[]> => {
  const { data } = await axios.get<string[]>("/brands");
  return data;
};
