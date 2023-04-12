import { useContext } from "react";

import axios from "axios";
import { removeCookies } from "cookies-next"

import { AuthComponentContext } from "../app/context/AuthContext";

const useAuth = () => {
  const { setAuthState } =
    useContext(AuthComponentContext);

  const signin = async (
    { email, password }: { email: string; password: string },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      setAuthState({
        loading: false,
        error: null,
        data: response.data,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        loading: false,
        error: error.response.data.errorMessage,
        data: null,
      });
    }
  };
  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      phone,
      city,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phone: string;
      city: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
        data: null,
        error: null,
        loading: true,
      });
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/signup",
          {
            email,
            password,
            firstName,
            lastName,
            city,
            phone
          }
        );
        setAuthState({
          loading: false,
          error: null,
          data: response.data,
        });
        handleClose();
      } catch (error: any) {
        setAuthState({
          loading: false,
          error: error.response.data.errorMessage,
          data: null,
        });
      }
  };

  const signout = () =>{
    removeCookies("jwt")
    setAuthState({
        loading: false,
        error: null,
        data: null,
      });
  }
  return {
    signin,
    signup,
    signout
  };
};

export default useAuth;
