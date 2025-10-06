"use client";
import { useGetMeQuery } from "@/redux/api/userApi";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import ProfileLayout from "@/component/dashboard/ui/RusibleProfile";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { toast } from "react-toastify";

const AdminProfilePage = () => {
  const { data: payment } = useGetOrdersQuery(undefined);
  const [changePass] = useChangePasswordMutation();
  const { data } = useGetMeQuery(undefined);
  const admin = data?.data || {};
  const paymentHistory = payment?.data;

  const handleOnchangePassword = async (e: any) => {
    try {
      const res = await changePass(e).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  return (
    <div className="md:max-w-5xl mx-auto w-full md:p-6 p-0">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div>
        <ProfileLayout
          user={admin}
          payments={paymentHistory}
          onChangePassword={handleOnchangePassword}
        />
      </div>
    </div>
  );
};

export default AdminProfilePage;
