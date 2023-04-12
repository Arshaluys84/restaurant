"use client";

import React, { ReactNode, useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../../hooks/useAuth";
import { AuthComponentContext } from "../context/AuthContext";
import { Alert, CircularProgress } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { loading, data, error } = useContext(AuthComponentContext);
  const [signData, setSignData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: "",
    password: "",
  });
 
  const { signin, signup } = useAuth();
  const handleSignDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderSignIn = (
    signinContent: string,
    signupContent: string
  ): ReactNode => {
    return isSignIn ? signinContent : signupContent;
  };
  useEffect(() => {
    const { email, password, firstName, lastName, city, phone } = signData;
    if (isSignIn) {
      if (email && password) {
        return setDisabled(false);
      }
    } else {
      if (email && password && firstName && lastName && city && phone) {
        return setDisabled(false);
      }
    }
    setDisabled(true);
  }, [signData, isSignIn]);

  const handleClick = () => {
    if(isSignIn){
      signin({ email: signData.email, password: signData.password }, handleClose);
    }else{
      signup(signData,handleClose)
    }
  };

  return (
    <div>
      <button
        className={`${renderSignIn(
          "bg-blue-400 text-white border",
          "border"
        )} p-1 px-4 rounded mr-3`}
        onClick={handleOpen}
      >
        {renderSignIn("Sign in", "Sign up")}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="py-24 flex justify-center px-2 h-[600px]">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2 h-[600px]">
              {error && <Alert severity="error">{error}</Alert>}
              <div className="uppercase font-bold text-center pb-2 border-b mp-2">
                <p className="text-sm">
                  {renderSignIn("Sign In", "Create Account")}
                </p>
                <p>{data?.firstName}</p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {renderSignIn("Log Into Your Account", "Create Your Account")}
                </h2>
                <AuthModalInputs
                  signData={signData}
                  handleSignDataChange={handleSignDataChange}
                  isSignIn={isSignIn}
                />
                <button
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                  disabled={disabled}
                  onClick={handleClick}
                >
                  {renderSignIn("Log In", "Create Account")}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
