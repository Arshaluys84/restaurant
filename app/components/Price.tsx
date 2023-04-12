import { PRICE } from "@prisma/client";

export default function Price({ price }: { price: PRICE }) {
  const { CHEAP, REGULAR } = PRICE;
  const renderPrice = () => {
    return price === CHEAP ? (
      <>
        <span className="text-gray-400">$$</span>
      </>
    ) : price === REGULAR ? (
      <>
        <span>$</span>
        <span className="text-gray-400">$</span>
      </>
    ) : (
      <span>$$</span>
    );
   
  };
  return <p className="flex mr-3">$${renderPrice()}</p>;
}
