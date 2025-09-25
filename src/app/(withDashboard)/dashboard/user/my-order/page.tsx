"use client";
import { useGetUserOrdersQuery } from "@/redux/api/orderApi";
import ReusableTable from "@/component/dashboard/ui/ReusableTable";
import Pagination from "@/component/ui/Paginate/Pagination";
import { useState } from "react";
import SearchBox from "@/component/dashboard/ui/SearchInput";
import { toast } from "react-toastify";
import { Copy } from "lucide-react";

const money = (n?: number, currency = "BDT") =>
  typeof n === "number"
    ? n.toLocaleString(undefined, { style: "currency", currency })
    : "—";

const paymentFromStatus = (status?: string) => {
  const s = String(status || "").toUpperCase();
  if (s === "PAID") return "SUCCESS";
  if (s === "FAILED" || s === "CANCELLED") return "FAILED";
  return "PENDING";
};

const MyOrderPage = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    page: 1,
    limit: 10,
  });
  const { data } = useGetUserOrdersQuery(undefined);
  const order = data?.data?.data;
  const meta = data?.data?.meta;

  const columns = [
    {
      key: "transactionId",
      header: "Transaction ID",
      render: (row: any) => (
        <div className=" flex items-center gap-1">
          <span className="font-mono text-sm">{row.transactionId}</span>
          <button
            title="Copy"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(row.transactionId || "");
                toast.success("Transaction ID copied");
              } catch {
                toast.info("Copy not available");
              }
            }}
          ><Copy size={14} /></button>
        </div>
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
      render: (row: any) => (
        <span className=" text-center">{row.products?.length || 0}</span>
      ),
    },
    {
      key: "totalPayable",
      header: "Total (৳)",
      render: (row: any) => <span>{money(row.totalPayable, "BDT")}</span>,
    },

    {
      key: "status",
      header: "Order Status",
      render: (row: any) => (
        <span
          className={
            row.status === "PAID"
              ? "text-green-600"
              : row.status === "CANCELLED" || row.status === "FAILED"
              ? "text-red-600"
              : "text-yellow-600"
          }
        >
          {paymentFromStatus(row.status)}
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
      render: (row: any) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—",
    },
  ];

  return (
    <div className="space-y-4">
      <div className=" flex justify-between">
        <h1 className="text-xl font-semibold">My Orders</h1>
        <SearchBox
          onChange={(e) => setFilters((prev) => ({ ...prev, searchTerm: e }))}
          value={filters?.searchTerm}
          placeholder="Enter your transactionId"
        />
      </div>
      <div>
        <ReusableTable columns={columns} data={order} />
      </div>
      <div className=" mt-5">
        <Pagination
          totalPages={meta?.totalPage}
          page={filters.page}
          onPageChange={(e) => setFilters((prev) => ({ ...prev, e }))}
        />
      </div>
    </div>
  );
};

export default MyOrderPage;
