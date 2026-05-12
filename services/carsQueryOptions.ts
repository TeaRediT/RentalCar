import { CarsResponse } from "@/types/cars";

export const carsQueryOptions = {
  initialPageParam: 1,
  getNextPageParam: (lastPage: CarsResponse, allPages: CarsResponse[]) => {
    if (lastPage.cars.length === 12) {
      return allPages.length + 1;
    }
    return undefined;
  },
};
