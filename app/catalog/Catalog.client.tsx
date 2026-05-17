"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./Catalog.module.css";
import { fetchCars } from "@/lib/api";
import { carsQueryOptions } from "@/services/carsQueryOptions";
import CarList from "@/components/CarList/CarList";
import CarSearchForm from "@/components/CarSearchForm/CarSearchForm";
import { useMemo, useState } from "react";
import { activeFilters, defaultFilter } from "@/types/filter";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";

const CatalogClient = () => {
  const [activeFilters, setActiveFilters] =
    useState<activeFilters>(defaultFilter);

  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["cars", activeFilters],
      queryFn: ({ pageParam }) => fetchCars({ page: pageParam, activeFilters }),
      ...carsQueryOptions,
      refetchOnMount: false,
    });

  const cars = useMemo(() => {
    return data ? data.pages.flatMap((page) => page.cars) : [];
  }, [data]);

  const fetchValues = (values: activeFilters) => {
    setActiveFilters(values);
  };

  return (
    <main>
      <h1 className="visually-hidden">Rental Car Catalog</h1>
      <section className={css["search-section"]}>
        <div className="container">
          <h2 className="visually-hidden">Search cars</h2>
          <CarSearchForm handleSubmit={fetchValues} />
        </div>
      </section>
      <section className={css["catalog-section"]}>
        <div className="container">
          <h2 className="visually-hidden">Cars list</h2>
          <>
            {cars.length > 0 && <CarList cars={cars} />}
            {isFetching && <Loader />}
            {!isFetching && hasNextPage && (
              <Button
                onClick={fetchNextPage}
                className={css["load-btn"]}
                type="button"
              >
                Load more
              </Button>
            )}
            {!isFetching && cars.length === 0 && !error && (
              <h3 className={css.notification}>
                No cars found matching your filters.
              </h3>
            )}
            {error && !isFetching && (
              <h3 className={css.notification}>
                Something went wrong while searching cars.
              </h3>
            )}
          </>
        </div>
      </section>
    </main>
  );
};

export default CatalogClient;
