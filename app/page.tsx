import Image from "next/image";
import css from "./home.module.css";
import ButtonLink from "@/components/ButtonLink/ButtonLink";

const Home = () => {
  return (
    <main>
      <div className={`container ${css.hero}`}>
        <Image
          className={css.img}
          src="/home/hero.webp"
          alt="car"
          priority
          fill
        />
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.slogan}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <ButtonLink href={"/catalog"}>View Catalog</ButtonLink>
      </div>
    </main>
  );
};

export default Home;
