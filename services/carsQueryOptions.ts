import { CarsResponse } from "@/types/cars";

export const carsQueryOptions = {
  initialPageParam: 1,
  getNextPageParam: (lastPage: CarsResponse) => {
    const currentPage = Number(lastPage.page);

    if (currentPage < lastPage.totalPages) {
      return currentPage + 1;
    }

    return undefined;
  },
};
