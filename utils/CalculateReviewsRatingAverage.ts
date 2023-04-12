import { Review } from "@prisma/client";

export const calculateReviewsRatingAverage = (reviews: Review[]) => {
  if (!reviews.length) return 0;

  return (reviews.reduce((a, i) => a + i.rating, 0) / reviews.length).toFixed(
    1
  );
};

export const reviewsRatingDesc = (reviewAverage: number) => {
  if (reviewAverage > 4) return "Awesome";
  else if (reviewAverage <= 4 && reviewAverage > 3) return "Good";
  else if (reviewAverage <= 3 && reviewAverage > 0) return "Average";
  else return "";
};

export const determineWithS = <T>(array: T[]) => {
  return array.length === 1 ? "" : "s";
};
