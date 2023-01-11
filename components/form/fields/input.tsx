import React, { useState, useEffect, forwardRef } from "react";
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

const Input = forwardRef<HTMLInputElement, InputProps>((
  {
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
  },
  ref,
) => {

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
        ref={ref}
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
});

Input.displayName = "Input";

export default Input;
