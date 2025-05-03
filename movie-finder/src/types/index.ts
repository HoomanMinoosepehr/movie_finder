export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date?: string;
    vote_average?: number;
    overview?: string;
}

export interface MovieList {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

// instead of saving only the movie id in the watch list,
// we save the title and poster path to render the movie card faster
export interface WatchListMovie {
    id: string;
    userId: string;
    movieId: number;
    movieTitle: string;
    posterPath: string | null;
    createdAt: Date;
}