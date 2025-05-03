import MoviesGrid from "@/components/MoviesGrid";
import PageBackground from "@/components/PageBackground";
import SearchBar from "@/components/SearchBar";
import { Metadata } from "next";

const revalidate = 3600*6; // re-rendering the page every 6 hours

export const metadata: Metadata = {
  title: "Movie Finder - Popular Movies",
  description: "Discover movies that are currently playing in theaters."
};

export default async function Home() {
  try {
    // fetch the initial data from API for a faster first load and pass it to the grid component as initial data
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/movie-list?page=1`, {next: { revalidate: revalidate }});
    if (!res.ok) {
      console.log(`API error: ${res.status}`);
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
  
    return (
      <>
        <PageBackground/>
        <div className="container mx-auto p-4 pt-32">
          <SearchBar />
          <h2 className="text-2xl font-bold my-4 mb-5 text-white">Latest Movies</h2>
          <MoviesGrid initialMovies={data.results} />
        </div>
      </>
    );
  } catch {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg">Error fetching data. Please try again later.</p>
      </div>
    );
  }
}
