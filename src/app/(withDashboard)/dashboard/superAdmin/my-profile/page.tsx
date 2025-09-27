"use client";
import { useGetMeQuery } from "@/redux/api/userApi";
import { useGetOrdersQuery } from "@/redux/api/orderApi";
import ProfileLayout from "@/component/dashboard/ui/RusibleProfile";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { toast } from "react-toastify";

const UserProfilePage = () => {
  const { data: payment } = useGetOrdersQuery(undefined);
  const [changePass] = useChangePasswordMutation();
  const { data } = useGetMeQuery(undefined);
  const superAdmin = data?.data || {};
  const paymentHistory = payment?.data?.data;
  const handleOnchangePassword = async (e: any) => {
    try {
      const res = await changePass(e).unwrap();
      if (res?.success) toast.success(res?.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div>
        <ProfileLayout
          user={superAdmin}
          payments={paymentHistory}
          onChangePassword={handleOnchangePassword}
        />
      </div>
    </div>
  );
};

export default UserProfilePage;
