import styles from "./input.module.scss";

interface SelectProps {
  options: { label: string, value: string }[];
  label: string;
  inputId: string;
  name: string;
  initialValue: string;
};

const Select = ({
  options,
  label,
  name,
  inputId,
  initialValue,
}: SelectProps) => {
  return (
    <>
      <label
        className={styles.label}
        htmlFor={inputId}
      >
        {label}
      </label>
      <select
        className={styles.select}
        name={name}
        id={inputId}
        defaultValue={initialValue || ""}
      >
        <option value="">-- Select a Weight Unit --</option>
        {options.map(({ label, value }) => (
          <option
            key={value}
            value={value}
          >
            {label}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
