"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <header className={css.header}>
      <div className={`container ${css["header-items"]}`}>
        <Link href={"/"}>
          <svg className={css.logo}>
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
