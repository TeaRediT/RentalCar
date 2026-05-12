import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchCars } from "@/lib/api";
import CatalogClient from "./Catalog.client";
import { Car } from "@/types/cars";
import { carsQueryOptions } from "@/services/carsQueryOptions";

const defaultFilter = {
  brand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
};

const Catalog = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["cars", defaultFilter],
    queryFn: () => fetchCars({ page: 1 }),
    ...carsQueryOptions,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
};

export default Catalog;
