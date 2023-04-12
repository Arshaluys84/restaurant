"use client";

import React, { createContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
  password: string;
}

interface State {
  loading: boolean;
  data: User | null;
  error: string | null;
}
interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}
export const AuthComponentContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

export default function AuthContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    const jwt = getCookie("jwt");
    if (!jwt) {
     return setAuthState({
        loading: false,
        data: null,
        error: null,
      });
    }
    try {
      setAuthState({
        loading: true,
        data: null,
        error: null,
      });
      const response = await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      axios.defaults.headers["Authorization"] = `Bearer ${jwt}`;
      setAuthState({
        loading: false,
        data: response.data,
        error: null,
      });
    } catch (error) {
      setAuthState({
        loading: false,
        data: null,
        error: "UnAuthorized User",
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AuthComponentContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthComponentContext.Provider>
  );
}
