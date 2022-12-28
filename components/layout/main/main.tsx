import styles from "./main.module.scss";

interface MainProps {
  children: React.ReactNode,
}

const Main = ({
  children = null,
}: MainProps) => {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
};

export default Main;
