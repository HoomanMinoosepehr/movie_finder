"use client";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types";

export default function MovieCard({ data }: { data: Movie }) {
  return (
    <div className="flex flex-col">
      <Link href={`/single-movie/${data.id}`} className="block">
        <div className="relative group overflow-hidden rounded-lg shadow-lg transition-transform duration-500 hover:scale-[1.04]">
          <Image
            src={`https://image.tmdb.org/t/p/w400${data.poster_path}`}
            alt={data.title}
            width={200}
            height={300}
            className="w-full object-cover block"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black group: bg-opacity-85 text-white p-4  translate-y-full transition-transform duration-500 group-hover:translate-y-0">
            <h3 className="font-bold text-2xl text-gray-300 truncate">
              {data.title}
            </h3>
            <div className="overflow-hidden h-[60px] relative mt-2">
              <p className="text-gray-200 line-clamp-4 text-xs">
                {data.overview}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black to-transparent"></div>
            <div className="flex justify-end align-middle mt-3">
              <div className="flex items-center justify-center">
                <p className="text-gray-300 mr-2">Rating:</p>
                <div className="border-2 border-solid border-green-600 rounded-full p-2 flex items-center justify-center">
                  <p className="text-sm font-medium">
                    {data.vote_average?.toFixed(1)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
