"use client";
import Image from "next/image";
import useSWR from "swr";

interface CastsPictureProps {
  movieId: number;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CreditsResponse {
  id: number;
  cast: CastMember[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CastsPicture({ movieId }: CastsPictureProps) {
  const { data, error, isLoading } = useSWR<CreditsResponse>(
    `/api/v1/credits/${movieId}`,
    fetcher,
  );

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-white mb-4">Cast</h2>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <p>Is Loading...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center">
          <p className="text-red-500">Error fetching cast data</p>
        </div>
      ) : (
        <div className="overflow-x-auto flex gap-8">
          {data?.cast?.map((person) => (
            <div
              key={person.id}
              className="flex flex-col items-center min-w-[120px]"
            >
              <div className="w-[130px] h-[130px] rounded-full overflow-hidden relative mb-2">
                {person.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                    alt={person.name}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>
              <div className="pb-5">
                <p className="font-sm text-white truncate">{person.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
