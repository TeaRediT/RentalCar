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
import Button from "@/components/ButtonLink/Button/Button";

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

  console.log(data);

  let cars: Car[] = [];

  if (data) {
    cars = data.pages.flatMap((page) => page.cars);
  }

  const fetchValues = (values: activeFilters) => {
    setActiveFilters(values);
  };

  return (
    <main>
      <div className={`container ${css.page}`}>
        <h1 className="visually-hidden">Rental Car Catalog</h1>
        <section className={css["search-section"]}>
          <h2 className="visually-hidden">Search cars</h2>
          <CarSearchForm handleSubmit={fetchValues} />
        </section>
        <section className={css["catalog-section"]}>
          {cars.length > 0 && (
            <>
              <h2 className="visually-hidden">Cars list</h2>
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
          )}
        </section>
      </div>
    </main>
  );
};

export default CatalogClient;
