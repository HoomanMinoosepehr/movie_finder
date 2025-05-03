"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "./TextField";
import Button from "./Button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { AuthError } from "@/types";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<AuthError>({ message: "", status: false });
  const router = useRouter();

  const loginHandler = async () => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: email.toLowerCase(),
        password,
      });

      if (result?.error) {
        setError({
          message: "Invalid email or password! Please try again.",
          status: true,
        });
        console.log("Login failed:", result.error);
        return;
      }

      console.log("Login successful", result);
      router.push("/");
      router.refresh(); // refresh the page to update the session
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
        <Button title="Log In" onClick={loginHandler} />
      </div>
      <div className="pt-3">
        {error.status ? (
          <p className="text-bold text-red-700 text-lg">{error.message}</p>
        ) : null}
        <p className="text-white text-sm">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-bold text-blue-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
