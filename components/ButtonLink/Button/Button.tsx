import css from "./Button.module.css";

interface ButtonProps {
  type: "submit" | "button";
  className?: string;
  children: React.ReactNode;
}

const Button = ({ type, className, children }: ButtonProps) => {
  return (
    <button
      className={`${className} ${css.btn} ${type === "button" ? css["btn-button"] : css["btn-submit"]}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
