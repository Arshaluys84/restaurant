import { PrismaClient, Review } from "@prisma/client";
import { notFound } from "next/navigation";
import Description from "./components/Description";
import Images from "./components/Images";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";

const prisma = new PrismaClient()

interface RestaurantDetails {
    slug: string;
    id: number;
    name: string;
    images: string[];
    description: string;
    reviews: Review[];
    open_time: string;
    close_time: string
}

interface RestaurantDetailsType {
  params: {
    slug:string
  }
}
const fetchRestaurantBySlug = async (slug:string):Promise<RestaurantDetails> =>{
  const restaurant = await prisma.restaurant.findUnique({
    where:{
      slug
    },
    select:{
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true
    }
  })
  if(!restaurant){
    notFound()
  }
  return restaurant
}
export default async function RestaurantDetails({ params }: RestaurantDetailsType) {
  const { slug } = params
  
  const restaurant =await fetchRestaurantBySlug(slug)

  const { name, description, images, reviews, open_time, close_time } = restaurant
    
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={slug}/>
        <Title title={name}/>
        <Rating reviews={reviews}/>
        <Description description={description} />
        <Images images={images}/>
        <Reviews reviews={reviews}/>
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard openTime={open_time} closeTime={close_time} slug={slug}/>
      </div>
    </>
  );
}
