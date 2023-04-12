import { PrismaClient, Cuisine, PRICE, Location, Review } from "@prisma/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

const prisma = new PrismaClient();

export interface LocationSearchParamsType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  slug: string;
  price: PRICE;
  reviews: Review[]
}

export interface SearchParamsType { 
  city?: string,
  cuisine?: string,
  price?: PRICE
}

const fetchRestaurantsBySearch = async (
  searchParams: SearchParamsType
): Promise<LocationSearchParamsType[]> => {
  const select = {
    id: true,
    name: true,
    cuisine: true,
    location: true,
    price: true,
    slug: true,
    main_image: true,
    reviews: true
  };
  const where:any = {}
  if(searchParams.city){
    const location ={
      name:{
        equals: searchParams.city.toLowerCase()
      }
    }
    where.location = location
  }
  if(searchParams.cuisine){
    const cuisine ={
      name:{
        equals: searchParams.cuisine.toLowerCase()
      }
    }
    where.cuisine = cuisine
  }
  if(searchParams.price){
    const price ={
      
        equals: searchParams.price
     
    }
    where.price = price
  }
 
  return await prisma.restaurant.findMany({
    where,
    select,
  });
};

const fetchLocations = async () => {
  return await prisma.location.findMany()
}

const fetchCuisines = async () => {
  return await prisma.cuisine.findMany()
}
export default async function Search({
  searchParams,
}: {
  searchParams: { city?: string, cuisine?:string, price?:PRICE };
}) {
  const restaurants = await fetchRestaurantsBySearch(
    searchParams
  );
  
  const locations = await fetchLocations()

  const cuisines = await fetchCuisines()

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar locations={locations} cuisines={cuisines} searchParams={searchParams} />
        {!restaurants.length ? (
          <p className="w-5/6">Sorry, there is no restaurant in that area. </p>
        ) : (
          <div className="w-5/6">
            {restaurants.map((rest) => (
              <RestaurantCard key={rest.id} restaurant={rest} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
