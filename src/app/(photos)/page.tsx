import React from 'react'
import { Photo } from '@/components/photos';
import { PhotoType } from '@/models/photos';
import { LoadMorePhotos } from '@/components/load-more-photos';

const PhotosList = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=5");
  const photos: PhotoType[] = await response.json();

  return (
    <div>
      <h1 style={{marginBottom: 25}}>My Album</h1>
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
  )
}
export default PhotosList;