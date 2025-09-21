
import { useGetMonthlySalesQuery } from "@/redux/api/orderApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

 

const SalesRechart = () => {
     const { data: sales } = useGetMonthlySalesQuery(undefined);
  const chartData =
    sales?.data?.map((item: any) => ({
      month: item.month,
      sales: item.totalSales,
      orders: item.orderCount,
    })) || [];

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Monthly Sales
      </h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              formatter={(value, name) =>
                name === "sales" ? [`$${value}`, "Revenue"] : [value, "Orders"]
              }
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />

            <Line
              type="monotone"
              dataKey="orders"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesRechart;
