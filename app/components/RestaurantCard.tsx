import Link from "next/link";
import { determineWithS } from "../../utils/CalculateReviewsRatingAverage";
import { RestaurantType } from "../page";
import Price from "./Price";
import Stars from "./Stars";

interface RestaurantCardProps {
  restaurant: RestaurantType
}

export default function RestaurantCard({restaurant}: RestaurantCardProps) {
   const { name, price, location, cuisine, main_image, slug, reviews } = restaurant
   
  return (
    <div className="w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer">
      <Link href={`/restaurant/${slug}`}>
        <img
          src={`${main_image}`}
          alt={`${main_image}`}
          className="w-full h-36"
        />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{name}</h3>
          <div className="flex items-start">
            <Stars reviews={reviews}/>
            <p className="ml-2">{reviews.length} review{determineWithS(reviews)}</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{cuisine.name}</p>
            <Price price={price} />
            <p>{location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 9 times today</p>
        </div>
      </Link>
    </div>
  );
}
