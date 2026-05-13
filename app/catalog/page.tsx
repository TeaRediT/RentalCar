import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchBrands, fetchCars } from "@/lib/api";
import CatalogClient from "./Catalog.client";
import { carsQueryOptions } from "@/services/carsQueryOptions";

const defaultFilter = {
  brand: "",
  rentalPrice: "",
  minMileage: "",
  maxMileage: "",
};

const Catalog = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["cars", defaultFilter],
      queryFn: () => fetchCars({ page: 1 }),
      ...carsQueryOptions,
    }),
    await queryClient.prefetchQuery({
      queryKey: ["brands"],
      queryFn: fetchBrands,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
};

export default Catalog;
