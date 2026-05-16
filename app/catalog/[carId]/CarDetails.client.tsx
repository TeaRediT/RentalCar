"use client";

import { fetchCarById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./CarDetails.module.css";
import Image from "next/image";
import Svg from "@/components/Svg/Svg";
import { useId } from "react";
import CarRentForm from "@/components/CarRentForm/CarRentForm";

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
        <article className={`${css["page-wrapper"]} container`}>
          <section className={css["booking-section"]}>
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
            <CarRentForm carId={car.id}></CarRentForm>
          </section>
          <section className={css["car-info-section"]}>
            <div className={css["car-base"]}>
              <div className={css["car-title"]}>
                <h1 className={css["car-name"]}>
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
                  {car.mileage.toLocaleString("en-US").replace(/,/g, " ") ?? ""}{" "}
                  km
                </p>
              </div>
              <strong className={css.price}>${car.rentalPrice}</strong>
              <p className={css["car-desc"]}>{car.description}</p>
            </div>
            <h2 className="visually-hidden">Characteristics & Conditions</h2>
            <ul className={css["tech-list"]}>
              <li>
                <h3 className={css["specs-title"]}>Rental Conditions:</h3>
                <ul className={css["specs-list"]}>
                  {car.rentalConditions.map((con, index) => (
                    <li
                      key={`${randomId}-"con"-${index}`}
                      className={css["specs-item"]}
                    >
                      <Svg id="check-circle" />
                      {con}
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <h3 className={css["specs-title"]}>Car Specifications:</h3>
                <ul className={css["specs-list"]}>
                  <li className={css["specs-item"]}>
                    <Svg id="calendar" />
                    <p>Year: {car.year}</p>
                  </li>
                  <li className={css["specs-item"]}>
                    <Svg id="car" />
                    <p>Type: {car.type}</p>
                  </li>
                  <li className={css["specs-item"]}>
                    <Svg id="fuel-pump" />
                    <p>Fuel Consumption: {car.fuelConsumption}</p>
                  </li>
                  <li className={css["specs-item"]}>
                    <Svg id="gear" />
                    <p>Engine Size: {car.engine}</p>
                  </li>
                </ul>
              </li>
              <li>
                <h3 className={css["specs-title"]}>
                  Accessories and functionalities:
                </h3>
                <ul className={css["specs-list"]}>
                  {car.features.map((func, index) => (
                    <li
                      key={`${randomId}-"func"-${index}`}
                      className={css["specs-item"]}
                    >
                      <Svg id="check-circle" />
                      <p>{func}</p>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </section>
        </article>
      )}
    </main>
  );
};

export default CarDetailsClient;
