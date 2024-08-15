import { PhotoType } from "@/models/photos";
import Image from "next/image";

const DetailsPage = async ({
  params: { id },

}: {
  params: { id: string };
}) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
  const photo: PhotoType = await response.json();

  return (
    <div>
      My photo with id: {id}

      <Image
          src={photo.thumbnailUrl} 
          alt={photo.title}
          width={250}
          height={250}
          priority={false}
      />
    </div>
  );
}

export default DetailsPage;