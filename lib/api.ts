import { CarsResponse } from "@/types/cars";
import axios from "axios";

export const fetchCars = async ({
  page,
}: {
  page: number;
}): Promise<CarsResponse> => {
  const { data } = await axios.get<CarsResponse>(
    `https://car-rental-api.goit.global/cars`,
    {
      params: {
        limit: 12,
        page,
      },
    },
  );
  return data;
};
