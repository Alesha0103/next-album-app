import type { Metadata } from "next";
import "./globals.css";;

export const metadata: Metadata = {
  title: "Album App",
  description: "Generated by Oleksii Skrebtsov",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  );
}
