"use client";
import { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { RotateCcw, Trash2 } from "lucide-react";
import ReusableTable from "@/component/dashboard/ui/ReusableTable";
import SearchBox from "@/component/dashboard/ui/SearchInput";
import Pagination from "@/component/ui/Paginate/Pagination";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";

import { formatDate } from "@/utils/formateDate";
import {
  useDeleteCouponMutation,
  useGetCouponsQuery,
} from "@/redux/api/couponApi";

const CouponsPage = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    page: 1,
    limit: 10,
  });

  const query = useMemo(() => ({ ...filters }), [filters]);
  const { data, isFetching } = useGetCouponsQuery(query);
  const coupons = data?.data?.data || [];

  const [deleteCoupon] = useDeleteCouponMutation();

  const handleToDeleted = async (id: string) => {
    try {
      const res = await deleteCoupon(id).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  const columns = [
    {
      key: "code",
      header: "Coupon Code",
      render: (row: any) => <span>{row?.code}</span>,
    },
    {
      key: "discount",
      header: "Discount Amount",
      render: (row: any) => <span>{row?.amount}</span>,
    },
    {
      key: "Discount Type",
      header: "Discount Type",
      render: (row: any) => <span>{row?.discountType}</span>,
    },
    {
      key: "expiryDate",
      header: "Expiry Date",
      render: (row: any) => <span>{formatDate(row?.expiryDate)}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            !row.isDeleted
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row?.isDeleted ? "Inactive" : "Active"}
        </span>
      ),
    },
    {
      key: "createdBy",
      header: "Created By",
      render: (row: any) => (
        <div className="flex flex-col space-y-0.5">
          <span>{row?.userId?.name}</span>
          <span className="text-xs">{row?.userId?.email}</span>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "Created Date",
      render: (row: any) => <span>{formatDate(row?.createdAt)}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleToDeleted(row._id)}
            disabled={row?.isDeleted}
            className={`p-2 rounded-lg hover:bg-red-100 text-red-600 ${"cursor-pointer"}`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <div className="mb-6 text-gray-800 flex justify-between items-center gap-6 md:gap-0 pt-6">
        <p className="text-2xl font-bold">Coupons</p>
        <SearchBox
          placeholder="Search coupon"
          className="md:w-3/12 w-full border px-4 py-2 border-gray-400 focus:outline-none rounded-md"
          value={filters?.searchTerm}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              searchTerm: e,
            }))
          }
        />
      </div>

      {isFetching ? (
        <Loading />
      ) : coupons.length > 0 ? (
        <ReusableTable data={coupons} columns={columns} />
      ) : (
        <NotFound message="No coupons available at this moment" />
      )}

      <div className="mt-4 flex justify-center">
        <Pagination
          page={filters.page}
          totalPages={data?.data?.meta?.totalPage || 1}
          onPageChange={(newPage) =>
            setFilters((prev) => ({ ...prev, page: newPage }))
          }
        />
      </div>
    </div>
  );
};

export default CouponsPage;
