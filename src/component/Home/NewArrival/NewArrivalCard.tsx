"use client";

import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/api/features/cartSlice";
import { toast } from "react-toastify";

const NewArrivalCard = ({ product }: { product: Record<string, any> }) => {
  const price = product?.price;
  const discountPrice = product?.discountPrice;
  const discountPercent = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  const dispatch = useAppDispatch();

  const handleAddToCart = (product: any) => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        images: product.images,
        quantity: 1,
      })
    );
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div
      className="
        relative overflow-hidden rounded-[28px]
        bg-gradient-to-br from-gray-50 to-gray-100
        shadow-[0_0_20px_rgba(0,0,0,0.08)]
        group
      "
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-[28px] p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 blur-[2px] transition duration-500" />

      {/* Image */}
      <div className="relative h-72 overflow-hidden rounded-t-[26px]">
        <Image
          src={product?.images?.[0]}
          alt={product?.name}
          fill
          sizes="400px"
          className="object-cover object-center md:group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        {discountPrice && (
          <span className="absolute top-4 left-4 px-4 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 shadow-lg">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Info Panel */}
      <div
        className="
          absolute bottom-0 left-0 right-0
          translate-y-0 md:translate-y-16   /* ✅ always visible on < md */
          md:group-hover:translate-y-0
          transition-all duration-500
        "
      >
        <div
          className="
            mx-4 mb-4 p-4
            rounded-2xl backdrop-blur-xl bg-white/90
            shadow-xl
          "
        >
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
            {product?.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-400 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                fill={i < (product?.rating || 0) ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
            ))}
            <span className="text-gray-500 text-sm ml-1">
              ({product?.rating || 0})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-3">
            {discountPrice ? (
              <>
                <span className="text-2xl font-extrabold text-indigo-600">
                  {discountPrice}৳
                </span>
                <span className="line-through text-gray-400 text-sm">
                  {price}৳
                </span>
              </>
            ) : (
              <span className="text-2xl font-extrabold text-indigo-600">
                {price}৳
              </span>
            )}
          </div>

          {/* Button */}
          <button
            onClick={() => handleAddToCart(product)}
            className="
              mt-4 w-full flex items-center justify-center gap-2
              bg-gradient-to-r from-indigo-600 to-purple-600
              hover:from-purple-700 hover:to-indigo-700
              text-white py-2 rounded-full font-semibold shadow-md
              transition duration-300 cursor-pointer
            "
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalCard;
