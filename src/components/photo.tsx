import React from "react";
import Image from "next/image";
import { PhotoType } from "@/models/photos";
import Link from "next/link";

type PhotoProps = {
  photoBody: PhotoType
}

export const Photo: React.FC<PhotoProps> = ({ photoBody }) => {
  return (
    <div className="photo-card">
      <div className="photo-card__container">
        <Link href={`/photos/${photoBody.id}`}>
          <h2>Photo with id: {photoBody.id}</h2>
        </Link>
        <h3>{photoBody.title}</h3>
        <Link href={`/photos/${photoBody.id}`}>
          <Image
            src={photoBody.thumbnailUrl} 
            alt={photoBody.title}
            width={150}
            height={150}
            priority={true}
          />
        </Link>
      </div>
    </div>
  )
}
