"use client";
import { useState } from "react";
import Image from "next/image";
import { Rating as ReactRating } from "@smastrom/react-rating";
import ReviewDisplay from "../Review/ReviewDesplay";
import ReviewForm from "../Review/ReviewForm";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/api/features/cartSlice";
import { TProduct } from "@/interface/global";
import { toast } from "react-toastify";

interface ProductDetailsProps {
  product: any;
}
const ProductDetails = ({ product }: ProductDetailsProps) => {
  const dispatch = useAppDispatch();
  const [currentImage, setCurrentImage] = useState(0);
  const handleAddToCart = (product: TProduct) => {
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
    <div className="container mx-auto py-12 px-4">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Carousel Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Main Image */}
          <div className="relative w-full h-[28rem] rounded-2xl overflow-hidden shadow-lg">
            {product?.images?.[currentImage] ? (
              <Image
                src={product.images[currentImage]}
                alt={product?.name || "Product Image"}
                fill
                className="object-cover rounded-2xl"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
                <span className="text-gray-400">No Image Available</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 overflow-x-auto py-1">
            {product?.images?.map((img: string, idx: number) => (
              <motion.div
                key={idx}
                className={`w-20 h-20 flex-shrink-0 rounded-lg cursor-pointer border-2 ${
                  currentImage === idx
                    ? "border-indigo-500"
                    : "border-transparent"
                } overflow-hidden shadow-sm relative`}
                whileHover={{ scale: 1.05 }}
                onClick={() => setCurrentImage(idx)}
              >
                <Image
                  quality={100}
                  priority
                  src={img}
                  alt={`thumb-${idx}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900">{product?.name}</h1>
          <p className="text-gray-600 text-lg">{product?.description}</p>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-indigo-600">
              ৳{product?.price}
            </span>
            {product?.discountPrice && (
              <span className="text-lg line-through text-gray-400">
                ৳{product?.discountPrice}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span>Stock: {product?.stock}</span>
            <span>SKU: {product?.sku || "-"}</span>
            <span>Warranty: {product?.warranty || "-"}</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="font-semibold text-gray-700">Rating:</span>
            <div className="flex items-center gap-2">
              <ReactRating
                style={{ maxWidth: 120 }}
                value={product?.ratingAverage || 0}
                readOnly
              />
              <span className="text-gray-500">
                ({product?.ratingQuantity || 0})
              </span>
            </div>
          </div>

          <button
            onClick={() => handleAddToCart(product)}
            className="mt-6 w-full md:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md shadow-lg transition-all"
          >
            🛒 Add to Cart
          </button>
        </motion.div>
      </div>

      {/* Reviews Section */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

        {/* Add Review Form */}
        <ReviewForm product={product} />

        {/* Display Reviews */}
        <div className="mt-8">
          <ReviewDisplay product={product} />
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
