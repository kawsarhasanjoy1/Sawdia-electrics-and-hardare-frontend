"use client";

import { toast } from "react-toastify";
import { Edit, Trash2 } from "lucide-react";
import ReusableTable from "@/component/dashboard/ui/ReusableTable";
import { formatDate } from "@/utils/formateDate";
import {
  useDeletedProductMutation,
  useGetAllProductQuery,
  useRestoreProductMutation,
} from "@/redux/api/productsApi";
import NotFound from "@/app/not-found";
import SearchBox from "@/component/dashboard/ui/SearchInput";
import { useState } from "react";
import Loading from "@/app/loading";
import Pagination from "@/component/ui/Paginate/Pagination";
import Link from "next/link";

const ProductTable = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    page: 1,
    limit: 10,
  });
  const { data, isLoading } = useGetAllProductQuery(filters);
  const product = data?.data?.data;
  const [softDelete] = useDeletedProductMutation();
  const [restoreProduct] = useRestoreProductMutation();

  const handleToDeleted = async (id: string) => {
    try {
      const res = await softDelete(id).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  const handleToRestore = async (id: string) => {
    try {
      const res = await restoreProduct(id).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  const columns = [
    {
      key: "name",
      header: "Product Name",
      render: (row: any) => <span className="font-semibold">{row.name}</span>,
    },
    {
      key: "category",
      header: "Category",
      render: (row: any) => <span>{row.categoryId?.name || "N/A"}</span>,
    },
    {
      key: "brand",
      header: "Brand",
      render: (row: any) => <span>{row.brandId?.name || "N/A"}</span>,
    },
    {
      key: "price",
      header: "Price",
      render: (row: any) => <span>৳{row.price}</span>,
    },
    {
      key: "stock",
      header: "Stock",
      render: (row: any) => <span>{row.stock}</span>,
    },
    {
      key: "warranty",
      header: "Warranty",
      render: (row: any) => <span>{row.warranty || "-"}</span>,
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (row: any) => <span>{formatDate(row.createdAt)}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: any) => (
        <div className="flex gap-2">
          <Link href={`products/update-product/${row._id}`} className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600">
            <Edit size={18} />
          </Link>
          <button
            onClick={() => handleToRestore(row._id)}
            disabled={!row.isDeleted}
            className={`px-3 py-1 rounded-lg text-sm font-medium bg-yellow-100 text-yellow-700 hover:bg-yellow-200 ${
              row.isDeleted ? "cursor-pointer" : "opacity-50"
            }`}
          >
            Restore
          </button>
          <button
            onClick={() => handleToDeleted(row._id)}
            disabled={row.isDeleted}
            className={`p-2 rounded-lg hover:bg-red-100 text-red-600 ${
              row.isDeleted ? "opacity-50" : "cursor-pointer"
            }`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className=" bg-white">
      <div className="  mb-6 text-gray-800 flex justify-between items-center gap-6 md:gap-0 pt-6">
        <p className="text-2xl font-bold">{"Products"}</p>
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
      {isLoading ? (
        <Loading />
      ) : product?.length > 0 ? (
        <ReusableTable columns={columns} data={product || []} />
      ) : (
        <NotFound />
      )}
      <div className="mt-4 flex justify-center">
        <Pagination
          page={filters.page}
          totalPages={data?.data?.meta?.totalPage || 1}
          onPageChange={(newPage) =>
            setFilters((prev) => ({ ...prev, page: newPage }))
          }
        />
      </div>
    </div>
  );
};

export default ProductTable;
