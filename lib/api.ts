import { BookingBody } from "@/types/booking";
import { Car, CarsResponse } from "@/types/cars";
import { activeFilters, FiltersRes } from "@/types/filter";
import axios from "axios";

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
  if (activeFilters.price !== "") params.append("price", activeFilters.price);
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

export const fetchCarById = async (carId: string): Promise<Car> => {
  const { data } = await axios.get<Car>(`/cars/${carId}`);

  return data;
};

export const createBooking = async (
  carId: string,
  { name, email, comment }: BookingBody,
): Promise<string> => {
  const { data } = await axios.post(`/cars/${carId}/booking-requests`, {
    name,
    email,
    comment,
  });

  return data;
};
