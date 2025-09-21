import ReusableTable from "../ui/ReusableTable";
import {
  useGetOrdersQuery,
  useUpdatePaymentStatusMutation,
} from "@/redux/api/orderApi";
import { toast } from "react-toastify";

export const PendingOrder = () => {
  const { data: orderData } = useGetOrdersQuery({ status: "pending" });
  const order = orderData?.data || [];
  const [upStatus] = useUpdatePaymentStatusMutation();
  const handleToStatus = async (e: any) => {
    const status = { id: e?.id, status: e?.status };
    try {
      const res = await upStatus(status).unwrap();
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  const orderColumns = [
    {
      key: "tran_id",
      header: "TransactionId",
      render: (row: any) => <span>{row?.tran_id}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <select
          defaultValue={row?.status}
          className="px-2 py-1 rounded-md text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-400"
          onChange={(e) =>
            handleToStatus({ status: e?.target?.value, id: row?.tran_id })
          }
        >
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      ),
    },

    {
      key: "totalAmount",
      header: "Total Amount",
      render: (row: any) => <span>${row?.totalAmount}</span>,
    },
    {
      key: "buyer",
      header: "Buyer",
      render: (row: any) => (
        <div className="flex flex-col">
          <span className="text-sm">{row?.userId?.name}</span>
          <span className="text-sm">{row?.userId?.email}</span>
        </div>
      ),
    },
    {
      key: "products",
      header: "Product Name",
      render: (row: any) => (
        <div className="flex flex-col text-sm">
          {row?.products?.map((item: any) => (
            <span key={item?.productId?._id}>{item?.productId?.name}</span>
          ))}
        </div>
      ),
    },
    {
      key: "shippingAddress",
      header: "Shipping Address",
      render: (row: any) => (
        <div className="flex flex-col text-sm">
          <span>Post Code: {row?.shippingAddress?.postcode}</span>
          <span>UP: {row?.shippingAddress?.line1}</span>
          <span>District: {row?.shippingAddress?.city}</span>
          <span>Contact: {row?.shippingAddress?.phone}</span>
        </div>
      ),
    },
  ];
  return <ReusableTable columns={orderColumns} data={order} />;
};
