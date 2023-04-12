import { Inter } from "@next/font/google";
import { PrismaClient, Location, PRICE, Cuisine, Review } from "@prisma/client";

import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";

const inter = Inter({ subsets: ["latin"] });

const prisma = new PrismaClient()


export interface RestaurantType {
  id: number
  name: string
  main_image: string
  price: PRICE
  location: Location
  cuisine: Cuisine
  slug: string
  reviews: Review[]
}
const fetchRestaurants = async ():Promise<RestaurantType[]> =>{
  const restaurants = await prisma.restaurant.findMany({
    select:{
      id: true,
      name: true,
      main_image: true,
      price: true,
      location: true,
      cuisine: true,
      slug: true,
      reviews: true
    }
  });
  return restaurants;
}
export default async function Home() {
   const restaurants = await fetchRestaurants()
  
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map(rest => (<RestaurantCard restaurant = {rest} key={rest.id}/> ))}
        
      </div>
    </main>
  );
}
