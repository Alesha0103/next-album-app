import React from 'react'
import { Photo } from '@/components/photo';
import { PhotoType } from '@/models/photos';

const PhotosList = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=16");
  const photos: PhotoType[] = await response.json();

  return (
    <div className="photo-page">
      <div className="photo-page__list">
        {photos.map((photo: PhotoType) => {
          return (
            <Photo
              key={photo.id+photo.albumId}
              photoBody={photo}
            />
          )
        })}
      </div>
    </div>
  )
}
export default PhotosList;