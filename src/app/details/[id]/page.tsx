import { PhotoType } from "@/models/photos";
import NotFound from "@/app/not-found";
import { ImgWrapp } from "@/components/img-wrapp/img-wrapp";

import styles from "../details.module.scss";

const DetailsPage = async ({
  params: { id },

}: {
  params: { id: string };
}) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
  const photo: PhotoType = await response.json();

  if (!photo?.id) {
    return <NotFound/>
  }

  return (
    <div className={styles.detailsPage}>
      <h2>
        My photo with id: {id}
      </h2>
      <h3>
        {photo.title}
      </h3>
      <ImgWrapp alt={photo.title} url={photo.url}/>
    </div>
  );
}

export default DetailsPage;