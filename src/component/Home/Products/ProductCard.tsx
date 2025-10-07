"use client";

import { FaStar, FaRegHeart, FaShoppingCart, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { TProduct } from "@/interface/global";
import { toast } from "react-toastify";
import Link from "next/link";
import {
  useGetSaveFavouriteProductQuery,
  useSaveFavouriteProductMutation,
} from "@/redux/api/productsApi";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/api/features/cartSlice";
import { useGetCouponsQuery } from "@/redux/api/couponApi";

const ProductCard = ({ product }: { product: TProduct }) => {
  const dispatch = useAppDispatch();
  const [saveProduct] = useSaveFavouriteProductMutation();
  const { data } = useGetSaveFavouriteProductQuery(undefined);
  const favourite = data?.data || [];
  const isFavourite = favourite?.some(
    (item: any) => item?.productId?._id === product?._id
  );

  const { data: CouponData } = useGetCouponsQuery({ isActive: true, limit: 1 });
  const coupons = CouponData?.data?.data;
  const activeCoupon =
    coupons?.[0] &&
    coupons?.[0]?.isActive === true &&
    new Date(coupons[0]?.expiryDate) > new Date()
      ? coupons?.[0]
      : "";

  const handleTofavourite = async (id: string) => {
    try {
      const res = await saveProduct(id).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  const handleAddToCart = (product: TProduct) => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: activeCoupon
          ? product?.price
          : product?.discountPrice
          ? product?.discountPrice
          : product?.price,
        images: product.images,
        quantity: 1,
        variants: product?.variants,
      })
    );
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="group md:relative w-full h-[420px] max-w-sm bg-white/80 rounded-xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 backdrop-blur-md hover:scale-[1.03]">
      <Link href={`/products/${product?._id}`}>
        <div className="relative md:h-56 h-36 w-full overflow-hidden">
          <Image
            src={
              product?.images?.[0] ||
              "https://media.istockphoto.com/id/1364620309/photo/iphone-13-pro.jpg"
            }
            alt={product?.name}
            fill
            className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
          />
        </div>

        <div className="p-4">

          <h3 className="md:text-lg text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-green-600 transition">
            {product?.name}
          </h3>

          <div className="mt-2 text-sm text-gray-600 flex flex-wrap md:gap-4 gap-1">
            <span>
              <strong>Brand:</strong> {product?.brandId?.name || "N/A"}
            </span>
            <span>
              <strong>Stock:</strong>{" "}
              {product?.stock > 0 ? product.stock : "Out of Stock"}
            </span>
           
          </div>


          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-[2px]">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  size={16}
                  className={
                    i < product?.ratingAverage ? "text-yellow-400" : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product?.ratingQuantity || 0})
            </span>
          </div>

          {/* Pricing */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex flex-col">
              {activeCoupon ? (
                <span className="text-green-600 text-lg font-bold">
                  ৳{product?.price.toFixed(0)}
                </span>
              ) : product?.discountPrice ? (
                <>
                  <span className="text-green-600 text-lg font-bold">
                    ৳{product?.discountPrice?.toFixed(0)}
                  </span>
                  <span className="line-through text-sm text-gray-400">
                    ৳{product?.price?.toFixed(0)}
                  </span>
                </>
              ) : (
                <span className="text-green-600 text-lg font-bold">
                  ৳{product?.price?.toFixed(0)}
                </span>
              )}
            </div>

            {product?.discountPrice && (
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                Save ৳{(product.price - product.discountPrice).toFixed(0)}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="absolute top-3 right-3 flex flex-col gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
        <button
          onClick={() => handleTofavourite(product?._id)}
          className="p-2 rounded-full bg-white/80 shadow backdrop-blur-md hover:scale-110 transition"
        >
          {isFavourite ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-red-500 text-lg" />
          )}
        </button>

        <button
          onClick={() => handleAddToCart(product)}
          className="p-2 rounded-full bg-white/80 shadow backdrop-blur-md hover:scale-110 transition"
        >
          <FaShoppingCart className="text-green-600 text-lg" />
        </button>
      </div>

      <div className="absolute md:bottom-0 bottom-[11%] left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500">
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 text-center">
          <button
            onClick={() => handleAddToCart(product)}
            className="w-full font-semibold tracking-wide animate-pulse hover:scale-[1.02] transition"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
