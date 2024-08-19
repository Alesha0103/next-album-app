"use client"
import React from "react"
import { useRouter, useParams } from "next/navigation";
import classNames from "classnames";
import { checkAndUpdatePagesList, INCREMENT } from "@/helpers/check-and-update-pages-list";

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
    <div className="page-navigation">
      {leftArrowExist && (
        <div
          className="page-navigation__left-arrow"
          onClick={onArrowClick(true)}
        />
      )}
      {leftEllipsisExist && (
        <span
          className="page-navigation__page"
          onClick={onEllipsisClick(true)}
        >...</span>
      )}
      {pages?.map((page: number, index) => {
        return (
          <span
            key={page+index}
            className={classNames("page-navigation__page", {
              "page-navigation__current-page": page === Number(paramId),
            })}
            onClick={onPageClick(page)}
          >
            {page}
          </span>
        );
      })}
      <span
        className="page-navigation__page"
        onClick={onEllipsisClick()}
      >...</span>
      <div
        className="page-navigation__right-arrow"
        onClick={onArrowClick()}
      />
    </div>
  )
}
