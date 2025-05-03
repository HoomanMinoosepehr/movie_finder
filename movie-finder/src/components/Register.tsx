"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "./TextField";
import Button from "./Button";
import Link from "next/link";
import { AuthError } from "@/types";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState<AuthError>({ message: "", status: false });

  const registerHandler = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        },
      );
      const data = await res.json();
      if (res.status === 201) {
        console.log("Registration successful", data);
        router.push("/auth/login");
      }

      if (res.status === 400) {
        setError({ message: "You already have an account!", status: true });
      }
    } catch {
      setError({
        message: "An error occurred! Please try again later.",
        status: true,
      });
    }
  };

  useEffect(() => {
    if (error.status) {
      setTimeout(() => {
        setError({ message: "", status: false });
      }, 5000);
    }
  }, [error]);

  return (
    <div>
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
      <div className="flex mt-3 justify-center">
        <Button title="Register" onClick={registerHandler} />
      </div>
      <div className="pt-3">
        {error.status ? (
          <p className="text-bold text-red-700 text-lg">{error.message}</p>
        ) : null}
        <p className="text-white text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-bold text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
