import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import { WatchListMovie } from "@/types";
import MovieCard from "@/components/MovieCard";

export default async function WatchList() {
    const session = await getServerSession(authOptions);

    // not authenticated users will be redirected to login page
    if (!session?.user) {
        redirect("/auth/login");
    }

    // get the watch list from the database based on the user id
    // and order it by date of addition
    const watchList: WatchListMovie[] = await prisma.watchList.findMany({
        where: {
            userId: session.user.id
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div>
            <h1>My Watch List:</h1>
            { watchList.length === 0 ? (
                <p>Watch List is empty!</p>
            ) : (
                <div>
                    {watchList.map(movie => (
                        <div key={movie.id}>
                            <MovieCard
                                data={(
                                    {
                                        id: movie.movieId,
                                        title: movie.movieTitle,
                                        poster_path: movie.posterPath ?? "",
                                    }
                                )}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}