import React from "react";

interface InputProps {
  signData: {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    phone: string;
    password: string;
  };
  handleSignDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignIn: boolean
}

export default function AuthModalInputs({
  signData,
  handleSignDataChange,
  isSignIn
}: InputProps) {
  return (
    <div>
      {!isSignIn && <div className="my-3 flex justify-between text-sm">
        <input
          className="border rounded p-2 py-3 w-[49%]"
          type="text"
          placeholder="First Name"
          onChange={handleSignDataChange}
          value={signData.firstName}
          name="firstName"
        />
        <input
          className="border rounded p-2 py-3 w-[49%]"
          type="text"
          placeholder="Last Name"
          onChange={handleSignDataChange}
          value={signData.lastName}
          name="lastName"
        />
      </div>}
      <div className="my-3 flex justify-between text-sm">
        <input
          className="border rounded p-2 py-3 w-full"
          type="text"
          placeholder="Email"
          onChange={handleSignDataChange}
          value={signData.email}
          name="email"
        />
      </div>
      {!isSignIn && <div className="my-3 flex justify-between text-sm">
        <input
          className="border rounded p-2 py-3 w-[49%]"
          type="text"
          placeholder="City"
          onChange={handleSignDataChange}
          value={signData.city}
          name="city"
        />
        <input
          className="border rounded p-2 py-3 w-[49%]"
          type="text"
          placeholder="Phone"
          onChange={handleSignDataChange}
          value={signData.phone}
          name="phone"
        />
      </div>}
      <div className="my-3 flex justify-between text-sm">
        <input
          className="border rounded p-2 py-3 w-full"
          type="password"
          placeholder="Password"
          onChange={handleSignDataChange}
          value={signData.password}
          name="password"
        />
      </div>
    </div>
  );
}
