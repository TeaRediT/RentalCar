"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./Catalog.module.css";
import { fetchCars } from "@/lib/api";
import { carsQueryOptions } from "@/services/carsQueryOptions";
import CarList from "@/components/CarList/CarList";
import CarSearchForm from "@/components/CarSearchForm/CarSearchForm";
import { useState } from "react";
import { activeFilters, defaultFilter } from "@/types/filter";
import { Car } from "@/types/cars";
import Button from "@/components/Button/Button";

const CatalogClient = () => {
  const [activeFilters, setActiveFilters] =
    useState<activeFilters>(defaultFilter);

  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["cars", activeFilters],
      queryFn: ({ pageParam }) => fetchCars({ page: pageParam, activeFilters }),
      ...carsQueryOptions,
      refetchOnMount: false,
    });

  let cars: Car[] = [];

  if (data) {
    cars = data.pages.flatMap((page) => page.cars);
  }

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
          {cars.length > 0 ? (
            <>
              <CarList cars={cars} />
              {hasNextPage && (
                <Button
                  onClick={fetchNextPage}
                  className={css["load-btn"]}
                  type="button"
                >
                  Load more
                </Button>
              )}
            </>
          ) : (
            <h3 className={css["no-found-title"]}>
              No cars found matching your filters.
            </h3>
          )}
        </div>
      </section>
    </main>
  );
};

export default CatalogClient;
