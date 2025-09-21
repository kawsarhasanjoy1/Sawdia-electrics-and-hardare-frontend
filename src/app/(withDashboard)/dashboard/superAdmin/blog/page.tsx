"use client";
import { toast } from "react-toastify";
import { Edit, Trash2 } from "lucide-react";
import { formatDate } from "@/utils/formateDate";
import ReusableTable from "@/component/dashboard/ui/ReusableTable";
import {
  useDeleteBlogMutation,
  useGetBlogQuery,
  useTogglePublishMutation,
} from "@/redux/api/blogApi";
import { useRestoreBrandMutation } from "@/redux/api/brandApi";
import NotFound from "@/app/not-found";
import SearchBox from "@/component/dashboard/ui/SearchInput";
import { useState } from "react";
import Loading from "@/app/loading";

const BlogTable = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    page: 1,
    limit: 10,
  });
  const { data, isFetching } = useGetBlogQuery(filters);
  const [softDelete] = useDeleteBlogMutation();
  const [restoreBlog] = useRestoreBrandMutation();
  const [togglePublish, { isLoading }] = useTogglePublishMutation();

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
      const res = await restoreBlog(id).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const res = await togglePublish(id).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  const columns = [
    {
      key: "title",
      header: "Title",
      render: (row: any) => (
        <span className="font-semibold text-gray-800">{row.title}</span>
      ),
    },

    {
      key: "author",
      header: "Author",
      render: (row: any) => (
        <>
          {row.userId?.name || "Unknown"} <br />
          <span className="text-sm text-gray-500">{row.userId?.email}</span>
        </>
      ),
    },
    {
      key: "isPublished",
      header: "Published",
      render: (row: any) => (
        <button
          onClick={() => handleToggle(row?._id)}
          disabled={isLoading}
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.isPublished
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          {row.isPublished ? "Yes" : "No"}
        </button>
      ),
    },
    {
      key: "viewsCount",
      header: "Views",
      render: (row: any) => <span>{row.viewsCount}</span>,
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
            disabled={row?.isDeleted === false}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium
              bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition ${
                row?.isDeleted ? "cursor-pointer" : ""
              }`}
          >
            Restore
          </button>
          <button
            onClick={() => handleToDeleted(row._id)}
            disabled={row?.isDeleted === true}
            className={`p-2 rounded-lg hover:bg-red-100 text-red-600 ${
              row?.isDeleted ? "" : "cursor-pointer"
            }`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 shadow-xl rounded-2xl bg-white">
      <div className="  mb-6 text-gray-800 flex justify-between items-center gap-6 md:gap-0 pt-6">
        <p className="text-2xl font-bold">{"Products"}</p>
        <SearchBox
          placeholder="Search blog"
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
      ) : data?.data?.data?.length > 0 ? (
        <ReusableTable columns={columns} data={data?.data?.data || []} />
      ) : (
        <NotFound message="Blog those not exist at this moment " />
      )}
    </div>
  );
};

export default BlogTable;
