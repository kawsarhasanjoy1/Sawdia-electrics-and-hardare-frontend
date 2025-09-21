"use client";
import { useGetUserQuery } from "@/redux/api/userApi";
import Image from "next/image";

export default function ActiveUsersTable() {
  const { data } = useGetUserQuery({ isOnline: true });

  return (
    <div className="p-4 bg-white rounded shadow overflow-x-auto">
      <h3 className="font-bold mb-4">Active Users</h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Avatar</th>
            <th className="border-b p-2">Name</th>
            <th className="border-b p-2">Email</th>
            <th className="border-b p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.data?.map((user: any) => (
            <tr key={user?._id} className="border-b">
              <td className="p-2">
                {user.avatar ? (
                  <Image
                    width={200}
                    height={200}
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-300 rounded-full" />
                )}
              </td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    user.isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></span>
                {user.isOnline ? "Online" : "Offline"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
