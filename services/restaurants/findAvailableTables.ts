import { PrismaClient, Table } from "@prisma/client";
import { NextApiResponse } from "next";
import { times } from "../../data/times";

const prisma = new PrismaClient();

export default async function findAvailableTables({
  time,
  res,
  day,
  restaurant,
}: {
  time: string;
  res: NextApiResponse;
  day: string;
  restaurant: {
    tables: Table[];
    open_time: string;
    close_time: string;
  };
}) {
  const searchTimes = times.find((t) => t.time === time)?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  const bookingTablesObj: { [key: string]: { [key: number]: true } } = {};

  bookings.forEach((book) => {
    bookingTablesObj[book.booking_time.toISOString()] = book.tables.reduce(
      (obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      },
      {}
    );
  });

  const searchWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables: restaurant.tables,
    };
  });

  searchWithTables.forEach((t) => {
    t.tables = t.tables.filter((table: any) => {
      if (bookingTablesObj[t.date.toISOString()]) {
        if (bookingTablesObj[t.date.toISOString()][table.id]) return false;
      }
      return true;
    });
  });

  return searchWithTables;
}
