import Image from "next/image";
import css from "./home.module.css";
import ButtonLink from "@/components/ButtonLink/ButtonLink";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | RentalCar",
  description:
    "Rent a car quickly and conveniently. Best prices and a large fleet at RentalCar.",
};

const Home = () => {
  return (
    <main>
      <section>
        <div className={`container ${css.hero}`}>
          <Image
            className={css.img}
            src="/home/hero.webp"
            alt="car"
            priority
            fill
            sizes="1440px"
          />
          <h1 className={css.title}>Find your perfect rental car</h1>
          <p className={css.slogan}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <ButtonLink href={"/catalog"} className={css.btn}>
            View Catalog
          </ButtonLink>
        </div>
      </section>
    </main>
  );
};

export default Home;
