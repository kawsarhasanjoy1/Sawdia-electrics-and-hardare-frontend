"use client";
import { useGetSaveFavouriteProductQuery } from "@/redux/api/productsApi";
import Image from "next/image";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

const FavouriteList = () => {
  const { data, isLoading } = useGetSaveFavouriteProductQuery(undefined);
  const favourite = data?.data || [];

  if (isLoading) {
    return <p className="text-center py-10">Loading favourites...</p>;
  }

  if (favourite?.length === 0) {
    return <p className="text-center py-10 text-gray-500">No favourites added yet ❤️</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-6">
      {favourite?.map((item: any) => (
        <div
          key={item?._id}
          className="relative group rounded-xl border bg-white shadow hover:shadow-lg transition overflow-hidden"
        >
          <Link href={`/products/${item?.productId?._id}`}>
            {/* Product Image */}
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={
                  item?.productId?.images?.[0] ||
                  "https://via.placeholder.com/300x200.png?text=No+Image"
                }
                alt={item?.productId?.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Info */}
            <div className="p-3 flex flex-col gap-1">
              <h3 className="font-medium text-gray-800 line-clamp-2">
                {item?.productId?.name}
              </h3>
              <p className="text-lg font-bold text-gray-900">
                ${item?.productId?.price?.toFixed(2)}
              </p>
            </div>
          </Link>

          {/* Favourite Icon (always active) */}
          <div className="absolute top-3 right-3">
            <FaHeart className="text-red-500 text-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavouriteList;
