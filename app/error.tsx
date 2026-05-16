"use client";

import ButtonLink from "@/components/ButtonLink/ButtonLink";
import css from "./notification.module.css";

const Error = () => {
  return (
    <main>
      <div className={`container ${css.page}`}>
        <h1 className={css.title}>Oops! Something went wrong</h1>
        <p className={css.description}>
          We encountered an unexpected error while processing your request.
          Please try again.
        </p>
        <ButtonLink replace href="/catalog" className={css.btn}>
          Return to Catalog
        </ButtonLink>
      </div>
    </main>
  );
};

export default Error;
