import styles from "./main.module.scss";

interface MainProps {
  children: React.ReactNode,
  withContentWrapper?: boolean,
}

const Main = ({
  children = null,
  withContentWrapper = false,
}: MainProps) => {
  return (
    <main className={`
      ${styles.main}
      ${withContentWrapper ? styles.contentWrapperNarrow: ""}
    `}>
      {children}
    </main>
  );
};

export default Main;
