import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Form from "./components/Form";
import Header from "./components/Header";

const prisma = new PrismaClient()

const fetchReservedRestaurant = async (slug: string) =>{
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    }
  })
  if(!restaurant){
    notFound()
  }
  return restaurant
}
export default async function Reservation({ params:{ slug }, searchParams: { date, partySize }}: {params: {slug: string}, searchParams: { date: string; partySize: string}}) {

  const restaurant = await fetchReservedRestaurant(slug)
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header image={restaurant.main_image} name={ restaurant.name} date={date} partySize={partySize}/>
        <Form date={date} partySize={partySize} slug={slug} />
      </div>
    </div>
  );
}
