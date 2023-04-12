"use client";

import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import useReserve from "../../../../hooks/useReserve";

export default function Form({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) {
  type FormDataType = {
    bookerFirstName: string;
    bookerLastName: string;
    bookerEmail: string;
    bookerPhone: string;
    bookerOccasion?: string;
    bookerRequest?: string;
  };
  const [formData, setFormData] = useState<FormDataType>({
    bookerFirstName: "",
    bookerLastName: "",
    bookerEmail: "",
    bookerPhone: "",
    bookerOccasion: "",
    bookerRequest: "",
  });

  const [disabled, setDisabled] = useState(true);

  const { loading, error, fetchReserve } = useReserve();
  const [day, time] = date.split("T");
  const [didBook, setDidBook] = useState(false)
  const handleBookingDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: FormDataType) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const {
    bookerFirstName,
    bookerLastName,
    bookerEmail,
    bookerPhone,
    bookerOccasion,
    bookerRequest,
  } = formData;

  const handleReserveClick = async () => {
    await fetchReserve({
      bookerFirstName,
      bookerLastName,
      bookerEmail,
      bookerPhone,
      bookerOccasion,
      bookerRequest,
      slug,
      partySize,
      day,
      time,
      setDidBook
    });
    setFormData({bookerFirstName: "",
    bookerLastName: "",
    bookerEmail: "",
    bookerPhone: "",
    bookerOccasion: "",
    bookerRequest: "",})
  };

  useEffect(() => {
    if (!bookerFirstName || !bookerLastName || !bookerEmail || !bookerPhone) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [bookerFirstName, bookerLastName, bookerEmail, bookerPhone]);
  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? <div>
          <h2>You have done a reserve</h2>
          <p>We are waiting for you</p>
      </div>
       : <>
        <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="First name"
        value={formData.bookerFirstName}
        onChange={handleBookingDataChange}
        name="bookerFirstName"
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Last name"
        value={formData.bookerLastName}
        onChange={handleBookingDataChange}
        name="bookerLastName"
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Phone number"
        value={formData.bookerPhone}
        onChange={handleBookingDataChange}
        name="bookerPhone"
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Email"
        value={formData.bookerEmail}
        onChange={handleBookingDataChange}
        name="bookerEmail"
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Occasion (optional)"
        value={formData.bookerOccasion}
        onChange={handleBookingDataChange}
        name="bookerOccasion"
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Requests (optional)"
        value={formData.bookerRequest}
        onChange={handleBookingDataChange}
        name="bookerRequest"
      />

      <button
        className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
        onClick={handleReserveClick}
        disabled={disabled || loading}
      >
        {loading ? (
          <CircularProgress color="inherit" />
        ) : (
          "Complete reservation"
        )}
      </button>

      <p className="mt-4 text-sm">
        By clicking “Complete reservation” you agree to the OpenTable Terms of
        Use and Privacy Policy. Standard text message rates may apply. You may
        opt out of receiving text messages at any time.
      </p>
      </>}
    </div>
  );
}
