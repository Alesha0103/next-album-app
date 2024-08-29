import { PhotoType } from "@/models/photos";

import NotFound from "@/app/not-found";
import { PhotoCard } from "@/components/photo-card/photo-card";

import styles from "../photos.module.scss";

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
    <div>
      <div className={styles.photoPageList}>
        {photos.map((photo: PhotoType) => {
          return (
            <PhotoCard
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
