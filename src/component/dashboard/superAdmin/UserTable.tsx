'use client'
import {
  useDeleteUserMutation,
  useGetUserQuery,
  useRestoreUserMutation,
  useUserStatusUpMutation,
} from "@/redux/api/userApi";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import ReusableTable from "../ui/ReusableTable";

const UserTable = () => {
  const [upUserStatus] = useUserStatusUpMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [restoreUser] = useRestoreUserMutation();
  const { data: userData } = useGetUserQuery({ sort: "createdAt" });
  const user = userData?.data?.data;
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await upUserStatus({ id: id, status: newStatus }).unwrap();
      if (res?.success) {
        toast.success("User status updated successful");
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  const handleToRestoreUser = async (e: FieldValues) => {
    try {
      const res = await restoreUser(e).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  const handleToDeletedUser = async (e: FieldValues) => {
    try {
      const res = await deleteUser(e).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  const userColumns = [
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
            onClick={() => handleToRestoreUser(row._id)}
            disabled={!row.isDeleted}
            className={`px-3 py-1 rounded-lg text-sm font-medium bg-yellow-100 text-yellow-700 hover:bg-yellow-200 ${
              row.isDeleted ? "cursor-pointer" : "opacity-50"
            }`}
          >
            Restore
          </button>
          <button
            onClick={() => handleToDeletedUser(row._id)}
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
    <div>
      <ReusableTable columns={userColumns} data={user} />
    </div>
  );
};

export default UserTable;
