"use client"
import React from "react"
import { useRouter } from "next/navigation"
import classNames from "classnames"

type ArrowProps = {
  rotate?: boolean
}

export const Arrow: React.FC<ArrowProps> = ({ rotate }) => {
  const router = useRouter();

  const onArrowClick = () => {
    if (rotate) {
      router.forward();
      return;
    }
    router.back();
  }

  return (
    <div
      className={classNames("arrow", {
        "arrow__rotated": rotate,
        "arrow__disabled": !router.forward
      })}
      onClick={onArrowClick}
    >
      <div className="arrow__arrow"/>
      <div className="arrow__body"/>
    </div>
  )
}
