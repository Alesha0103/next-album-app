"use client"
import React from "react"
import { useRouter, useParams } from "next/navigation";
import classNames from "classnames";
import { checkAndUpdatePagesList, INCREMENT } from "@/helpers/check-and-update-pages-list";

export const PageNavigation = () => {
  const router = useRouter();
  const params = useParams();

  const [ pages, setPages ] = React.useState([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
  const [ leftArrowExist, setLeftArrow ] = React.useState(false);
  const [ leftEllipsisExist, setLeftEllipsis ] = React.useState(false);

  const paramId = params.id;

  // const setPagesList = (decrement?: boolean) => () => {
  //   let newPages = [ ...pages ];

  //   newPages = decrement
  //     ? newPages.map(page => page - INCREMENT)
  //     : newPages.map(page => page + INCREMENT);

  //   router.push(`/photos/${newPages[0]}`);
  // }

  React.useEffect(() => {
    !!pages.includes(1) ? setLeftEllipsis(false) : setLeftEllipsis(true);
    paramId === "1" ? setLeftArrow(false): setLeftArrow(true);

  }, [paramId])

  const onArrowClick = (left?: boolean) => () => {
    const path = left ? `/photos/${Number(paramId) - 1}` : `/photos/${Number(paramId) + 1}`;
    router.push(path);
  };

  const onPageClick = (id: number) => () => {
    router.push(`/photos/${id}`);
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
          // onClick={setPagesList(true)}
        >...</span>
      )}
      {pages.map((page: number, index) => {
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
        // onClick={setPagesList()}
      >...</span>
      <div
        className="page-navigation__right-arrow"
        onClick={onArrowClick()}
      />
    </div>
  )
}
