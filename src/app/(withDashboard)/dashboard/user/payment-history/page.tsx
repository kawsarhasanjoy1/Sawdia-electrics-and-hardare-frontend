"use client";

import { Copy } from "lucide-react";
import ReusableTable from "@/component/dashboard/ui/ReusableTable";
import { useGetUserPaymentsQuery } from "@/redux/api/paymentApi2";
import { toast } from "react-toastify";
import Pagination from "@/component/ui/Paginate/Pagination";
import { useState } from "react";
import SearchBox from "@/component/dashboard/ui/SearchInput";

const money = (n?: number, currency = "BDT") =>
  typeof n === "number"
    ? new Intl.NumberFormat(undefined, { style: "currency", currency }).format(
        n
      )
    : "—";

const badge = (s?: string) => {
  const x = String(s || "").toUpperCase();
  if (x === "VALID") return "bg-green-100 text-green-700";
  if (x === "FAILED" || x === "CANCELLED") return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
};

const MyPaymentHistory = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    page: 1,
    limit: 10,
  });
  const { data, isLoading } = useGetUserPaymentsQuery(filters);
  const payments = data?.data?.data ?? [];
  const meta = data?.data?.meta;
  const columns = [
    {
      key: "transactionId",
      header: "Transaction ID",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm break-all">
            {row.transactionId}
          </span>
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(row.transactionId || "");
                toast.success("Transaction ID copied");
              } catch {
                toast.info("Copy not available");
              }
            }}
            className="p-1 rounded hover:bg-gray-100"
            title="Copy Txn ID"
          >
            <Copy size={14} />
          </button>
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (row: any) => {
        const user = row?.userId;
        if (user && typeof user === "object") {
          return (
            <>
              {user?.name || "Unknown"} <br />
              <span className="text-sm text-gray-500">
                {user?.email || "—"}
              </span>
            </>
          );
        }
        return <span className="font-mono text-xs">{user || "—"}</span>;
      },
    },
    {
      key: "amount",
      header: "Total (৳)",
      render: (row: any) => <span>{money(row.amount, row.currency)}</span>,
    },
    {
      key: "status",
      header: "Payment Status",
      render: (row: any) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${badge(
            row.status
          )}`}
        >
          {row.status}
        </span>
      ),
    },
    {
      key: "bankTranId",
      header: "Bank Ref",
      render: (row: any) => (
        <span title={row.bankTranId} className="font-mono text-xs">
          {row.bankTranId || "—"}
        </span>
      ),
    },
    {
      key: "valId",
      header: "valId",
      render: (row: any) => (
        <span title={row.valId} className="font-mono text-xs">
          {row.valId || "—"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      render: (row: any) =>
        row.createdAt ? new Date(row.createdAt).toLocaleString() : "—",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-10">
      <div className=" flex justify-between">
        <h1 className="text-2xl font-bold mb-4">My Payment History</h1>
        <SearchBox
          onChange={(e) => setFilters((prev) => ({ ...prev, searchTerm: e }))}
          value={filters?.searchTerm}
          placeholder="Enter your transactionId"
        />
      </div>
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse h-20 bg-white rounded-xl shadow-sm"
            />
          ))}
        </div>
      ) : (
        <ReusableTable columns={columns} data={payments} />
      )}
      <div>
        <Pagination
          onPageChange={(e) => setFilters((prev) => ({ ...prev, e }))}
          page={filters.page}
          totalPages={meta?.totalPage}
        />
      </div>
    </div>
  );
};

export default MyPaymentHistory;
