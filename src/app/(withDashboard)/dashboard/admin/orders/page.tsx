"use client";
import ReusableTable from "@/component/dashboard/ui/ReusableTable";
import SearchBox from "@/component/dashboard/ui/SearchInput";
import Pagination from "@/component/ui/Paginate/Pagination";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/api/orderApi";
import { useState } from "react";
import { toast } from "react-toastify";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "pending" },
  { value: "PAID", label: "Paid" },
  { value: "FAILED", label: "Failed" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "REFUNDED", label: "refunded" },
];
const OrdersPage = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    page: 1,
    limit: 10,
  });
  const { data, isLoading, isError, error } = useGetOrdersQuery(filters);
  const orders = data?.data?.data;
  const [updateStatus] = useUpdateOrderStatusMutation();

  const handleToStatus = async (transactionId: string, status: string) => {
    try {
      const res = await updateStatus({
        transactionId,
        status: status as any,
      }).unwrap();
      if (res?.success) toast.success(res?.message || "Status updated");
      else toast.info("Updated");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update");
    }
  };

  const columns = [
    {
      key: "transactionId",
      header: "Transaction ID",
      render: (row: any) => (
        <span className="font-mono">{row?.transactionId}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <select
          defaultValue={row?.status}
          className="px-2 py-1 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
          onChange={(e) => handleToStatus(row?.transactionId, e.target.value)}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label.toUpperCase()}
            </option>
          ))}
        </select>
      ),
    },
    {
      key: "totalPayable",
      header: "Total Payable",
      render: (row: any) => (
        <span>${row?.totalPayable?.toFixed?.(2) ?? row?.totalPayable}</span>
      ),
    },
    {
      key: "buyer",
      header: "Buyer",
      render: (row: any) => {
        const user = row?.user ?? row?.userId; // supports either normalized 'user' or populated 'userId'
        return (
          <div className="flex flex-col">
            <span className="text-sm">{user?.name ?? "—"}</span>
            <span className="text-xs text-gray-600">{user?.email ?? ""}</span>
          </div>
        );
      },
    },
    {
      key: "products",
      header: "Products",
      render: (row: any) => (
        <div className="flex flex-col text-sm">
          {row?.products?.length ? (
            row.products?.map((p: any) => (
              <span key={p?._id || p?.name}>
                {p?.name} {p?.quantity ? `× ${p.quantity}` : ""}
              </span>
            ))
          ) : (
            <span>—</span>
          )}
        </div>
      ),
    },
    {
      key: "shippingAddress",
      header: "Shipping Address",
      render: (row: any) => (
        <div className="flex flex-col text-sm">
          <span>Post Code: {row?.shippingAddress?.postcode}</span>
          <span>Address: {row?.shippingAddress?.line1}</span>
          <span>City/District: {row?.shippingAddress?.city}</span>
          <span>Contact: {row?.shippingAddress?.phone}</span>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <p className="text-sm text-gray-600">Loading orders…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <p className="text-sm text-red-600">
          Failed to load orders:{" "}
          {(error as any)?.data?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-6">
       <div className=" flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <SearchBox
          onChange={(e) => setFilters((prev) => ({ ...prev, searchTerm: e }))}
          value={filters?.searchTerm}
          placeholder="Enter your transactionId"
        />
      </div>
      <ReusableTable columns={columns} data={orders} />
      <div className="mt-6 flex items-center justify-center">
        <Pagination
          onPageChange={(newPage) =>
            setFilters((prev) => ({ ...prev, page: newPage }))
          }
          page={filters?.page}
          totalPages={data?.data?.meta?.totalPage}
        />
      </div>
    </div>
  );
};

export default OrdersPage;
