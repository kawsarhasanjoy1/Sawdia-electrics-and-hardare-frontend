'use client'
import { useDeletedProductMutation, useGetAllProductQuery, useRestoreProductMutation } from '@/redux/api/productsApi';
import { formatDate } from '@/utils/formateDate';
import { Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import ReusableTable from '../ui/ReusableTable';

 const LowStockProductsTable = () => {
    const { data: productData } = useGetAllProductQuery({ sort: "stock" });
  const product = productData?.data?.data;
  const [softDelete] = useDeletedProductMutation();
  const [restoreProduct] = useRestoreProductMutation();

  const handleToDeleted = async (id: string) => {
    try {
      const res = await softDelete(id).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  const handleToRestore = async (id: string) => {
    try {
      const res = await restoreProduct(id).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  const productColumns = [
    {
      key: "name",
      header: "Product Name",
      render: (row: any) => <span className="font-semibold">{row.name}</span>,
    },
    {
      key: "category",
      header: "Category",
      render: (row: any) => <span>{row.categoryId?.name || "N/A"}</span>,
    },
    {
      key: "brand",
      header: "Brand",
      render: (row: any) => <span>{row.brandId?.name || "N/A"}</span>,
    },
    {
      key: "price",
      header: "Price",
      render: (row: any) => <span>৳{row.price}</span>,
    },
    {
      key: "stock",
      header: "Stock",
      render: (row: any) => <span>{row.stock}</span>,
    },
    {
      key: "warranty",
      header: "Warranty",
      render: (row: any) => <span>{row.warranty || "-"}</span>,
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (row: any) => <span>{formatDate(row.createdAt)}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: any) => (
        <div className="flex gap-2">
          <button className="p-2 rounded-lg hover:bg-indigo-100 text-indigo-600">
            <Edit size={18} />
          </button>
          <button
            onClick={() => handleToRestore(row._id)}
            disabled={!row.isDeleted}
            className={`px-3 py-1 rounded-lg text-sm font-medium bg-yellow-100 text-yellow-700 hover:bg-yellow-200 ${
              row.isDeleted ? "cursor-pointer" : "opacity-50"
            }`}
          >
            Restore
          </button>
          <button
            onClick={() => handleToDeleted(row._id)}
            disabled={row.isDeleted}
            className={`p-2 rounded-lg hover:bg-red-100 text-red-600 ${
              row.isDeleted ? "opacity-50" : "cursor-pointer"
            }`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div><ReusableTable columns={productColumns} data={product} /></div>
  )
}


export default LowStockProductsTable