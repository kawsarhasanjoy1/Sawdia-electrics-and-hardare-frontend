"use client";
import { useGetAllProductQuery } from "@/redux/api/productsApi";
import NewArrivalCard from "./NewArrivalCard";
import CommonTitle from "@/component/shared/CommonTitle";

const FeaturedProducts = () => {
  const { data } = useGetAllProductQuery([]);
  const products = data?.data?.data;
  return (
    <section className=" w-full bg-gray-400 md:px-10 md:py-5 px-2 py-4 rounded-md">
      <CommonTitle
        title={{ a: "New ", b: "Arrivals" }}
        description="Check out the latest electronics and hardware products added to our collection. Stay ahead with new trends and deals"
        classN="text-white"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.slice(0, 8)?.map((product: Record<string, any>) => (
          <NewArrivalCard key={product?._id} product={product}/>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
