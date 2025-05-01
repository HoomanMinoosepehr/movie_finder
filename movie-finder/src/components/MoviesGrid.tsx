"use client";
import { Movie } from "@/types";
import MovieCard from "./MovieCard";

interface MoviesGridProps {
    initialMovies: Movie[];
}

export default function MoviesGrid({ initialMovies }: MoviesGridProps) {
    return (
        <div className="grid grid-cols-4 gap-4 p-4">
            {initialMovies.map((movie: Movie) => (
                <div key={movie.id}>
                    <MovieCard data={movie}/>
                </div>
                )
            )}
        </div>
    )
}