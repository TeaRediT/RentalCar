import Image from "next/image";
import css from "./home.module.css";

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
        <button>View Catalog</button>
      </div>
    </main>
  );
};

export default Home;
