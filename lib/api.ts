import { CarsResponse } from "@/types/cars";
import { activeFilters } from "@/types/filter";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = async ({
  page,
  activeFilters,
}: {
  page: number;
  activeFilters: activeFilters;
}): Promise<CarsResponse> => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("limit", "12");

  if (activeFilters.brand !== "") params.append("brand", activeFilters.brand);
  if (activeFilters.rentalPrice !== "")
    params.append("rentalPrice", activeFilters.rentalPrice);
  if (activeFilters.minMileage !== "")
    params.append("minMileage", activeFilters.minMileage);
  if (activeFilters.maxMileage !== "")
    params.append("maxMileage", activeFilters.maxMileage);

  const { data } = await axios.get<CarsResponse>(`/cars?${params}`);

  return data;
};

export const fetchBrands = async (): Promise<string[]> => {
  const { data } = await axios.get<string[]>("/brands");
  return data;
};
