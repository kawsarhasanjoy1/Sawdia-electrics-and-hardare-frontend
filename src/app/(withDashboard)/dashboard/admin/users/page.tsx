"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import Image from "next/image";

import ReusableTable from "@/component/dashboard/ui/ReusableTable";
import SearchBox from "@/component/dashboard/ui/SearchInput";
import Pagination from "@/component/ui/Paginate/Pagination";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";

import {
  useDeleteUserMutation,
  useGetUserQuery,
  useRestoreUserMutation,
  useUserStatusUpMutation,
} from "@/redux/api/userApi";

const UsersPage = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    role: "user",
    page: 1,
    limit: 10,
  });

  const { data, isFetching } = useGetUserQuery(filters);

  const [upStatus] = useUserStatusUpMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [restoreUser] = useRestoreUserMutation();

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await upStatus({ id, status: newStatus }).unwrap();
      if (res?.success) toast.success("User status updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  const handleToRestore = async (id: string) => {
    try {
      const res = await restoreUser(id).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  const handleToDeleted = async (id: string) => {
    try {
      const res = await deleteUser(id).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  const columns = [
    {
      key: "avatar",
      header: "Avatar",
      render: (row: any) =>
        row?.avatar ? (
          <Image
            width={100}
            height={100}
            src={row.avatar}
            alt={row.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <span className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-gray-500">
            {row?.name?.[0]}
          </span>
        ),
    },
    {
      key: "name",
      header: "Name",
      render: (row: any) => <span>{row?.name}</span>,
    },
    {
      key: "email",
      header: "Email",
      render: (row: any) => <span>{row?.email}</span>,
    },
    {
      key: "role",
      header: "Role",
      render: (row: any) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
          {row?.role}
        </span>
      ),
    },
    {
      key: "isStatus",
      header: "Status",
      render: (row: any) => (
        <select
          defaultValue={row?.isStatus}
          className="px-2 py-1 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
          onChange={(e) => handleStatusChange(row._id, e.target.value)}
        >
          <option value="isActive">Active</option>
          <option value="Blocked">Block</option>
        </select>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (row: any) => (
        <span>{new Date(row?.createdAt).toLocaleDateString()}</span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (row: any) => (
        <div className="flex gap-2">
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
    <div className="bg-gray-50 p-6">
      <div className="  mb-6 text-gray-800 flex justify-between items-center gap-6 md:gap-0 pt-6">
        <p className="text-2xl font-bold">{"Users"}</p>
        <SearchBox
          placeholder="Search user"
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
        <ReusableTable columns={columns} data={data?.data?.data} />
      ) : (
        <NotFound message="No users found at this moment" />
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

export default UsersPage;
