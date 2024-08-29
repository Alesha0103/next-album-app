"use client"
import React from "react"
import { useRouter, useParams } from "next/navigation";
import classNames from "classnames";
import { checkAndUpdatePagesList, INCREMENT } from "@/helpers/check-and-update-pages-list";

import styles from "./page-navigation.module.scss";

export const PageNavigation = () => {
  const router = useRouter();
  const params = useParams();

  const [ pages, setPages ] = React.useState<number[]>([]);
  const [ leftArrowExist, setLeftArrow ] = React.useState(false);
  const [ leftEllipsisExist, setLeftEllipsis ] = React.useState(false);

  const paramId = params.id;

  React.useEffect(() => {
    let updatedPages: number[] = checkAndUpdatePagesList(pages, Number(paramId));
    
    if (!updatedPages.every(page => pages.includes(page))) {
      setPages(updatedPages);
    }

    Number(paramId) < 10 ? setLeftEllipsis(false) : setLeftEllipsis(true);
    paramId === "1" ? setLeftArrow(false) : setLeftArrow(true);

  }, [paramId])

  const onArrowClick = (left?: boolean) => () => {
    const path = left ? `/photos/${Number(paramId) - 1}` : `/photos/${Number(paramId) + 1}`;
    router.push(path);
  };

  const onPageClick = (id: number) => () => {
    router.push(`/photos/${id}`);
  }

  const onEllipsisClick = (decrement?: boolean) => () => {
    decrement
      ? router.push(`/photos/${Number(pages[0]) - INCREMENT}`)
      : router.push(`/photos/${Number(pages[pages.length-1]) + 1}`)
  }

  return (
    <div className={styles.pageNavigation}>
      {leftArrowExist && (
        <div
          className={styles.leftArrow}
          onClick={onArrowClick(true)}
        />
      )}
      {leftEllipsisExist && (
        <span
          className={styles.pageIndicator}
          onClick={onEllipsisClick(true)}
        >...</span>
      )}
      {pages?.map((page: number, index) => {
        return (
          <span
            key={page+index}
            className={classNames(styles.pageIndicator, {
              [styles.currentPage]: page === Number(paramId),
            })}
            onClick={onPageClick(page)}
          >
            {page}
          </span>
        );
      })}
      <span
        className={styles.pageIndicator}
        onClick={onEllipsisClick()}
      >...</span>
      <div
        className={styles.rightArrow}
        onClick={onArrowClick()}
      />
    </div>
  )
}
