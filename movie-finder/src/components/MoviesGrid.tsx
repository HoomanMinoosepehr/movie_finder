"use client";
import { Movie, MovieList } from "@/types";
import MovieCard from "./MovieCard";
import  useSWRInfinite  from "swr/infinite";
import { useCallback, useRef } from "react";

interface MoviesGridProps {
    initialMovies: Movie[];
    apiEndpoint?: string; // The API endpoint to use (movie-list or movie-search)
    searchQuery?: string; // The search query if this is a search results grid
}

export default function MoviesGrid({ 
    initialMovies,
    apiEndpoint = "movie-list", 
    searchQuery = "" 
}: MoviesGridProps) {
    const pageUrl = (pageIndex: number, previousPageData: MovieList) => {
        // if we reached the end
        if (previousPageData && previousPageData.page >= previousPageData.total_pages) return null;
        
        // we're adding pageIndex by two because it starts from 0 and we already have the first page
        // we need to save it to adjust it based on the props
        let url = `api/v1/${apiEndpoint}?page=${pageIndex + 2}`;
        
        // modifying the url if it's being used in search page
        if (apiEndpoint === "movie-search" && searchQuery) {
            url += `&query=${encodeURIComponent(searchQuery)}`;
        }
        
        return url;
    }

    const fetcher = (url: string) => fetch(url).then((data) => data.json());

    const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(pageUrl, fetcher, {
        revalidateFirstPage: false,
        revalidateOnFocus: false,
        initialSize: 0, // we don't want to fetch anything at the beginning
        revalidateAll: false,
    });

    const movies = [
        ...initialMovies,
        ...(data ? data.flatMap((page: MovieList) => page.results) : [])
    ]

    const isMorePage = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEndOfList = data && data[data.length -1]?.results?.length < 20;

    // creating observer to detect when user reaches the end of the list
    const observer = useRef<IntersectionObserver | null>(null);

    const loadMoreMovies = useCallback((node: HTMLDivElement | null) => {
        if (isMorePage) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !isEndOfList && !isValidating) {
                setSize(size + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [isMorePage, isEndOfList, isValidating, setSize, size]);   

    return (
        <div>
            {movies.length > 0 ? (
                <div className="grid grid-cols-4 gap-4 p-4">
                    {movies.map((movie: Movie) => (
                        <div key={movie.id}>
                            <MovieCard data={movie}/>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-lg py-8">No movies found</p>
            )}
            <div ref={loadMoreMovies} className="w-full py-8 flex justify-center">
                {isLoading && !isEndOfList && (
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"> Loading...</div>
                )}
                {isEndOfList && movies.length > 0 && (
                    <p className="text-gray-500">No more movies to load</p>
                )}
            </div>
        </div>
    );
}