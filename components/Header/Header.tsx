"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={`container ${css["header-items"]}`}>
        <Link href={"/"} aria-label="home">
          <svg width={104} height={16}>
            <use href="/sprite.svg#icon-logo"></use>
          </svg>
        </Link>
        <nav className={css.navigation}>
          <ul>
            <li>
              <Link
                className={`${css["nav-link"]} ${pathname === "/" ? css.active : ""}`}
                href={"/"}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`${css["nav-link"]} ${pathname === "/catalog" ? css.active : ""}`}
                href={"/catalog"}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
