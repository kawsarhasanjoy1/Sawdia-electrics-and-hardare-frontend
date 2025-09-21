"use client";
import { Trash2 } from "lucide-react";
import {
  useGetUserOrdersQuery,
  useRestoreOrderMutation,
  useSoftDeletedOrderMutation,
} from "@/redux/api/orderApi";
import ReusableTable from "@/component/dashboard/ui/ReusableTable";
import { toast } from "react-toastify";

const MyOrderPage = () => {
  const { data } = useGetUserOrdersQuery({});
  const [softDeleteOrder] = useSoftDeletedOrderMutation();
  const [restoreOrder] = useRestoreOrderMutation();

  const handleToDeleted = async (id: string) => {
    try {
      const res = await softDeleteOrder(id).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  const handleToRestore = async (id: string) => {
    try {
      const res = await restoreOrder(id).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  const columns = [
    {
      key: "tran_id",
      header: "Transaction ID",
      render: (row: any) => (
        <span className="font-semibold text-sm text-shadow-2xs">
          {row.tran_id}
        </span>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (row: any) => (
        <>
          {row.userId?.name || "Unknown"} <br />
          <span className="text-sm text-gray-500">
            {row.userId?.email || "—"}
          </span>
        </>
      ),
    },
    {
      key: "totalProducts",
      header: "Products",
      render: (row: any) => <span>{row.products?.length || 0}</span>,
    },
    {
      key: "totalAmount",
      header: "Total (৳)",
      render: (row: any) => <span>{row.totalAmount}</span>,
    },
    {
      key: "paymentStatus",
      header: "Payment",
      render: (row: any) => (
        <span
          className={
            row.paymentStatus === "success" ? "text-green-600" : "text-red-600"
          }
        >
          {row.paymentStatus}
        </span>
      ),
    },
    {
      key: "status",
      header: "Order Status",
      render: (row: any) => (
        <span
          className={row.status === "paid" ? "text-green-600" : "text-red-600"}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "shippingAddress",
      header: "Shipping",
      render: (row: any) => (
        <span>
          {row.shippingAddress?.postcode}
          <br />
          {row.shippingAddress?.line1} <br />
          {row.shippingAddress?.city}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      render: (row: any) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleToRestore(row._id)}
            disabled={!row.isDeleted}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium bg-yellow-100 text-yellow-700 hover:bg-yellow-200 ${
              row.isDeleted ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
            }`}
          >
            Restore
          </button>
          <button
            onClick={() => handleToDeleted(row._id)}
            disabled={row.isDeleted}
            className={`p-2 rounded-lg hover:bg-red-100 text-red-600 ${
              row.isDeleted ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
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
      <ReusableTable columns={columns} data={data?.data} />
    </div>
  );
};

export default MyOrderPage;
