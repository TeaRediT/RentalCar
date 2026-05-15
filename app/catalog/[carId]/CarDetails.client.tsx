"use client";

import { fetchCarById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./CarDetails.module.css";
import Image from "next/image";
import Svg from "@/components/Svg/Svg";
import { useId } from "react";

const CarDetailsClient = () => {
  const { carId } = useParams<{ carId: string }>();
  const randomId = useId();

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => fetchCarById(carId),
    refetchOnMount: false,
  });

  console.log(car);

  return (
    <main>
      {car && (
        <article className={css["page-wrapper"]}>
          <section className={css["booking-section"]}>
            <div className="container">
              <div className={css["img-wrapper"]}>
                <Image
                  src={car.img}
                  alt="car image"
                  fill
                  sizes="640px"
                  loading="eager"
                  fetchPriority="high"
                ></Image>
              </div>
              <form>
                <input type="text" />
              </form>
            </div>
          </section>
          <section className={css["car-info-section"]}>
            <div className="container">
              <div className={css["car-base"]}>
                <div className={css["car-title"]}>
                  <h1>
                    {car.brand} {car.model}, {car.year}
                  </h1>
                  <span className={css["car-id"]}>Id: {car.stockNumber}</span>
                </div>
                <div className={css["car-details"]}>
                  <div className={css["car-address"]}>
                    <Svg id="location" />
                    <p>
                      {car.location.country}, {car.location.city}
                    </p>
                  </div>
                  <p className={css["car-mileage"]}>
                    Mileage:{" "}
                    {car.mileage.toLocaleString("en-US").replace(/,/g, " ") ??
                      ""}{" "}
                    km
                  </p>
                </div>
                <strong>${car.rentalPrice}</strong>
                <p className={css["car-desc"]}>{car.description}</p>
              </div>
              <h2 className="visually-hidden">Characteristics & Conditions</h2>
              <ul className={css["specs-list"]}>
                <li>
                  <h3>Rental Conditions:</h3>
                  <ul className={css["rental-info-list"]}>
                    {car.rentalConditions.map((con, index) => (
                      <li
                        key={`${randomId}-"con"-${index}`}
                        className={css["rental-info-item"]}
                      >
                        <Svg id="check-circle" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <h3>Car Specifications:</h3>
                  <ul className={css["char-list"]}>
                    <li className={css["char-list-item"]}>
                      <Svg id="calendar" />
                      <p>Year: {car.year}</p>
                    </li>
                    <li className={css["char-list-item"]}>
                      <Svg id="car" />
                      <p>Type: {car.type}</p>
                    </li>
                    <li className={css["char-list-item"]}>
                      <Svg id="fuel-pump" />
                      <p>Fuel Consumption: {car.fuelConsumption}</p>
                    </li>
                    <li className={css["char-list-item"]}>
                      <Svg id="gear" />
                      <p>Engine Size: {car.engine}</p>
                    </li>
                  </ul>
                </li>
                <li>
                  <h3>Accessories and functionalities:</h3>
                  <ul className={css["funcs-list"]}>
                    {car.features.map((func, index) => (
                      <li key={`${randomId}-"func"-${index}`}>
                        <Svg id="check-circle" />
                        <p>{func}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </section>
        </article>
      )}
    </main>
  );
};

export default CarDetailsClient;
