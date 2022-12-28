/* eslint-disable @next/next/no-html-link-for-pages */

"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import UserMenu from "./user-menu";
import styles from "./header.module.scss";

const Header = () => {
  const currentRoute = usePathname();
  const { user, isLoading } = useUser();

  return (
    <header className={styles.header}>
      <div className={styles.headerBrand}>
        <Link href="/">BSA</Link>
      </div>
      {!isLoading && (
        <nav className={styles.headerNav}>
          <ul className={styles.headerNavList}>
          {user ? (
            <>
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
              <li className={styles.headerNavListItem}>
                <UserMenu
                  user={user}
                />
              </li>
            </>
          ) : (
            <li>
              <a
                className={styles.headerNavLink}
                href="/api/auth/login"
              >
                Login
              </a>
            </li>
          )}
          </ul>
        </nav>
      )}
      <div className={styles.headerBackdrop}></div>
    </header>
  );
};

export default Header;
