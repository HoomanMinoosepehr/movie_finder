"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "./TextField";
import Button from "./Button";
import Link from "next/link";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword ] = useState("");
    const router = useRouter();

    const registerHandler = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });
        const data = await res.json();
        if (res.status === 200) {
            console.log("Registration successful", data);
            router.push("/auth/login");
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <TextField
                title="Name"
                value={name}
                placeholder="Enter your name"
                onChange={(value) => setName(value)}
            />
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
                title="Register"
                onClick={registerHandler}
            />
            <div>
                <p>Already have an account? <Link href="/auth/login">Login</Link></p>
            </div>
        </div>
    )
}