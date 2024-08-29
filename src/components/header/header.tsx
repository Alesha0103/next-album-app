import React from "react";
import { Arrow } from "../arrow/arrow";

import styles from "./header.module.scss";

export const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <Arrow/>
        <h1>My Album</h1>
        <Arrow rotate/>
      </div>
    </div>
  )
}
