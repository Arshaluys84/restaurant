import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import findAvailableTables from "../../../../services/restaurants/findAvailableTables";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };

  if (!day || !time || !partySize) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug: slug as string,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    return res.status(400).json({ message: "Invalid Data" });
  }

  const searchWithTables = await findAvailableTables({
    time,
    res,
    day,
    restaurant,
  });
  if (!searchWithTables) {
    return res.status(400).json({ message: "Invalid Data" });
  }
  const availabilities = searchWithTables
    .map((tab) => {
      const seatsSum = tab.tables.reduce((sum, table) => {
        return sum + table.seats;
      }, 0);

      return {
        time: tab.time,
        available: seatsSum >= parseInt(partySize as string),
      };
    })

    .filter((availability) => {
      const afterOpening =
        new Date(`${day}T${availability.time}`) >=
        new Date(`${day}T${restaurant.open_time}`);
      const beforeClosing =
        new Date(`${day}T${availability.time}`) <=
        new Date(`${day}T${restaurant.close_time}`);

      return afterOpening && beforeClosing;
    });

  return res.status(200).json(availabilities);
}
