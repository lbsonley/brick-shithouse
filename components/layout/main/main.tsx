import classnames from "classnames";
import styles from "./main.module.scss";

interface MainProps {
  children: React.ReactNode,
  isFullWidth: boolean
}

const Main = ({
  children = null,
  isFullWidth = true,
}: MainProps) => {
  const classes = classnames({
    [styles.mainFullWidth]: isFullWidth,
    [styles.mainSidebarWidth]: !isFullWidth,
  });

  return (
    <main className={classes}>
      {children}
    </main>
  );
};

export default Main;
