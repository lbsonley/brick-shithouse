import classnames from "classnames";
import styles from "./main.module.scss";

interface MainProps {
  children: React.ReactNode,
  isFullWidth: boolean
}

const Main = ({ children, isFullWidth }: MainProps) => {
  const classes = classnames({
    mainFullWidth: isFullWidth,
    mainSidebarWidth: !isFullWidth,
  });

  return (
    <main
      className={
        isFullWidth
          ? styles.mainFullWidth
          : styles.mainSidebarWidth
      }
    >
      {children}
    </main>
  );
};

export default Main;
