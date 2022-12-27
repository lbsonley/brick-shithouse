"use client";

import { useState, KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import styles from "./user-menu.module.scss";
import useEventListener from "../../../app/hooks/use-event-listener";

const UserMenu = () => {
  const currentRoute = usePathname();
  let [isMenuOpen, setIsMenuOpen] = useState(false);

  useEventListener("keyup", (event) => {
    if ((event as KeyboardEvent).key === "Escape") {
      setIsMenuOpen(false);
    }
  });

  const handleUserMenuClick = (newState: boolean) => {
    setIsMenuOpen(newState);
  };

  return (
    <div
      className={
        `${styles.userMenu} ${isMenuOpen ? styles.userMenuIsOpen : ""}`
      }
    >
      <button
        className={styles.userMenuButton}
        onClick={() => handleUserMenuClick(!isMenuOpen)}
      >
        <FaUser />
      </button>

      <div className={styles.userMenuListContainer}>
        <ul className={styles.userMenuList}>
          <li className={styles.userMenuListItem}>
            <Link
              className={
                `${styles.userMenuLink}
                ${currentRoute === "/profile" ? styles.isActive : ""}`
              }
              href="/profile"
              onClick={() => handleUserMenuClick(!isMenuOpen)}
              >
              Profile
            </Link>
          </li>
          <li className={styles.userMenuListItem}>
            <a
              className={styles.userMenuLink}
              href="/api/auth/logout"
              onClick={() => handleUserMenuClick(!isMenuOpen)}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
      <div
        className={styles.userMenuBackground}
        onClick={() => handleUserMenuClick(false)}
      ></div>
    </div>
  );
};

export default UserMenu;
