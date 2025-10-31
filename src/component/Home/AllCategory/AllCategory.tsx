"use client";
import Link from "next/link";

import { 
  FaDesktop, 
  FaLaptop, 
  FaTv, 
  FaMobileAlt, 
  FaBatteryFull, 
  FaTabletAlt, 
  FaCamera, 
  FaGamepad, 
  FaHeadphones, 
  FaPlug 
} from "react-icons/fa";

export const categories = [
  { name: "Desktop", icon: FaDesktop },
  { name: "Laptot", icon: FaLaptop }, // assuming "Laptot" is intentional spelling
  { name: "Monitor", icon: FaTv },
  { name: "Phone", icon: FaMobileAlt },
  { name: "Power", icon: FaBatteryFull },
  { name: "Tablet", icon: FaTabletAlt },
  { name: "Camera", icon: FaCamera },
  { name: "Gaming", icon: FaGamepad },
  { name: "Accessories", icon: FaHeadphones },
  { name: "Tv", icon: FaTv },
];


const AllCategory = () => {
  // const { data, isError } = useGetAllCategoryQuery(undefined);
  // const parentCategory = data?.data?.map(
  //   (item: Record<string, any>) => item.name
  // );

  return (
    <div className=" w-full">
      <h1 className=" font-bold text-xl mb-4">Categories</h1>
      <div className=" md:flex justify-between items-center gap-6 opacity-90 border border-blue-500 p-5 rounded-md bg-blue-100 grid grid-cols-2">
        {categories.map((Item, idx) => {
          return (
            <Link
              href={`categories?category=${Item?.name}`}
              key={idx}
              className=" flex flex-col justify-center items-center
        "
            >
              <Item.icon size={50} className=" w-6 h-6 md:w-12 md:h-12" />
              <p className=" text-[10px] md:text-sm text-center font-bold">
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
