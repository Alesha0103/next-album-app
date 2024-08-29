"use client"
import { useRouter } from "next/navigation";
import styles from "./globals.module.scss"

const NotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  }

  return (
    <div className={styles.notFoundPage}>
      <h2>Page not found</h2>
      <h3>Could not find requested resource</h3>
      <button onClick={handleGoBack}>Go back</button> 
    </div>
  );
}

export default NotFound;