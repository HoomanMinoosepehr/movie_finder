import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import WatchListButton from "@/components/WatchListButton";
import PageBackground from "@/components/PageBackground";
import CastsPicture from "@/components/CastsPicture";
interface SingleMovieProps {
  params: {
    movieId: string;
  };
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

function selectRatingBorderColor(rating: number) {
  if (rating >= 7) return "border-green-500";
  if (rating >= 4) return "border-yellow-500";
  if (rating >= 3) return "border-orange-500";
  return "border-red-500";
}

export default async function SingleMovie({ params }: SingleMovieProps) {
  const session = await getServerSession(authOptions);
  const { movieId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/single-movie?movie_id=${movieId}`,
  );
  const data: MovieDetails = await res.json();

  const formattedBudget = data.budget
    ? data.budget.toLocaleString() + " USD"
    : "N/A";

  return (
    <div className="pt-28">
      <PageBackground
        imagePath={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
        opacity={0.8}
        blur={1}
      />
      <div className="container mx-auto py-8 px-4 md:px-8">
        <div className="bg-gray-800 bg-opacity-60 backdrop-blur rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/3 flex-shrink-0">
              <div className="h-full">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                  alt={data.title}
                  width={500}
                  height={750}
                  className="w-full h-auto object-cover block"
                />
              </div>
            </div>

            <div className="lg:w-2/3 p-6 lg:p-10 flex flex-col space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {data.title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-300 mb-4">
                  <p>{data.runtime} minutes</p>
                  <p className="text-gray-400">•</p>
                  <p>
                    {data.status} on {data.release_date}
                  </p>
                </div>

                <div className="flex items-center mb-4">
                  <div
                    className={`border-2 border-solid ${selectRatingBorderColor(data.vote_average)} text-white font-bold rounded-full w-12 h-12 flex items-center justify-center`}
                  >
                    {data.vote_average.toFixed(1)}
                  </div>
                  <span className="ml-2 text-sm text-gray-300">
                    User Rating
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {data.genres.map((genre) => (
                    <div
                      key={genre.id}
                      className="px-3 py-1 bg-blue-900 text-blue-100 text-xs font-medium rounded-full"
                    >
                      {genre.name}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Overview
                </h2>
                <p className="text-gray-300 leading-relaxed">{data.overview}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white mb-1">
                  Budget
                </h2>
                <p className="text-gray-300">{formattedBudget}</p>
              </div>

              <div className="mt-4">
                {session?.user ? (
                  <WatchListButton
                    movieId={data.id.toString()}
                    movieTitle={data.title}
                    posterPath={data.poster_path}
                  />
                ) : (
                  <div className="bg-red-100 border-red-500 text-red-700 p-3 rounded flex flex-col w-fit">
                    <p className="font-medium text-base">Login required</p>
                    <p className="text-sm">
                      Sign in to add this movie to your watchlist
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-gray-800/80 backdrop-blur rounded-xl shadow-xl p-6">
            <CastsPicture movieId={data.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
