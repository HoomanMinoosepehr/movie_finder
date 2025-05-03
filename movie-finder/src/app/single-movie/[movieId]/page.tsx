import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route"
import WatchListButton from "@/components/WatchListButton";
import PageBackground from "@/components/PageBackground";
interface SingleMovieProps {
    params: {
        movieId: string;
    }
}

interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    budget: number;
    genres: Array<{
        id: number;
        name: string;
    }>;
    runtime: number;
    status: string;
}

export default async function SingleMovie({ params }: SingleMovieProps) {
    const session = await getServerSession(authOptions);
    const { movieId } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/single-movie?movie_id=${movieId}`);
    const data: MovieDetails = await res.json();
    return (
        <>
            <PageBackground 
                imagePath={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
                opacity={0.7}
                blur={0}
            />
            <div>
                <div className="flex flex-row md:flex-row justify-center items-center gap-4 p-4">
                    <div>
                        <Image
                            src={`https://image.tmdb.org/t/p/w400${data.poster_path}`}
                            alt={data.title}
                            width={400}
                            height={600}
                        />
                    </div>
                    <div className="p-10 border">
                        <h1 className="text-2xl font-bold">{data.title}</h1>
                        <p className="text-sm">{data.release_date}</p>
                        <p className="text-sm">{data.vote_average}</p>
                        <p className="text-sm">{data.overview}</p>
                        <p className="text-sm">Budget: {data.budget}</p>
                        <p className="text-sm">Runtime: {data.runtime} minutes</p>
                        <p className="text-sm">Status: {data.status}</p>
                            { session?.user ? (
                                <WatchListButton
                                    movieId={data.id.toString()}
                                    movieTitle={data.title}
                                    posterPath={data.poster_path}
                                />
                            ) : (
                                <p className="text-sm text-red-500">Login to add to watch list</p>
                            ) }
                        <div>
                            <h2>Genres:</h2>
                            {data.genres.map((genre) => (
                                    <div key={genre.id} className="text-sm">
                                        {genre.name}
                                    </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Recommendations:</h2>
                </div>
            </div>
        </>
    )
}