'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Button from "./Button";

export default function Navbar() {
    const { data: session, status } = useSession();
    const isAuthenticated = status === 'authenticated';

    return (
        <div className="bg-gray-800 text-white w-full opacity-90 fixed z-10">
            <div className="container mx-auto flex h-24 px-4 justify-between items-center">
                <Link href="/" className="text-lg sm:text-2xl lg:text-4xl text-yellow-500 font-sans font-bold no-underline">
                    Movie Finder
                </Link>
                <div className="flex items-center gap-4">
                    { status === "authenticated" ? (
                        <Link 
                            href="/watch-list" 
                            className="flex rounded justify-center border border-solid border-yellow-500 text-yellow-500 sm:py-2 text-sm p-1 sm:px-4 sm:text-base hover:bg-yellow-500 hover:text-gray-800"
                        >
                            Watch List
                        </Link>
                    ) : null}
                    {isAuthenticated ? (
                        <div className="flex items-center gap-3">
                            <div className="text-white text-sm sm:text-base">
                                Hi, {session.user?.name || 'User'}
                            </div>
                            <div>
                                <Button 
                                    title="Logout"
                                    onClick={() => signOut()}
                                    style="bg-red-600 hover:bg-red-700 sm:px-3 sm:py-1 p-1 rounded-md text-sm sm:text-base transition-colors"
                                />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <Link href="/auth/login" className="flex rounded-xl justify-center border border-solid border-yellow-500 text-yellow-500 p-2 hover:bg-yellow-500 hover:text-gray-800">
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}