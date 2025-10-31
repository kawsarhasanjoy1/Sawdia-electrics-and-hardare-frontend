"use client";
import { useGetAllProductQuery } from "@/redux/api/productsApi";
import ProductCard from "./ProductCard";
import { TProduct } from "@/interface/global";

const Product = () => {
  const { data } = useGetAllProductQuery({ limit: 12 });
  const products = data?.data?.data;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4">
      {products?.map((product: TProduct, idx: number) => (
        <ProductCard product={product} key={idx} />
      ))}
    </div>
  );
};

export default Product;
