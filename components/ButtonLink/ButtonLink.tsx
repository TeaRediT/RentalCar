import Link from "next/link";
import css from "./ButtonLink.module.css";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
}

const ButtonLink = ({ href, children }: ButtonLinkProps) => {
  return (
    <Link className={css.button} href={href}>
      {children}
    </Link>
  );
};
export default ButtonLink;
