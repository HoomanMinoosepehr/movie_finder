import { NextResponse, NextRequest } from "next/server";

interface Params {
  params: {
    movieId: string;
  };
}

// if we remove the request from the function, Next.js will show an error, although we don't use it!
export async function GET(requst: NextResponse, { params }: Params) {
  const api_key = process.env.TMDB_API_KEY;

  // if we don't use await here, Next.js will show an error
  const { movieId } = await params;
  const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${api_key}`,
    },
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching credits' data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
