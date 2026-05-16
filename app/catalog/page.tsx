import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchCars, fetchFilters } from "@/lib/api";
import CatalogClient from "./Catalog.client";
import { carsQueryOptions } from "@/services/carsQueryOptions";
import { defaultFilter } from "@/types/filter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catalog | RentalCar",
  description:
    "Browse our catalog of available cars for rent. Convenient filters by brand, price, and mileage.",
};

const Catalog = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    await queryClient.prefetchInfiniteQuery({
      queryKey: ["cars", defaultFilter],
      queryFn: () => fetchCars({ page: 1, activeFilters: defaultFilter }),
      ...carsQueryOptions,
    }),
    await queryClient.prefetchQuery({
      queryKey: ["filters"],
      queryFn: fetchFilters,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
};

export default Catalog;
