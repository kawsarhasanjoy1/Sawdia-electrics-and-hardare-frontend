"use client";

import ReusableTable from "@/component/dashboard/ui/ReusableTable";
import { toast } from "react-toastify";
import { Copy } from "lucide-react";
import { useState } from "react";
import Pagination from "@/component/ui/Paginate/Pagination";
import {
  useGetPaymentsQuery,
  useUpdatePaymentStatusMutation,
} from "@/redux/api/paymentApi2";

const STATUSES = ["INITIATED", "VALID", "FAILED", "CANCELLED"] as const;

const money = (n?: number, currency = "BDT") =>
  typeof n === "number"
    ? new Intl.NumberFormat(undefined, { style: "currency", currency }).format(
        n
      )
    : "—";

const AdminPaymentsPage = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useGetPaymentsQuery(filters);
  const [updateStatus] = useUpdatePaymentStatusMutation();

  const payments = data?.data?.data;
  const meta = data?.data?.meta;
  const onChangeStatus = async (id: string, status: string) => {
    try {
      const res = await updateStatus({ id, status: status as any }).unwrap();
      if (res?.success) toast.success(res?.message || "Status updated");
    } catch (e: any) {
      toast.error(e?.data?.message || "Update failed");
    }
  };

  const columns = [
    {
      key: "transactionId",
      header: "Txn ID",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs md:text-sm break-all">
            {row.transactionId}
          </span>
          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(row.transactionId || "");
                toast.success("Copied");
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
      key: "orderId",
      header: "Order",
      render: (row: any) => (
        <span className="font-mono text-xs  rounded-md">
          {row.orderId?.products?.map((item: any) => {
            return <span key={item?._id}>{item?.name}</span>;
          })}
        </span>
      ),
    },
    {
      key: "userId",
      header: "User",
      render: (row: any) => (
        <div className=" flex flex-col">
          <span className="font-mono text-xs">{row.userId?.name}</span>
          <span className="font-mono text-xs">{row.userId?.email}</span>
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (row: any) => (
        <span>{money(row.amount, row.currency || "BDT")}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <select
            defaultValue={row.status}
            onChange={(e) => onChangeStatus(row.transactionId, e.target.value)}
            className="px-2 py-1 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      ),
    },
    {
      key: "bankTranId",
      header: "Bank Ref",
      render: (row: any) => (
        <span className="font-mono text-xs">{row.bankTranId || "—"}</span>
      ),
    },
    {
      key: "valId",
      header: "valId",
      render: (row: any) => (
        <span className="font-mono text-xs">{row.valId || "—"}</span>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (row: any) =>
        row.createdAt ? new Date(row.createdAt).toLocaleString() : "—",
    },
    {
      key: "updatedAt",
      header: "Updated",
      render: (row: any) =>
        row.updatedAt ? new Date(row.updatedAt).toLocaleString() : "—",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Payments</h1>

      {isLoading ? (
        <div className="space-y-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse h-20 bg-white rounded-xl shadow-sm"
            />
          ))}
        </div>
      ) : (
        <>
          <ReusableTable columns={columns} data={payments} />

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center">
            <Pagination
              onPageChange={(newPage) =>
                setFilters((prev) => ({ ...prev, page: newPage }))
              }
              page={filters?.page}
              totalPages={meta?.totalPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPaymentsPage;
