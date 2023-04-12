import { Item, PrismaClient } from "@prisma/client";
import Menu from "../components/Menu";
import RestaurantNavBar from "../components/RestaurantNavBar";

const prisma = new PrismaClient()

const fetchMenuItems =async (slug:string):Promise<Item[]> =>{
  const menu = await prisma.restaurant.findUnique({
    where:{
      slug
    },
    select: {
      items: true
    }
  })
  if(!menu){
    throw new Error("something was wrong")
  }
  return menu.items
}

export default async function RestaurantMenu({ params }: {params: { slug: string }}) {
   const menu = await fetchMenuItems(params.slug)
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar slug={params.slug}/>
      <Menu menu={menu}/>
    </div>
  );
}
