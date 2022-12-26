import styles from "./layout.module.scss";

interface RootTemplateProps {
  children: React.ReactNode
};

const RootTemplate = ({ children }: RootTemplateProps) => {
  return (
    <div className={styles.templateGrid}>
      {children}
    </div>
  );
};

export default RootTemplate;
