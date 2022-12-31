import styles from "./button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit";
  variant?: "primary" | "outline";
  disabled?: boolean;
  handleClick?: (event: any) => void;
}

const Button = ({
  children,
  type,
  variant = "primary",
  disabled = false,
  handleClick = () => {},
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
