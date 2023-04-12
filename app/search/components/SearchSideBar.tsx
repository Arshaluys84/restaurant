import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";
import { SearchParamsType } from "../page";

export default function SearchSideBar({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: SearchParamsType
}) {
  const prices = [
    {
      id: 1,
      price: PRICE.CHEAP,
      label: "$",
      className: "border w-full text-reg font-light rounded-l p-2 text-center",
    },
    {
      id: 12,
      price: PRICE.REGULAR,
      label: "$$",
      className: "border text-center w-full text-reg font-light p-2",
    },
    {
      id: 123,
      price: PRICE.EXPENSIVE,
      label: "$$$",
      className: "border w-full text-reg font-light p-2 rounded-r text-center",
    },
  ];
  return (
    <div className="w-1/5 ">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) => (
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, city: location.name },
            }}
            className="font-light text-reg capitalize"
            key={location.id}
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, cuisine: cuisine.name },
            }}
            className="font-light text-reg capitalize"
            key={cuisine.id}
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({price, label, className, id})=><Link href={{
            pathname: "/search",
            query: {
              ...searchParams,
              price
            }
          }} key={id} className={className}>{label}</Link>)}
          {/* <button className="border w-full text-reg font-light rounded-l p-2">
            $
          </button>
          <button className="border-r border-t border-b w-full text-reg font-light p-2">
            $$
          </button>
          <button className="border-r border-t border-b w-full text-reg font-light p-2 rounded-r">
            $$$
          </button> */}
        </div>
      </div>
    </div>
  );
}
