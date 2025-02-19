import { PhotoType } from "@/models/photos";

import { Photo } from "@/components/photo";
import NotFound from "@/app/not-found";

const PhotosList = async ({
  params: { id },

}: {
  params: { id: string };
}) => {

  if (isNaN(Number(id))) {
    return <NotFound />
  }

  const _limit = 16;
  const _start = id === "1" ? "0" : (Number(id)-1) * _limit;

  const response = await fetch(`https://jsonplaceholder.typicode.com/photos?_start=${_start}&_limit=${_limit}`);
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
