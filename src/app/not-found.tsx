"use client"
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  }

  return (
    <div className="not-found">
      <h2>Page not found</h2>
      <h3>Could not find requested resource</h3>
      <button onClick={handleGoBack}>Go back</button> 
    </div>
  );
}

export default NotFound;