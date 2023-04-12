"use client"

import Link from "next/link";
import { useContext } from "react";
import useAuth from "../../hooks/useAuth";
import { AuthComponentContext } from "../context/AuthContext";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const { data, loading } = useContext(AuthComponentContext);
  const { signout } = useAuth();

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        Restaurant{" "}
      </Link>

      <div>
        {!loading && <div className="flex">
          {data ? (
            <button className="bg-blue-400 text-white border p-1 px-4 rounded mr-3" onClick={signout}>
              Signout
            </button>
          ) : (
            <>
              <AuthModal isSignIn={true} />
              <AuthModal isSignIn={false} />
            </>
          )}
        </div>}
      </div>
    </nav>
  );
}
