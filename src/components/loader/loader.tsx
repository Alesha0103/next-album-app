"use client"
import React from "react";
import styles from "./loader.module.scss";

export const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className={styles.loader}></div>
    </div>
  );
}