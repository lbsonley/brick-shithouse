import styles from "./sidebar.module.scss";

interface SidebarProps {
  children: React.ReactNode
};

const Sidebar = ({ children }: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      {children}
    </aside>
  );
};

export default Sidebar;
