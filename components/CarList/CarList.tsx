import { Car } from "@/types/cars";
import css from "./CarList.module.css";
import Image from "next/image";
import ButtonLink from "../ButtonLink/ButtonLink";

interface CarListProps {
  cars: Car[];
}

const CarList = ({ cars }: CarListProps) => {
  return (
    <>
      <ul className={css.list}>
        {cars.map((car, index) => {
          const mileage =
            car.mileage.toLocaleString("en-US").replace(/,/g, " ") ?? "";

          return (
            <li key={car.id} className={css["list-item"]}>
              <div className={css["img-wrapper"]}>
                <Image
                  className={css.img}
                  src={car.img}
                  alt="car image"
                  fill
                  sizes="276px"
                  priority={index < 4}
                ></Image>
                <svg width={16} height={16} className={css.heart}>
                  <use href="/sprite.svg#icon-heart-default"></use>
                </svg>
              </div>
              <div className={css["car-info"]}>
                <div className={css["car-title"]}>
                  <h3 className={css["car-name"]}>
                    {car.brand} <span>{car.model}</span>
                    {", " + car.year}
                  </h3>
                  <p className={css["car-price"]}>${car.rentalPrice}</p>
                </div>
                <div className={css["car-desc"]}>
                  <ul className={css["rent-info"]}>
                    <li>{car.location.city}</li>
                    <li>{car.location.country}</li>
                    <li>{car.rentalCompany}</li>
                  </ul>
                  <ul className={css["tech-info"]}>
                    <li>{car.type}</li>
                    <li>{mileage} km</li>
                  </ul>
                </div>
              </div>
              <ButtonLink href={`/catalog/${car.id}`}>Read more</ButtonLink>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CarList;
