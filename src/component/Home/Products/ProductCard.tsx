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
    new Date(coupons[0]?.expiryDate) < new Date()
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
      })
    );
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="group relative w-full h-96 max-w-sm rounded-md bg-gradient-to-br from-white to-gray-50 overflow-hidden shadow-lg hover:shadow-2xl border transition-all duration-500 hover:scale-[1.03]">
      <Link href={`/products/${product?._id}`}>
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={
              product?.images?.[0] ||
              "https://media.istockphoto.com/id/1364620309/photo/iphone-13-pro.jpg"
            }
            alt={product?.name}
            fill
            className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="md:p-4 p-2">
          <h3 className="text-base font-semibold text-gray-800 line-clamp-2 group-hover:text-green-600 transition">
            {product?.name}
          </h3>
          <div className="mt-2 flex items-center justify-between gap-1">
            <div className="md:text-lg text-md md:font-bold font-semibold text-green-600">
              <div className="flex items-center gap-4">
                {activeCoupon ? (
                  <>
                    <span className="text-xl text-green-500">
                      ৳{product?.price.toFixed(0)}
                    </span>
                  </>
                ) : product?.discountPrice ? (
                  <>
                    <span
                      className={`${
                        product?.discountPrice ? "text-green-500 text-xl" : ""
                      }`}
                    >
                      ৳{product?.discountPrice?.toFixed(0)}
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-bold text-green-600">
                    ৳{product?.price?.toFixed(0)}
                  </span>
                )}
              </div>
              {/* ${product?.price.toFixed(0)} */}
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  size={14}
                  className={
                    i < product?.rating ? "text-yellow-400" : "text-gray-300"
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute top-3 right-3 flex flex-col gap-3 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500">
        <button
          onClick={() => handleTofavourite(product?._id)}
          className="p-3 rounded-full bg-white/70 backdrop-blur-md shadow hover:scale-110 transition"
        >
          {isFavourite ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-red-500 text-lg" />
          )}
        </button>
        <button
          onClick={() => handleAddToCart(product)}
          className="p-3 rounded-full bg-white/70 backdrop-blur-md shadow hover:scale-110 transition"
        >
          <FaShoppingCart className="text-green-600 text-lg" />
        </button>
      </div>
      {/* Hover Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500">
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 text-center">
          <button
            onClick={() => handleAddToCart(product)}
            className="w-full font-semibold tracking-wide hover:scale-[1.02] transition"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
