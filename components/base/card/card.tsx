import Link from "next/link";
import styles from "./card.module.scss";

interface CardProps {
  children: React.ReactNode;
  href: string;
}

const Card = ({
  children,
  href,
}: CardProps) => {
  return (
    <Link href={href}>
      <div className={styles.card}>
        {children}
      </div>
    </Link>
  );
};

export default Card;
