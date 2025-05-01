import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

// import the Inter font family from google fonts for the entire app
const inter = Inter({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Movie Finder",
  description: "Find Best Movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
