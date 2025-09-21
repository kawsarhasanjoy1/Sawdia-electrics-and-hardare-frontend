"use client";
import Link from "next/link";

import {
  FaMobileAlt,
  FaLaptop,
  FaTv,
  FaTools,
  FaGamepad,
  FaLightbulb,
  FaPlug,
  FaHammer,
  FaFire,
} from "react-icons/fa";
import { GiKitchenKnives } from "react-icons/gi";

export const categories = [
  { name: "Electronics", icon: FaFire },
  { name: "Mobile Accessories", icon: FaMobileAlt },
  { name: "Computers & Laptops", icon: FaLaptop },
  { name: "Televisions & Home Entertainment", icon: FaTv },
  { name: "Kitchen Appliances", icon: GiKitchenKnives },
  { name: "Power Tools", icon: FaTools },
  { name: "Hardware & Construction", icon: FaHammer },
  { name: "Lighting & Electrical", icon: FaLightbulb },
  { name: "Cables & Wires", icon: FaPlug },
  { name: "Gaming & Consoles", icon: FaGamepad },
];

const AllCategory = () => {
  // const { data, isError } = useGetAllCategoryQuery(undefined);
  // const parentCategory = data?.data?.map(
  //   (item: Record<string, any>) => item.name
  // );

  return (
    <div className=" w-full">
      <h1 className=" font-bold text-xl mb-4">Categories</h1>
      <div className=" md:flex justify-center items-center gap-6 opacity-90 border border-blue-500 p-5 rounded-md bg-blue-100 grid grid-cols-2">
        {categories.map((Item, idx) => {
          return (
            <Link
              href={"#"}
              key={idx}
              className=" flex flex-col justify-center items-center
        "
            >
              <Item.icon size={50} className=" w-6 h-6 md:w-12 md:h-12" />
              <p className=" text-[10px] md:text-sm text-center">
                {Item?.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AllCategory;
