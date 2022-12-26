"use client";

import { usePathname } from "next/navigation";
import { useAuth0 } from "@auth0/auth0-react";
import Link from "next/link";
import styles from "./header.module.scss";

const Header = () => {
  const currentRoute = usePathname();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  console.log(isAuthenticated);

  return (
    <header className={styles.header}>
      <div className={styles.headerBrand}>
        <Link href="/">BSA</Link>
      </div>
      {isAuthenticated ? (
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
            <li>
              <button
                className={styles.logoutButton}
                onClick={() => logout()}
              >Logout</button>
            </li>
          </ul>
        </nav>
      ) : (
        <button
          className={styles.loginButton}
          onClick={() => loginWithRedirect()}
        >
          Login
        </button>
      )}
    </header>
  );
};

export default Header;
