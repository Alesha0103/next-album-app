import React from 'react'
import { Photo } from '@/components/photo';
import { PhotoType } from '@/models/photos';
import { LoadMorePhotos } from '@/components/load-more-photos';

const PhotosList = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=5");
  const photos: PhotoType[] = await response.json();

  return (
    <div className="photo-page">
      <h1 style={{marginBottom: 25}}>My Album</h1>
      <div className="photo-page__list">
        {photos.map((photo: PhotoType) => {
          return (
            <Photo
              key={photo.id+photo.albumId}
              photoBody={photo}
            />
          )
        })}
        <LoadMorePhotos/>
      </div>
    </div>
  )
}
export default PhotosList;