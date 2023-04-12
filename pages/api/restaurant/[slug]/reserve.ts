import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import findAvailableTables from "../../../../services/restaurants/findAvailableTables";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {

    const { bookerEmail, bookerFirstName, bookerLastName, bookerPhone, bookerOccasion, bookerRequest } = req.body
     
    const { slug, day, time, partySize } = req.query as {
      slug: string;
      day: string;
      time: string;
      partySize: string;
    };

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        tables: true,
        open_time: true,
        close_time: true,
        id: true
      },
    });

    if (!restaurant) {
      return res.status(401).json({ errorMessage: "Restaurant not found" });
    }

    if (
      new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
      new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
    ) {
      return res.status(401).json({ errorMessage: "Restaurant is closed" });
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

    const availableTable = searchWithTables.find((t) => {
      return t.date.toISOString() === new Date(`${day}T${time}`).toISOString();
    });

    const tables: {
      [key: number]: number[];
      // 2: number[];
      // 4: number[]
    } = {
      // 2: [],
      // 4: []
    };

    availableTable?.tables.forEach((t) => {
      if (!tables[t.seats]) {
        tables[t.seats] = [];
      }
      // if(t.seats === 2){
      //     tables[2].push(t.id)
      // }else{
      //     tables[4].push(t.id)
      // }
      tables[t.seats].push(t.id);
    });

    const bookedTables: number[] = [];
    let remainingSeats = parseInt(partySize);

    while (remainingSeats > 0) {
      if (remainingSeats >= 3) {
        if (tables[4].length) {
          bookedTables.push(tables[4][0]);
          tables[4].shift();
          remainingSeats = remainingSeats - 4;
        } else {
          bookedTables.push(tables[2][0]);
          tables[2].shift();
          remainingSeats = remainingSeats - 2;
        }
      } else {
        if (tables[2].length) {
          bookedTables.push(tables[2][0]);
          tables[2].shift();
          remainingSeats = remainingSeats - 2;
        } else {
          bookedTables.push(tables[4][0]);
          tables[4].shift();
          remainingSeats = remainingSeats - 4;
        }
      }
    }

    const booking = await prisma.booking.create({
        data: {
            booking_time: new Date(`${day}T${time}`),
            number_of_people: parseInt(partySize),
            booker_first_name: bookerFirstName,
            booker_last_name: bookerLastName,
            booker_occasion: bookerOccasion,
            booker_phone: bookerPhone,
            booker_request: bookerRequest,
            booking_email: bookerEmail,
            restaurant_id: restaurant.id
        }
    })

    const bookingsOnTableData = bookedTables.map((table_id) =>{
        return {
            table_id,
            booking_id: booking.id
        }
    })
    await prisma.bookingOnTables.createMany({
        data: bookingsOnTableData
    })
    return res.json({ bookedTables });
  }
}
