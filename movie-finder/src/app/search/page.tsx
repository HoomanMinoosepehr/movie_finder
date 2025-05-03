import MoviesGrid from "@/components/MoviesGrid";
import SearchBar from "@/components/SearchBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movie Finder - Search Results",
  description: "Search for movies by title"
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  try {
    const query = searchParams.query as string;

    // Fetch initial data for a faster first load
    // and pass it to the grid component as initial data
    const res = await fetch(
        // use encodeURIComponent to encode the query string
        // it prevents URL injection and special characters from breaking the URL
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/movie-search?query=${encodeURIComponent(query)}&page=1`,
      { cache: 'no-store' }
    );
    
    if (!res.ok) {
        console.log(`API error: ${res.status}`);
        throw new Error("Failed to fetch search results");
    }
    
    const data = await res.json();
    
    return (
      <div className="container mx-auto p-4">
        <SearchBar />
        <h2 className="text-2xl font-bold my-4">Search Results for: "{query}"</h2>
        {data.results.length > 0 ? (
          <MoviesGrid 
            initialMovies={data.results} 
          />
        ) : (
          <p className="text-center text-lg text-gray-600">No results found for "{query}"</p>
        )}
      </div>
    );
  } catch {
    return (
      <div className="container mx-auto p-4">
        <SearchBar />
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Error fetching search results. Please try again later.</p>
        </div>
      </div>
    );
  }
}