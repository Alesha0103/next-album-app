import { PhotoType } from "@/models/photos";
import Image from "next/image";

import NotFound from "@/app/not-found";

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
    <div className="details-page">
      <h2>
        My photo with id: {id}
      </h2>
      <h3>
        {photo.title}
      </h3>
      <Image
          src={photo.thumbnailUrl} 
          alt={photo.title}
          width={350}
          height={350}
          priority={true}
      />
    </div>
  );
}

export default DetailsPage;