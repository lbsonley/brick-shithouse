import React, { useState, useEffect } from "react";
import styles from "./input.module.scss";

interface InputProps {
  label?: string;
  name: string;
  initialValue?: any
  inputId: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  hiddenLabel?: boolean;
  parentHandleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  label,
  name,
  initialValue = "",
  inputId,
  placeholder,
  type = "input",
  disabled = false,
  required = false,
  hiddenLabel = false,
  parentHandleChange = () => {},
}: InputProps) => {

  const [value, setValue] = useState(initialValue);

  useEffect(() => { setValue(initialValue); }, [initialValue]);

  const handleOnChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = event;
    setValue((currentTarget).value);
    parentHandleChange(event);
  };

  return (
    <>
      <label
        className={`
          ${styles.label}
          ${hiddenLabel ? styles.visuallyHidden : ""}
        `}
        htmlFor={inputId}
      >
        {label}
      </label>
      <input
        className={styles.input}
        required={required}
        name={name}
        placeholder={placeholder}
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
