import { UserProvider } from "@auth0/nextjs-auth0/client";
import Header from "./header/header";
import styles from "./layout.module.scss";

interface DefaultLayoutProps {
  children: React.ReactNode
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <UserProvider>
      <div className={styles.layoutGrid}>
        <Header />
        {children}
      </div>
    </UserProvider>
  );
};
