import Link from "next/link";
import css from "./ButtonLink.module.css";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  replace?: boolean;
}

const ButtonLink = ({
  href,
  children,
  className,
  replace,
}: ButtonLinkProps) => {
  return (
    <Link
      replace={replace}
      className={`${css.button} ${className ? className : ""}`}
      href={href}
    >
      {children}
    </Link>
  );
};
export default ButtonLink;
