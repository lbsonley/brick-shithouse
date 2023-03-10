import styles from "./form.module.scss";

interface FormProps {
  children: React.ReactNode
  handleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

const Form = ({ children, handleFormSubmit }: FormProps) => {
  return (
    <form
      className={styles.form}
      name="edit-user-profile"
      onSubmit={handleFormSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
