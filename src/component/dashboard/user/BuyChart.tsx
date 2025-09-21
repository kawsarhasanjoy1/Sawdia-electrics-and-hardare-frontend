"use client";
import { useGetUserYearlyBuyQuery } from "@/redux/api/orderApi";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

interface YearlyData {
  month: string;
  totalAmount: number;
  totalOrders: number;
  totalProducts: number;
}

const UserYearlyChart = () => {
  const { data } = useGetUserYearlyBuyQuery(undefined);
  const chartData: YearlyData[] = data?.data;
  console.log(chartData)
  return (
    <div className="w-full h-96 p-4 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Last 12 Months Purchase Stats
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" angle={-45} textAnchor="end" height={70} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalAmount"
            stroke="#8884d8"
            name="Total Tk"
          />
          <Line
            type="monotone"
            dataKey="totalOrders"
            stroke="#82ca9d"
            name="Orders"
          />
          <Line
            type="monotone"
            dataKey="totalProducts"
            stroke="#ff7300"
            name="Products"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserYearlyChart;
