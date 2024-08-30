"use client"
import React from "react";
import styles from "./loader.module.scss";
import classNames from "classnames";
import { LoaderScale } from "@/models/loader-scale";

interface LoaderProps {
  loaderScale?: LoaderScale
}

export const Loader: React.FC<LoaderProps> = ({ loaderScale }) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={classNames(styles.loader, {
        [styles.largeloader]: loaderScale === LoaderScale.LARGE,
        [styles.smallLoader]: loaderScale === LoaderScale.SMALL,
      })}></div>
    </div>
  );
}