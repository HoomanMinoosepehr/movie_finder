"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import debounce from "lodash.debounce";

export default function SearchBar() {
    const searchParams = useSearchParams();
    const [searchText, setSearchText] = useState(searchParams.get('query') || "");
    const router = useRouter();

    const handleChangeOnSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
        debounceFunction.current?.(value);
    }

    const debounceFunction = useRef<ReturnType<typeof debounce> | null>(null);

    // we need to update the query params and push to the new URL
    // we're using debounce to do this only after the user stops typing for some time
    // this is to avoid too many requests to the server
    useEffect(() => {
        debounceFunction.current = debounce((value: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value && value.length >= 2) {
                params.set('query', value);
                router.push(`/search?${params.toString()}`);
            } else if (value.length === 0) {
                params.delete('query');
                router.push(`/`);
            }
        }, 500);

        // clean up pending executions when dependencies change
        return () => {
            debounceFunction.current?.cancel();
        };
    }, [searchParams, router]);

    return (
        <div>
            <input
                type="text"
                value={searchText}
                onChange={handleChangeOnSearchBar}
                placeholder="Search for movies (min. 2 characters)..."
                className="w-full p-2 border border-gray-300 rounded"
            />
            {searchText.length === 1 && (
                <p className="text-sm text-red-500 mt-1">Please enter at least 2 characters</p>
            )}
        </div>
    );
}