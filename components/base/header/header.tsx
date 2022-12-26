"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./header.module.scss";

const Header = () => {
  const currentRoute = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.headerBrand}>
        <Link href="/">BSA</Link>
      </div>
      <nav className={styles.headerNav}>
        <ul className={styles.headerNavList}>
          <li className={styles.headerNavListItem}>
            <Link
              href="/exercises"
              className={`
                ${styles.headerNavLink}
                ${currentRoute === "/exercises" ? styles.isActive : ""}
              `}
            >
              Exercises
            </Link>
          </li>
          <li className={styles.headerNavListItem}>
            <span className={styles.headerNavLink}>
              Routines
            </span>
          </li>
          <li className={styles.headerNavListItem}>
            <span className={styles.headerNavLink}>
              Workouts
            </span>
          </li>
          <li className={styles.headerNavListItem}>
            <span className={styles.headerNavLink}>
              Schedule
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
