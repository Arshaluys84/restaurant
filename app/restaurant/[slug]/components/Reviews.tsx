import { Review } from "@prisma/client";
import { determineWithS } from "../../../../utils/CalculateReviewsRatingAverage";
import ReviewRating from "./ReviewRating";

export default function Reviews({ reviews } : {reviews: Review[]}) {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
        What {reviews.length} { !determineWithS(reviews) ? "person" : "people"} are saying
      </h1>
     {reviews.map((review) => <ReviewRating key={review.id} review={review} />)}
    </div>
  );
}
