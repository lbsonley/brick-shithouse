import styles from "./button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit";
  variant?: "primary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  handleClick?: (event: any) => void;
}

const Button = ({
  children,
  type,
  variant = "primary",
  size = "medium",
  disabled = false,
  handleClick = () => {},
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
