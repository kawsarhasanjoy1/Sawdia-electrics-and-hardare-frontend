"use client";
import UserYearlyChart from "@/component/dashboard/user/BuyChart";
import { useGetUserStatsQuery } from "@/redux/api/orderApi";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { FaBox, FaDollarSign, FaShoppingCart, FaStar } from "react-icons/fa";

const UserDashboardHome = () => {
  const { data } = useGetUserStatsQuery(undefined);
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
      title: "Revenue ($)",
      value: stats?.revenue,
      icon: <FaDollarSign className="text-red-500 w-6 h-6" />,
    },
    {
      title: "Total Reviews",
      value: stats?.totalReview ?? 0,
      icon: <FaStar className="text-purple-500 w-6 h-6" />,
    },
  ];
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome to dashboard
      </h1>

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
        <UserYearlyChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
        <Link
          href={`${user?.role}/my-order`}
          className="bg-gradient-to-r from-green-500 to-green-400 p-6 rounded-xl shadow text-white hover:scale-105 transform transition"
        >
          <h3 className="text-lg font-semibold mb-2">View Orders</h3>
          <p className="text-sm opacity-90">
            Check all recent orders and update their status.
          </p>
        </Link>
        <Link
          href={`${user?.role}/my-review`}
          className="bg-gradient-to-r from-blue-500 to-blue-400 p-6 rounded-xl shadow text-white hover:scale-105 transform transition"
        >
          <h3 className="text-lg font-semibold mb-2">View review</h3>
          <p className="text-sm opacity-90">
            Create and manage new products in your inventory.
          </p>
        </Link>
        <Link
          href={`${user?.role}/my-profile`}
          className="bg-gradient-to-r from-purple-500 to-purple-400 p-6 rounded-xl shadow text-white hover:scale-105 transform transition"
        >
          <h3 className="text-lg font-semibold mb-2">My profile</h3>
          <p className="text-sm opacity-90">
            View, edit, and manage registered users on the platform.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboardHome;
