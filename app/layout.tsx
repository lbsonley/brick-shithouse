import Header from "../components/base/header/header";
import "../styles/globals.scss";
import styles from "./layout.module.scss";

interface RootLayoutProps {
  children: React.ReactNode
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={styles.layoutGrid}>
        <Header />
        {children}
      </body>
    </html>
  );
};
