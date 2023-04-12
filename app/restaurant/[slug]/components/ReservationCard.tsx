"use client";

import { useState } from "react";
import Link from "next/link";
import DatePicker from "react-datepicker";
import { CircularProgress } from "@mui/material";

import { partysize as partysizes, times } from "../../../../data/intex";
import { convertToDisplayTime, Time } from "../../../../utils/convertToDisplayTime";
import useAvailabilities from "../../../../hooks/useAvailabilities";

export default function ReservationCard({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) {
  const { loading, error, data, fetchAvailabilities } = useAvailabilities();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState("2");
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }

    setSelectedDate(null);
  };

  const filterRestaurantWorkingTimes = () => {
    const workingTimes: typeof times = [];

    let isOpen = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isOpen = true;
      }
      if (isOpen) {
        workingTimes.push(time);
      }
      if (time.time === closeTime) {
        isOpen = false;
      }
    });

    return workingTimes;
  };

  const handleTimeFinder = () => {
    fetchAvailabilities({
      slug,
      day,
      time,
      partySize,
    });
    console.log(data);
  };

  return (
    <div className="fixed w-[15%] bottom-10 bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          name=""
          className="py-3 border-b font-light"
          id=""
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        >
          {partysizes.map((opt: { value: number; label: string }) => (
            <option value={opt.value} key={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            className="py-3 border-b font-light text-reg w-24"
            dateFormat="MMMM d"
            wrapperClassName="w-[48%]"
          />
          {/*className="py-3 border-b font-light text-reg w-24" dateFormat="MMMM d" wrapperClassName="w-[48%]" */}
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
            className="py-3 border-b font-light"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {filterRestaurantWorkingTimes().map((time, index) => {
              return (
                <option value={time.time} key={index}>
                  {time.displayTime}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
          onClick={handleTimeFinder}
          disabled={loading}
        >
          {loading ? <CircularProgress color="inherit" /> : "Find a Time"}
        </button>
      </div>
      {data && data.length && (
        <div className="mt-4">
          <p className="tex-reg">Select a Time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time) => {
              return time.available ? (
                <Link
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  className="bg-red-600 cursor-pointer p-2 w-18 text-center text-white mb-3 rounded mr-3"
                  key={time.time}
                >
                  <p className="text-sm font-bold" key={time.time}>{convertToDisplayTime(time.time as Time)}</p>
                  
                </Link>
              ) : (
                <p className="bg-gray-300 p-2 w-18 mb-3 rounded mr-3">{convertToDisplayTime(time.time as Time)}</p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
