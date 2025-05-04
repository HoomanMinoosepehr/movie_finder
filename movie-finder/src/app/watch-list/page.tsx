import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import { WatchListMovie } from "@/types";
import MovieCard from "@/components/MovieCard";
import PageBackground from "@/components/PageBackground";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movie Finder - Watch List",
  description: "Your saved movies to watch later",
};

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
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <PageBackground />
      <div className="container mx-auto p-4 pt-32">
        <h2 className="text-2xl font-bold my-4 mb-5 text-white">
          My Watch List
        </h2>

        {watchList.length === 0 ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-lg text-yellow-500 bg-gray-800 bg-opacity-90 px-10 py-5 rounded">
              Your watch list is empty!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 w-[85%] mx-auto">
            {watchList.map((movie) => (
              <div key={movie.id}>
                <MovieCard
                  data={{
                    id: movie.movieId,
                    title: movie.movieTitle,
                    poster_path: movie.posterPath ?? "",
                  }}
                  isWatchList={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
