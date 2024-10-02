"use client"
import React from "react";
import Image, { StaticImageData } from "next/image";
import { Loader } from "../loader/loader";
import NoImage from "../../../public/no-img.png";
import { LoaderScale } from "@/models/loader-scale";

interface ImgProps {
  alt: string,
  url: string,
  width?: number,
  height?: number,
}

const DEFAULT_WIDTH = 350;
const DEFAULT_HEIGHT = 350;

export const ImgWrapp: React.FC<ImgProps> = ({ alt, url, width=DEFAULT_WIDTH, height=DEFAULT_HEIGHT }) => {
  const [ loading, setLoading ] = React.useState(true);
  const [ imgUrl, setImgUrl ] = React.useState<string | StaticImageData>(url);

  const calculateLoaderSize = (): LoaderScale => {
    if (width >= DEFAULT_WIDTH) {
      return LoaderScale.LARGE;
    }
    return LoaderScale.MEDIUM;
  }

  const onLoad = () => {
    setLoading(false);
  }

  const onError = () => {
    setImgUrl(NoImage);
  }

  return (
    <>
      {loading && (<Loader loaderScale={calculateLoaderSize()}/>)}
      <Image
        src={imgUrl} 
        alt={alt}
        width={width}
        height={height}
        priority={true}
        onLoad={onLoad}
        onError={onError}
      />
    </>
  )
}
// глянути midllеware, + translations  