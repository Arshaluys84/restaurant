import Link from "next/link";
import { calculateReviewsRatingAverage, reviewsRatingDesc } from "../../../utils/CalculateReviewsRatingAverage";
import Price from "../../components/Price";
import Stars from "../../components/Stars";
import { LocationSearchParamsType } from "../page";

export default function RestaurantCard({ restaurant }: {restaurant: LocationSearchParamsType }){
 
  const { name, price, location, cuisine, main_image, slug, reviews } = restaurant
  
    return(
        <div className="border-b flex pb-5">
              <img
                src={`${main_image}`}
                alt={`${main_image}`}
                className="w-44 rounded" 
              />
              <div className="pl-5">
                <h2 className="text-3xl">{name}</h2>
                <div className="flex items-start">
                  <div className="flex mb-2">
                    <Stars  reviews={reviews}/>
                  </div>
                  <p className="ml-2 text-sm">{reviewsRatingDesc(calculateReviewsRatingAverage(reviews) as number) }</p>
                </div>
                <div className="mb-9">
                  <div className="font-light flex text-reg">
                    <Price price={price}/>
                    <p className="mr-4 capitalize">{cuisine.name}</p>
                    <p className="mr-4 capitalize">{location.name}</p>
                  </div>
                </div>
                <div className="text-red-600">
                  <Link href={`/restaurant/${slug}`} >View more information</Link>
                </div>
              </div>
            </div>
    )
}