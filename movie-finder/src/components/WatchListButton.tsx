'use client';
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Button from "./Button";

interface WatchListButtonProps {
    movieId: string;
    movieTitle: string;
    posterPath: string;
}

export default function WatchListButton({ movieId, movieTitle, posterPath }: WatchListButtonProps) {
    const {data: session} = useSession();
    const [isInWatchList, setIsInWatchList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // TODO: error should be shown to the user
    const [error, setError] = useState(false);

    // checking if the movie is in watch list to render the button accordingly
    useEffect(() => {
        const checkIfInWatchList = async () => {
            if (!session?.user?.id) return;

            try {
                const response = await fetch(`/api/v1/profile/watch-list/${movieId}`);

                if (response.ok) {
                    setIsInWatchList(true);
                } else {
                    setIsInWatchList(false);
                }
            } catch {
                setError(true);
            }
        };

        checkIfInWatchList();
    }, [session?.user?.id, movieId]);

    // sending DELETE request to remove the movie from the watch list
    const removeFromWatchListHandler = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/v1/profile/watch-list/${movieId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setIsInWatchList(false);
            } else {
                setError(true);
            }
        } catch {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }

    // sending  POST request to add the movie to the watch list
    const addToWatchListHandler = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/v1/profile/watch-list', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    movieId: Number(movieId),
                    movieTitle,
                    posterPath,
                }),
            });

            if (response.ok) {
                setIsInWatchList(true);
            }
            else {
                setError(true);
            }
        } catch {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            { isLoading ? (
                <div>Processing...</div>
            ) : (
                isInWatchList ? (
                    <Button
                        title="Remove from Watch List"
                        onClick={removeFromWatchListHandler}
                    />
                ) : ( 
                    <Button
                        title="Add to Watch List"
                        onClick={addToWatchListHandler}
                    />
                )
            )}
        </div>
    )
}