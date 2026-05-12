"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./Catalog.module.css";
import { fetchCars } from "@/lib/api";
import { carsQueryOptions } from "@/services/carsQueryOptions";
import CarList from "@/components/CarList/CarList";

const CatalogClient = () => {
  const { data, isLoading, error } = useInfiniteQuery({
    queryKey: [
      "cars",
      { brand: "", rentalPrice: "", minMileage: "", maxMileage: "" },
    ],
    queryFn: () => fetchCars({ page: 1 }),
    ...carsQueryOptions,
  });

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  console.log(cars);

  return (
    <main>
      <div className={`container ${css.page}`}>
        <h1 className="visually-hidden">Rental Car Catalog</h1>
        <section>
          <h2 className="visually-hidden">Search cars</h2>
          <form action="">
            <button type="submit">search</button>
          </form>
        </section>
        {cars.length > 0 && (
          <section>
            <h2 className="visually-hidden">Cars list</h2>
            <CarList cars={cars} />
          </section>
        )}
        <button type="button">Load more</button>
      </div>
    </main>
  );
};

export default CatalogClient;
