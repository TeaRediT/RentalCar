import css from "./notification.module.css";
import ButtonLink from "@/components/ButtonLink/ButtonLink";

export default function NotFound() {
  return (
    <main className={css.container}>
      <div className={`container ${css.page}`}>
        <h1 className={css.title} aria-label="Error 404">
          404
        </h1>
        <h2 className={css.subtitle}>Page Not Found</h2>
        <p className={css.description}>
          Sorry, the page you are looking for does not exist, has been removed,
          or is temporarily unavailable.
        </p>
        <ButtonLink replace href="/" className={css.btn}>
          Return to Catalog
        </ButtonLink>
      </div>
    </main>
  );
}
