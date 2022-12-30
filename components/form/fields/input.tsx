import { useState } from "react";
import styles from "./input.module.scss";

interface InputProps {
  label?: string,
  name: string,
  initialValue?: any
  inputId: string,
  type?: string,
  disabled?: boolean,
  required?: boolean
}

const Input = ({
  label,
  name,
  initialValue = "",
  inputId,
  type = "input",
  disabled = false,
  required = false,
}: InputProps) => {

  const [value, setValue] = useState(initialValue);

  const handleOnChange = (
    { currentTarget } : React.FormEvent<HTMLInputElement>,
  ) => {
    setValue((currentTarget).value);
  };

  return (
    <>
      <label
        className={styles.label}
        htmlFor={inputId}
      >
        {label}
      </label>
      <input
        className={styles.input}
        required={required}
        name={name}
        type={type}
        id={inputId}
        disabled={disabled}
        value={value}
        onChange={handleOnChange}
      />
    </>
  );
};

export default Input;
