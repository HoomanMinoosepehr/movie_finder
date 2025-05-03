"use client";
import React, { useState } from "react";

export default function SearchBar() {
    const [searchText, setSearchText] = useState("");

    const handleChangeOnSearchBar = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchText(value);
    }

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