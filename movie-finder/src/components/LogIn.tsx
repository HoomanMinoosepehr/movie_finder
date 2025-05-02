"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "./TextField";
import Button from "./Button";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const loginHandler = async () => {
        try {
            const result = await signIn("credentials", {
                redirect: false,
                email: email.toLowerCase(),
                password,
            });
            
            if (result?.error) {
                setError("Invalid email or password");
                console.log("Login failed:", result.error);
                return
            }

            console.log("Login successful", result);
            router.push("/");
            router.refresh(); // refresh the page to update the session
        } catch {
            setError("An error occurred during login");
        }
    }
    return (
        <div>
            <h1>Log In</h1>
            <TextField
                title="Email"
                value={email}
                placeholder="Enter your email"
                onChange={(value) => setEmail(value)}
            />
            <TextField
                title="Password"
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(value) => setPassword(value)}
            />
            <Button
                title="Log In"
                onClick={loginHandler}
            />
            <div>
                <p>Don't have an account? <Link href="/auth/register">Register</Link></p>
            </div>
        </div>
    );
}