"use client"
import { PhotoType } from '@/models/photos';
import React from 'react'
import { Photo } from './photo';

export const LoadMorePhotos = () => {
  const [ start, setStart ] = React.useState<number>(16);
  const [ photos, setPhotos ] = React.useState<PhotoType[]>([]);

  const onLoadMoreClick = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${start}&_limit=16`);
    const data: PhotoType[] = await response.json();
    setStart(start + 16);
    setPhotos([...photos, ...data]);
  }

  return (
    <div className="load-more">
      {photos?.map((photo: PhotoType) => {
        return (
          <Photo key={photo.albumId + photo.id} photoBody={photo}/>
        )
      })}
      <button 
        className="load-more__button"
        onClick={onLoadMoreClick}
      >
        Load more...
      </button>
    </div>
  )
}
