import React from "react";
import Image from "next/image";
import { PhotoType } from "@/models/photos";
import Link from "next/link";
import { ImgWrapp } from "./img-wrapp";

type PhotoProps = {
  photoBody: PhotoType
}

export const PhotoCard: React.FC<PhotoProps> = ({ photoBody }) => {
  return (
    <div className="photo-card">
      <div className="photo-card__container">
        <Link href={`/photos/${photoBody.id}`}>
          <h2>Photo with id: {photoBody.id}</h2>
        </Link>
        <h3>{photoBody.title}</h3>
        <Link href={`/details/${photoBody.id}`}>
          <ImgWrapp alt={photoBody.title} url={photoBody.thumbnailUrl} width={150} height={150}/>
        </Link>
      </div>
    </div>
  )
}
