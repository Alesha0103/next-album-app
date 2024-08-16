import { redirect } from "next/navigation";

const PhotosListDefault = async () => {
  redirect("/photos/1");
}

export default PhotosListDefault;