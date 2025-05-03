import { prisma } from "../../../../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface Params {
    params: {
        movieId?: string;
    }
}

// delete a movie from watch list
export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        const session = await getServerSession(authOptions);

        // check if user is authenticated
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // if we don't use await here, Next.js will show an error
        const { movieId } = await params;

        const watchListItem = await prisma.watchList.findFirst({
            where: {
                userId: session.user.id,
                movieId: Number(movieId)
            }
        })

        if (!watchListItem) {
            return NextResponse.json({ error: "Movie not in watch list" }, { status: 400 });
        }
        
        // prisma only allows deleting by unique fields, that's why we need to find the item first
        await prisma.watchList.delete({
            where: {
                id: watchListItem.id
            }
        });

        return NextResponse.json({ message: "Movie removed successfully!"}, { status: 200 });
    } catch (error) {
        console.error('Removing from watch list error:', error);
        return NextResponse.json({ error: 'Removing from watch list error' }, { status: 500 });
    }
}

// check if movie is in watch list, to show the button 
export async function GET(request: NextRequest, { params }: Params) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        // if we don't use await here, Next.js will show an error
        const { movieId } = await params;

        const isMovieInWatchList = await prisma.watchList.findFirst({
            where: {
                userId: session.user.id,
                movieId: Number(movieId)
            }
        })

        if (!isMovieInWatchList) {
            return NextResponse.json({ error: "Movie not in watch list" }, { status: 400 });
        }

        return NextResponse.json({ message: "Movie is in watch list!"}, { status: 200 });
    } catch (error) {
        console.error('Checking watch list error:', error);
        return NextResponse.json({ error: 'Checking watch list error' }, { status: 500 });
    }
}

// add a movie to watch list
export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const { movieId, movieTitle, posterPath } = await request.json();

        // check if the movie is already in the watch list
        const movieExists = await prisma.watchList.findFirst({
            where: {
                userId: session.user.id,
                movieId: Number(movieId)
            }
        });

        // reject the request if it's already in the watch list
        if (movieExists) {
            return NextResponse.json({ error: "Movie is in watchlist" }, { status: 400 });
        }
        // add the movie to the watch list
        const addedMovie = await prisma.watchList.create({
            data: {
                userId: session.user.id,
                movieId: Number(movieId),
                movieTitle,
                posterPath
            }
        });

        return NextResponse.json(addedMovie);
    } catch {
        return NextResponse.json({ error: "Can't add movie to watch list, try later!" }, { status: 500 });
    }
}
