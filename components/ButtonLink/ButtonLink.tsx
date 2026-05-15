import Link from "next/link";
import css from "./ButtonLink.module.css";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ButtonLink = ({ href, children, className }: ButtonLinkProps) => {
  return (
    <Link className={`${css.button} ${className ? className : ""}`} href={href}>
      {children}
    </Link>
  );
};
export default ButtonLink;
