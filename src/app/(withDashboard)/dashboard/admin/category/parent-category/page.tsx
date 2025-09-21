"use client";
import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { Edit, RotateCcw, Trash2 } from "lucide-react";

import ReusableTable from "@/component/dashboard/ui/ReusableTable";
import SearchBox from "@/component/dashboard/ui/SearchInput";
import Pagination from "@/component/ui/Paginate/Pagination";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";

import {
  useDeleteParentCategoryMutation,
  useGetAllParentCategoryQuery,
  useRestoreParentCategoryMutation,
} from "@/redux/api/parentCategoryApi";
import { formatDate } from "@/utils/formateDate";

const ParentCategoryTable = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    page: 1,
    limit: 10,
  });

  const query = useMemo(() => ({ ...filters }), [filters]);
  const { data, isFetching } = useGetAllParentCategoryQuery(query);
  const categories = data?.data?.data || [];
  const [softDelete] = useDeleteParentCategoryMutation();
  const [restoreCategory] = useRestoreParentCategoryMutation();

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
      const res = await restoreCategory(id).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (row: any) => <span className="font-semibold">{row.name}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            !row.isDeleted
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.isDeleted ? "Inactive" : "Active"}
        </span>
      ),
    },
    {
      key: "createdBy",
      header: "Created By",
      render: (row: any) => (
        <div className="flex flex-col space-y-0.5">
          <span>{row.createdBy?.name || "Unknown"}</span>
          <span className="text-sm text-gray-500">{row.createdBy?.email}</span>
        </div>
      ),
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
        <div className="flex items-center justify-center gap-2">
          <button className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600">
            <Edit size={18} />
          </button>
          <button
            onClick={() => handleToRestore(row._id)}
            disabled={!row.isDeleted}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium
              bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition ${
                row.isDeleted ? "cursor-pointer" : "opacity-50"
              }`}
          >
            <RotateCcw size={16} /> Restore
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
    <div className="p-6 bg-white shadow-xl rounded-2xl">
      <div className="  mb-6 text-gray-800 flex justify-between items-center gap-6 md:gap-0 pt-6">
        <p className="text-2xl font-bold">{"Parent category "}</p>
        <SearchBox
          placeholder="Search parent category "
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

      {isFetching ? (
        <Loading />
      ) : categories?.length > 0 ? (
        <ReusableTable columns={columns} data={categories} />
      ) : (
        <NotFound message="No parent categories exist at this moment" />
      )}

      <div className="mt-4 flex justify-center">
        <Pagination
          page={filters?.page}
          totalPages={data?.data?.meta?.totalPage || 1}
          onPageChange={(newPage) =>
            setFilters((prev) => ({ ...prev, page: newPage }))
          }
        />
      </div>
    </div>
  );
};

export default ParentCategoryTable;
