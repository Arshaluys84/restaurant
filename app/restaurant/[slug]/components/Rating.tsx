import { Review } from "@prisma/client";
import React from "react";
import { calculateReviewsRatingAverage, determineWithS } from "../../../../utils/CalculateReviewsRatingAverage";
import Stars from "../../../components/Stars";

export default function Rating({ reviews }: { reviews: Review[]}) {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={reviews} />
        <p className="text-reg ml-3">{calculateReviewsRatingAverage(reviews)}</p>
      </div>
      <div>
        <p className="text-reg ml-4">{reviews.length} Review{determineWithS(reviews)}</p>
      </div>
    </div>
  );
}
