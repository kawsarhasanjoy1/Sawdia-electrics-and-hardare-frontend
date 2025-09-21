"use client";
import SalesRechart from "@/component/dashboard/superAdmin/SalesRechart";
import { useGetStatsQuery } from "@/redux/api/orderApi";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import {
  FaBox,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaStar,
} from "react-icons/fa";
import OnlineUserList from "@/component/Home/OnlineUser/OnlineUser";
import UserTable from "@/component/dashboard/superAdmin/UserTable";
import { PendingOrder } from "@/component/dashboard/superAdmin/OrderTable";
import LowStockProductsTable from "@/component/dashboard/superAdmin/LowStockProductsTable";

const DashboardSuperAdminHome = () => {
  const { data } = useGetStatsQuery(undefined);
  const { user } = useAppSelector((store) => store.auth) as any;
  const stats = data?.data;

  const summaryData = [
    {
      title: "Total Products",
      value: stats?.totalProduct ?? 0,
      icon: <FaBox className="text-blue-500 w-6 h-6" />,
    },
    {
      title: "Total Orders",
      value: stats?.totalOrder ?? 0,
      icon: <FaShoppingCart className="text-green-500 w-6 h-6" />,
    },
    {
      title: "Total Users",
      value: stats?.totalUser ?? 0,
      icon: <FaUsers className="text-yellow-500 w-6 h-6" />,
    },
    {
      title: "Revenue ($)",
      value: stats?.revenue?.[0]?.totalRevenue ?? 0,
      icon: <FaDollarSign className="text-red-500 w-6 h-6" />,
    },
    {
      title: "Total Reviews",
      value: stats?.totalReview ?? 0,
      icon: <FaStar className="text-purple-500 w-6 h-6" />,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryData?.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6 flex items-center justify-between hover:shadow-xl transition"
          >
            <div>
              <p className="text-gray-500 text-sm">{item?.title}</p>
              <p className="text-2xl font-bold text-gray-800">{item?.value}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-full">{item?.icon}</div>
          </div>
        ))}
      </div>

      <div>
        <SalesRechart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href={`${user?.role}/products/create-product`}
          className="bg-gradient-to-r from-blue-500 to-blue-400 p-6 rounded-xl shadow text-white hover:scale-105 transform transition"
        >
          <h3 className="text-lg font-semibold mb-2">Add New Product</h3>
          <p className="text-sm opacity-90">
            Create and manage new products in your inventory.
          </p>
        </Link>
        <Link
          href={`${user?.role}/orders`}
          className="bg-gradient-to-r from-green-500 to-green-400 p-6 rounded-xl shadow text-white hover:scale-105 transform transition"
        >
          <h3 className="text-lg font-semibold mb-2">View Orders</h3>
          <p className="text-sm opacity-90">
            Check all recent orders and update their status.
          </p>
        </Link>
        <Link
          href={`${user?.role}/users`}
          className="bg-gradient-to-r from-purple-500 to-purple-400 p-6 rounded-xl shadow text-white hover:scale-105 transform transition"
        >
          <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
          <p className="text-sm opacity-90">
            View, edit, and manage registered users on the platform.
          </p>
        </Link>
      </div>
      <div className=" mt-10 space-y-10 ">
        <div className=" bg-gray-50 ">
          <h1 className="text-2xl font-bold mb-4">Recent User</h1>
          <UserTable />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">All pending orders</h1>
          <PendingOrder/>
        </div>
        <div className=" bg-gray-50 ">
          <h1 className="text-2xl font-bold mb-4">Low stock product</h1>
          <LowStockProductsTable/>
        </div>
        <div>
          <OnlineUserList />
        </div>
      </div>
    </div>
  );
};

export default DashboardSuperAdminHome;
