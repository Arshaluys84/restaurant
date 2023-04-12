export default function Header({ slug }: { slug: string }){
  const restaurantName = slug.split("-")
  restaurantName[restaurantName.length-1] = `(${restaurantName[restaurantName.length-1]})`  
  const restaurantNameOrig = restaurantName.join(" ")
    return(
        <div className="h-96 overflow-hidden">
        <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
          <h1 className="text-7xl text-white capitalize text-shadow text-center">
            {restaurantNameOrig}
          </h1>
        </div>
      </div>
    )
}