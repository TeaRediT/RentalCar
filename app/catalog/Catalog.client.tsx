"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./Catalog.module.css";
import { fetchCars } from "@/lib/api";
import { carsQueryOptions } from "@/services/carsQueryOptions";
import CarList from "@/components/CarList/CarList";
import CarSearchForm from "@/components/CarSearchForm/CarSearchForm";
import { useState } from "react";
import { activeFilters, defaultFilter } from "@/types/filter";

const CatalogClient = () => {
  const [activeFilters, setActiveFilters] =
    useState<activeFilters>(defaultFilter);

  const { data, isLoading, error } = useInfiniteQuery({
    queryKey: ["cars", activeFilters],
    queryFn: () => fetchCars({ page: 1, activeFilters }),
    ...carsQueryOptions,
    refetchOnMount: false,
  });

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  // const cars = [];

  console.log(data);

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
              <button type="button">Load more</button>
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default CatalogClient;
