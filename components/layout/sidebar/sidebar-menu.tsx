import Link from "next/link";
import styles from "./sidebar-menu.module.scss";

interface SidebarMenuProps {
  menuItems?: Array<{
    label: string | null | undefined,
    href: string | null | undefined
  }>
}

const SidebarMenu = ({ menuItems }: SidebarMenuProps) => {
  return (
    <div className={styles.sidebarMenu}>
      <h2 className={styles.sidebarMenuTitle}>Menu</h2>
      <ul>
        {menuItems?.map(({href, label}) => (
          <li
            key={href}
            className={styles.sidebarMenuListItem}
          >
            <Link
              className={styles.sidebarMenuLink}
              href={{ pathname: href }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenu;
