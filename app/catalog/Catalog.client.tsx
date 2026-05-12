"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./Catalog.module.css";
import { fetchCars } from "@/lib/api";
import { carsQueryOptions } from "@/services/carsQueryOptions";

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

  return (
    <main>
      <div className="container">
        <form action="">
          <button type="submit">search</button>
        </form>
        <ul className={css["car-list"]}>
          {cars.map((car) => (
            <li key={car.id}>
              <p>{car.description}</p>
            </li>
          ))}
        </ul>
        <button type="button">Load more</button>
      </div>
    </main>
  );
};

export default CatalogClient;
