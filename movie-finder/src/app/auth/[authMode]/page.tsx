import LogIn from "@/components/LogIn";
import PageBackground from "@/components/PageBackground";
import Register from "@/components/Register";
import Link from "next/link";

interface AuthProps {
  params: {
    authMode: string;
  };
}

export default async function Auth({ params }: AuthProps) {
  const { authMode } = await params;

  return (
    <>
      <PageBackground />
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-black/70 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="flex border-b border-gray-700">
            <div
              className={`w-1/2 py-4 text-center font-medium ${
                authMode === "login"
                  ? "text-white bg-purple-800"
                  : "text-gray-400 hover:text-white transition-colors"
              }`}
            >
              <Link href="/auth/login">Login</Link>
            </div>
            <div
              className={`w-1/2 py-4 text-center font-medium ${
                authMode === "register"
                  ? "text-white bg-purple-800"
                  : "text-gray-400 hover:text-white transition-colors"
              }`}
            >
              <Link href="/auth/register">Register</Link>
            </div>
          </div>

          <div className="p-6 flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-white mt-2 mb-3 text-center">
              {authMode === "login" ? "Welcome Back" : "Join Movie Finder"}
            </h1>

            {authMode === "login" ? (
              <LogIn />
            ) : authMode === "register" ? (
              <Register />
            ) : (
              <div className="text-center text-red-500 py-8">
                Invalid authentication mode
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
