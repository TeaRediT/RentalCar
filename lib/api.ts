import { CarsResponse } from "@/types/cars";
import { activeFilters } from "@/types/filter";
import axios from "axios";

interface FiltersRes {
  brands: string[];
  price: { min: number; max: number };
}

axios.defaults.baseURL = "https://car-rental-api.goit.study";

export const fetchCars = async ({
  page,
  activeFilters,
}: {
  page: number;
  activeFilters: activeFilters;
}): Promise<CarsResponse> => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("perPage", "12");

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

export const fetchFilters = async (): Promise<FiltersRes> => {
  const { data } = await axios.get<FiltersRes>("/cars/filters");
  return data;
};
