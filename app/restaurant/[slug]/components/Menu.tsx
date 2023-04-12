import { Item } from "@prisma/client";
import React from "react";
import MenuCard from "./MenuCard";

export default function Menu({ menu }: { menu: Item[] }) {
 
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        {!menu.length ? (
          <>
            <div className="flex flex-wrap justify-between">
              <p>The Restaurant did not provide menu</p>
            </div>
          </>
        ) : (
          <div className="flex flex-wrap justify-between">
            {menu.map((item) => (
              <MenuCard key={item.id} menuItem={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
