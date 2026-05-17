import { Car } from "@/types/cars";
import css from "./CarList.module.css";
import Image from "next/image";
import Svg from "../Svg/Svg";
import { useFavoritesStore } from "@/lib/favoritesStore";

interface CarListProps {
  cars: Car[];
}

const CarList = ({ cars }: CarListProps) => {
  const { favorites, toggleFavorite } = useFavoritesStore();

  return (
    <>
      <ul className={css.list}>
        {cars.map((car, index) => {
          const mileage =
            car.mileage.toLocaleString("en-US").replace(/,/g, " ") ?? "";
          const isFavorite = favorites.includes(car.id);
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
                <button
                  aria-label="add to favorites"
                  className={css["heart-btn"]}
                  onClick={() => toggleFavorite(car.id)}
                >
                  <Svg
                    className={`${isFavorite && css["heart-active"]}`}
                    id={`heart-${isFavorite ? "active" : "default"}`}
                  />
                </button>
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
              <a
                className={css.btn}
                href={`/catalog/${car.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CarList;
