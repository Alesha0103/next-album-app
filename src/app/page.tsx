import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="album-app_wrapp">
      <h1 className="album-app__title">Check out the Album app by clicking the link below</h1>
      <Link href="photos">
        <button className="album-app__button">Album</button>
      </Link>
    </div>
  );
}
