"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { toast } from "react-toastify";
import { Share2, Heart, Copy } from "lucide-react";

import ReviewDisplay from "../Review/ReviewDesplay";
import ReviewForm from "../Review/ReviewForm";

import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/api/features/cartSlice";
import { useGetCouponsQuery } from "@/redux/api/couponApi";
import type { TProduct } from "@/interface/global";
import { Delivared } from "./Delivared";
import { useGetSaveFavouriteProductQuery, useSaveFavouriteProductMutation } from "@/redux/api/productsApi";

type ProductDetailsProps = {
  product: TProduct;
  onToggleFavorite?: (productId: string, next: boolean) => Promise<void> | void; // optional backend call
};

const currency = (n?: number) =>
  typeof n === "number" ? `৳${n.toFixed(0)}` : "৳0";

const isColorKey = (k: string) => /color|colour/i.test(k);

const VariantChip: React.FC<{ k: string; v: any }> = ({ k, v }) => {
  const maybeColor = String(v || "").trim();
  const swatch =
    isColorKey(k) ||
    /^#([0-9a-f]{3}){1,2}$/i.test(maybeColor) ||
    /^[a-z]+$/i.test(maybeColor);

  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2">
      <span className="text-xs uppercase tracking-wide text-zinc-500">{k}</span>
      <div className="flex items-center gap-2">
        {swatch ? (
          <span
            className="inline-block h-4 w-4 rounded-full border"
            style={{ background: maybeColor }}
            title={maybeColor}
          />
        ) : null}
        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          {String(v ?? "-")}
        </span>
      </div>
    </div>
  );
};

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  onToggleFavorite,
}) => {
  const dispatch = useAppDispatch();
const [saveProduct] = useSaveFavouriteProductMutation();
 const { data } = useGetSaveFavouriteProductQuery(undefined);
   const favourite = data?.data || [];
   const isFavourite = favourite?.some(
     (item: any) => item?.productId?._id === product?._id
   );

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


  const { data: CouponData } = useGetCouponsQuery({ isActive: true, limit: 1 });
  const coupons = CouponData?.data?.data;
  const activeCoupon =
    coupons?.[0] &&
    coupons?.[0]?.isActive === true &&
    new Date(coupons[0]?.expiryDate) > new Date()
      ? coupons?.[0]
      : null;

  const [currentImage, setCurrentImage] = React.useState(0);
  const [qty, setQty] = React.useState(1);
  const [fav, setFav] = React.useState<boolean>(false);

  React.useEffect(() => {
    setFav(Boolean(product?.favouriteCount && product.favouriteCount > 0));
  }, [product?.favouriteCount]);

  const handleAddToCart = (p: TProduct) => {
    const priceToUse = activeCoupon
      ? p.price
      : p.discountPrice
      ? p.discountPrice
      : p.price;

    dispatch(
      addToCart({
        _id: p._id as string,
        name: p.name,
        price: priceToUse,
        images: p.images,
        quantity: qty,
      })
    );
    toast.success(`${p.name} added to cart`);
  };

 
  const handleShare = async () => {
    try {
      const url = window.location.href;
      if (navigator.share) {
        await navigator.share({ title: product.name, text: product.description, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied!");
      }
    } catch {
      toast.error("Share failed");
    }
  };

  const handleCopySku = async () => {
    if (!product?.sku) return;
    try {
      await navigator.clipboard.writeText(product.sku);
      toast.success("SKU copied");
    } catch {
      toast.error("Copy failed");
    }
  };

  // Price block
  const price = product?.price ?? 0;
  const hasDiscount = !!product?.discountPrice;
  const finalPrice = activeCoupon
    ? price
    : hasDiscount
    ? product.discountPrice!
    : price;

  const brandName =
    (product as any)?.brandId?.name || (product as any)?.brand?.name || "-";
  const parentCatName =
    (product as any)?.parentCategory?.name || (product as any)?.parentCategoryName || "-";
  const subCatName =
    (product as any)?.categoryId?.name || (product as any)?.categoryName || "-";

  const variants = (product?.variants as Record<string, any>) || {};

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-5 text-sm text-zinc-500">
        <span className="hover:text-zinc-700">{parentCatName}</span>
        <span className="px-2">/</span>
        <span className="hover:text-zinc-700">{subCatName}</span>
        <span className="px-2">/</span>
        <span className="text-zinc-700 font-medium">{product?.name}</span>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="relative h-[28rem] w-full overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-xl">
            {product?.images?.[currentImage] ? (
              <Image
                src={product.images[currentImage]}
                alt={product?.name || "Product Image"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="grid h-full place-content-center text-zinc-400">
                No Image
              </div>
            )}

            {/* Top-right actions */}
            <div className="absolute right-3 top-3 flex gap-2">
              <button
                onClick={() => handleTofavourite(product?._id)}
                className={`rounded-full p-2 shadow-md transition cursor-pointer ${
                  isFavourite ? "bg-rose-500 text-white" : "bg-white/90 text-zinc-700"
                }`}
                title="Wishlist"
              >
                <Heart className="h-5 w-5" />
              </button>
              <button
                onClick={handleShare}
                className="rounded-full bg-white/90 p-2 text-zinc-700 shadow-md transition cursor-pointer"
                title="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Thumbs */}
          <div className="flex gap-3 overflow-x-auto">
            {product?.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 ${
                  currentImage === idx
                    ? "border-indigo-500"
                    : "border-transparent"
                }`}
                title={`Image ${idx + 1}`}
              >
                <Image src={img} alt={`thumb-${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right: Info */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {product?.name}
            </h1>
            {product?.sku ? (
              <button
                onClick={handleCopySku}
                className="flex items-center gap-1 rounded-full border px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800"
                title="Copy SKU"
              >
                <Copy className="h-4 w-4" /> {product.sku}
              </button>
            ) : null}
          </div>

          <p className="text-zinc-600 dark:text-zinc-300">{product?.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <ReactRating style={{ maxWidth: 120 }} value={product?.ratingAverage || 0} readOnly />
            <span className="text-sm text-zinc-500">
              {product?.ratingAverage?.toFixed(1) ?? "0.0"} • {product?.ratingQuantity || 0} reviews
            </span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              {product?.stock > 0 ? "In stock" : "Out of stock"}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              Brand: {brandName}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              Warranty: {product?.warranty || "-"}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-4">
            <span className="text-3xl font-extrabold text-indigo-600">
              {currency(finalPrice)}
            </span>
            {!activeCoupon && hasDiscount ? (
              <span className="text-lg text-zinc-400 line-through">
                {currency(price)}
              </span>
            ) : null}
            {activeCoupon ? (
              <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                Coupon Active
              </span>
            ) : null}
          </div>

      
          {Object.keys(variants).length > 0 ? (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Specifications
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {Object.entries(variants).map(([k, v]) => (
                  <VariantChip key={k} k={k} v={v} />
                ))}
              </div>
            </div>
          ) : null}

       
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex h-10 items-center overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700">
              <button
                className="h-full px-3 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                className="h-full w-14 border-x border-zinc-200 text-center dark:border-zinc-700 dark:bg-zinc-900"
                value={qty}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  if (!Number.isNaN(v) && v > 0) setQty(v);
                }}
                inputMode="numeric"
              />
              <button
                className="h-full px-3 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={() => handleAddToCart(product)}
              disabled={product?.stock <= 0}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-indigo-700 disabled:opacity-60"
            >
              🛒 Add to Cart
            </button>
          </div>

        <Delivared/>
          
        </motion.div>
      </div>

      {/* Reviews */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="mb-6 text-2xl font-bold">Customer Reviews</h2>

        <ReviewForm product={product} />

        <div className="mt-8">
          <ReviewDisplay product={product} />
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetails;
