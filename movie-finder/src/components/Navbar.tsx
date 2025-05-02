'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Button from "./Button";

export default function Navbar() {
    const { data: session, status } = useSession();

    return (
        <div className="bg-gray-800 text-white">
            <div className="flex h-[100px] mx-auto p-10 flex justify-between items-center border">
                <Link href="/" className="text-xl text-black font-bold no-underline">
                    Movie Finder
                </Link>
                <div className="flex flex-col space-x-4 justify-space-between border">
                    <div>
                        <Link href="/" className="hover:text-gray-400">
                            Home
                        </Link>
                    </div>
                    <div>
                        {status === "authenticated" ? (
                            <div>
                                <div>
                                    welcome, {session.user?.name}
                                </div>
                                <div>
                                    <Button 
                                        title="Logout"
                                        onClick={() => signOut()}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Link href="auth/login" className="hover:text-gray-400">
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}