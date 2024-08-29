"use client"
import React from "react"
import { useRouter, useParams, usePathname , redirect } from "next/navigation"
import classNames from "classnames";

import styles from "./arrow.module.scss"

type ArrowProps = {
  rotate?: boolean
}

export const Arrow: React.FC<ArrowProps> = ({ rotate }) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const [ disabled, disableArrow ] = React.useState(false);
  const [ hidden, hideArrow ] = React.useState(false);
  const detailsPage = !!pathname.includes("details");

  React.useEffect(() => {
    detailsPage && rotate ? hideArrow(true) : hideArrow(false); 

    if ( !detailsPage && !rotate && params.id === "1") {
      disableArrow(true);
    }
    if (params.id === "0") {
      redirect("/photos/1");
    } else if (!detailsPage && params.id !== "0" && params.id !== "1") {
      disableArrow(false);
    }
  }, [params.id])

  const onArrowClick = () => {
    const pageId = params.id;
    if (isNaN(Number(pageId)) || detailsPage) {
      router.back();
      return;
    }
    const path = rotate ? `/photos/${Number(pageId) + 1}` : `/photos/${Number(pageId) - 1}`;
    router.push(path);
  }

  return (
    <div
      className={classNames(styles.wrapp, {
        [styles.arrowRotated]: rotate,
        [styles.arrowDisabled]: disabled,
        [styles.arrowHidden]: hidden,
      })}
      onClick={onArrowClick}
    >
      <div className={styles.arrow}/>
      <div className={styles.arrowBody}/>
    </div>
  )
}
