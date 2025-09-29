"use client";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import SearchBox from "@/component/dashboard/ui/SearchInput";
import ProductCard from "@/component/Home/Products/ProductCard";
import Filtering from "@/component/ui/filtaring/Filtaring";
import Pagination from "@/component/ui/Paginate/Pagination";
import { useGetAllProductQuery } from "@/redux/api/productsApi";
import { useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";

const Products = () => {
  const params = useSearchParams();
  const parentC = params.get("parentCategory") as any;
  const [filters, setFilters] = useState({
    searchTerm: "",
    parentCategory: "",
    category: "",
    brand: "",
    page: 1,
    limit: 15,
  });
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      parentCategory: parentC,
    }));
  }, [parentC]);
  const query = useMemo(() => ({ ...filters }), [filters]);
  const { data: productData, isLoading } = useGetAllProductQuery(query);
  const products = productData?.data?.data || [];
  const meta = productData?.data?.meta;
  const totalPages = meta?.totalPage || 1;

  return (
    <div className="mx-auto py-10 w-full">
      <div className="w-full flex justify-center items-center mb-8">
        <SearchBox
          placeholder="Search product"
          className="md:w-3/12 w-full border px-4 py-2 border-gray-400 focus:outline-none rounded-md"
          value={filters?.searchTerm}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              searchTerm: e,
            }))
          }
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-2">
          <Filtering filters={filters} setFilters={setFilters} />
        </div>

        <div className="col-span-12 md:col-span-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
          {isLoading ? (
            <div className="col-span-full h-full flex justify-center items-center py-20">
              <Loading fullScreen={false} text="Loading products..." />
            </div>
          ) : products?.length === 0 ? (
            <div className="col-span-full flex justify-center items-center py-20 w-full">
              <NotFound message="No products found." />
            </div>
          ) : (
            products?.map((item: any) => (
              <ProductCard key={item._id} product={item} />
            ))
          )}
        </div>
      </div>

      <div>
        <Pagination
          page={filters.page}
          totalPages={totalPages}
          onPageChange={(newPage) =>
            setFilters((prev) => ({ ...prev, page: newPage }))
          }
        />
      </div>
    </div>
  );
};

export default Products;
