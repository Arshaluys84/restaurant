"use client";

import { useState } from "react";
import axios from "axios";

export default function useReserve() {
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState<
  //   { time: string; available: boolean }[] | null
  // >(null);
  const [error, setError] = useState(null);

  const fetchReserve = async ({
    bookerFirstName,
    bookerLastName,
    bookerEmail,
    bookerPhone,
    bookerOccasion,
    bookerRequest,
    slug,
    day,
    time,
    partySize,
    setDidBook
  }: {
    bookerFirstName: string;
    bookerLastName: string;
    bookerEmail: string;
    bookerPhone: string;
    bookerOccasion?: string;
    bookerRequest?: string;
    slug: string;
    day: string;
    time: string;
    partySize: string;
    setDidBook: React.Dispatch<React.SetStateAction<boolean>>
  }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerFirstName,
          bookerLastName,
          bookerEmail,
          bookerPhone,
          bookerOccasion,
          bookerRequest,
        },
        {
          params: {
            day,
            time,
            partySize,
          },
        }
      );
      setLoading(false);
      setDidBook(true)
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.errorMessage);
    }
  };

  return {
    error,
    // data,
    loading,
    fetchReserve,
  };
}
