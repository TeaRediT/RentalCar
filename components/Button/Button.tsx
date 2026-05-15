import css from "./Button.module.css";

interface ButtonProps {
  type: "submit" | "button";
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ type, className, children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={type === "button" ? onClick : undefined}
      className={`${className} ${css.btn} ${type === "button" ? css["btn-button"] : css["btn-submit"]}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
