import Link from "next/link";
import styles from "./globals.module.scss";

export default function Home() {
  return (
    <div className={styles.homePageWrapp}>
      <h1 className={styles.homePageTitle}>Check out the Album app by clicking the button below</h1>
      <Link href="photos/1">
        <button className={styles.homePageButton}>Album</button>
      </Link>
    </div>
  );
}
