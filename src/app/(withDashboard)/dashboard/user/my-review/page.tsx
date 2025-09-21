"use client";
import NotFound from "@/app/not-found";
import ReusableTable from "@/component/dashboard/ui/ReusableTable";
import { useGetUserReviewQuery } from "@/redux/api/reviewApi";
import { formatDate } from "@/utils/formateDate";
import Image from "next/image";

const MyReviewPage = () => {
  const { data } = useGetUserReviewQuery(undefined);
  const review = data?.data;
  if (review?.length <= 0) {
    return <NotFound message="Review data not found" />;
  }
  // const [softDelete] = useDeletedBrandMutation();
  // const [restoreCategory] = useRestoreBrandMutation();
  // const handleToDeleted = async (id: string) => {
  //   try {
  //     const res = await softDelete(id).unwrap();
  //     if (res?.success) toast.success(res?.message);
  //   } catch (err: any) {
  //     toast.error(err?.data?.message);
  //   }
  // };

  // const handleToRestore = async (id: string) => {
  //   try {
  //     const res = await restoreCategory(id).unwrap();
  //     if (res?.success) toast.success(res?.message);
  //   } catch (err: any) {
  //     toast.error(err?.data?.message);
  //   }
  // };

  const columns = [
    {
      key: "Image",
      header: "Image",
      render: (row: any) => {
        console.log(row);
        return (
          <Image
            className=" md:h-16 h-10 md:w-16 w-10 rounded-full "
            src={row?.productId?.images?.[0]}
            width={100}
            height={100}
            alt="Product image"
          />
        );
      },
    },

    {
      key: "Product Name",
      header: "Product Name",
      render: (row: any) => {
        return <span>{row?.productId?.name}</span>;
      },
    },
    {
      key: "rating",
      header: "Rating",
      render: (row: any) => {
        return <span>{row?.rating}</span>;
      },
    },
    {
      key: "Status",
      header: "Status",
      render: (row: any) => {
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              !row.isDeleted
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {row?.isDeleted ? "InActive" : "Active"}
          </span>
        );
      },
    },
    {
      key: "Created By",
      header: "Created By",
      render: (row: any) => {
        return (
          <div className=" flex flex-col space-y-0.5">
            <span>{row?.userId?.name}</span>
            <span>{row?.userId?.email}</span>
          </div>
        );
      },
    },
    {
      key: "date",
      header: "Created Date",
      render: (row: any) => {
        return <span>{formatDate(row?.createdAt)}</span>;
      },
    },
    // {
    //   key: "actions",
    //   header: "Actions",
    //   render: (row: any) => (
    //     <div className="flex items-center justify-center gap-2">
         
    //       <button
    //         // onClick={() => handleToRestore(row._id)}
    //         disabled={row?.isDeleted === false}
    //         className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium
    //           bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition ${
    //             row?.isDeleted ? "cursor-pointer" : ""
    //           }`}
    //       >
    //         <RotateCcw size={16} /> Restore
    //       </button>
    //       <button
    //         // onClick={() => handleToDeleted(row._id)}
    //         disabled={row?.isDeleted === true}
    //         className={`p-2 rounded-lg hover:bg-red-100 text-red-600 ${
    //           row?.isDeleted ? "" : "cursor-pointer"
    //         }`}
    //       >
    //         <Trash2 size={18} />
    //       </button>
    //     </div>
    //   ),
    // },
  ];
  return (
    <div>
      <div>
        <ReusableTable data={review} columns={columns} />
      </div>
    </div>
  );
};

export default MyReviewPage;
