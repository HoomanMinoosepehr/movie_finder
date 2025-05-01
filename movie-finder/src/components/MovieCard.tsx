"use client";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types";


export default function MovieCard( {data}: {data: Movie}) {
    return (
        <div className="border ">
            <Link href={`/single-movie/${data.id}`}>
                <Image
                    src={`https://image.tmdb.org/t/p/w400${data.poster_path}`}
                    alt={data.title}
                    width={200}
                    height={300}
                />
            </Link>
            <p className="text-lg">{data.title}</p>
            <p className="text-sm">{data.release_date}</p>
            <p className="text-sm">{data.vote_average}</p>
        </div>
    )
}