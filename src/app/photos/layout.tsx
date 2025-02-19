import { Metadata } from "next";
import { Header } from "@/components/header";
import { PageNavigation } from "@/components/page-navigation";

export const metadata: Metadata = {
  title: "Photos",
  description: "Generated by Oleksii Skrebtsov",
};

export default function PhotosLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header/>
      {props.children}
      <PageNavigation/>
    </>
  );
}