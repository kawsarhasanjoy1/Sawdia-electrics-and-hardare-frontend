"use client";
import { useState } from "react";
import { FaUserCircle, FaLock, FaHistory, FaEdit } from "react-icons/fa";
import { MdEmail, MdOutlineVerifiedUser } from "react-icons/md";
import Image from "next/image";
import EHForm from "@/component/Form/EHForm";
import EHInput from "@/component/Form/EHInput";
import Modal from "./Modal";
import { useUpdateUserMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";

type PaymentItem = {
  _id: string;
  createdAt: string;
  totalAmount: number;
  status: "Paid" | "Pending" | "Failed";
};

interface ProfileLayoutProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  payments?: PaymentItem[];
  onProfileUpdate?: () => void;
  onChangePassword: any;
}

const ProfileLayout = ({
  user,
  payments = [],
  onChangePassword,
}: ProfileLayoutProps) => {
  const [activeTab, setActiveTab] = useState<
    "profile" | "password" | "history"
  >("profile");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateUser] = useUpdateUserMutation();

  const handleToUpdateProfile = async (e: any) => {
    const { avatar, ...rest } = e;
    const formData = new FormData();
    formData.append("file", avatar?.[0]);
    formData.append("data", JSON.stringify(rest));
    try {
      const res = await updateUser(formData).unwrap();
      if (res.success) {
        toast.success(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update user");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 rounded-md px-4 py-2 border ${
            activeTab === "profile"
              ? "bg-blue-600 text-white"
              : "border-gray-300"
          }`}
        >
          <FaUserCircle /> Profile
        </button>
        <button
          onClick={() => setActiveTab("password")}
          className={`flex items-center gap-2 rounded-md px-4 py-2 border ${
            activeTab === "password"
              ? "bg-blue-600 text-white"
              : "border-gray-300"
          }`}
        >
          <FaLock /> Security
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex items-center gap-2 rounded-md px-4 py-2 border ${
            activeTab === "history"
              ? "bg-blue-600 text-white"
              : "border-gray-300"
          }`}
        >
          <FaHistory /> Payment History
        </button>
      </div>

      {/* Profile */}
      {activeTab === "profile" && (
        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          <div className="flex items-center gap-6">
            <Image
              width={200}
              height={200}
            src={user?.avatar || "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"}
              alt="Avatar"
              className="w-24 h-24 object-cover object-center rounded-full border"
            />
            {/* <EHImageUploader name="avatar" /> */}
            <div>
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <p className="flex items-center gap-2 text-gray-700 mt-1">
                <MdEmail /> {user?.email}
              </p>
              <p className="flex items-center gap-2 text-gray-700 mt-1 capitalize">
                <MdOutlineVerifiedUser /> {user?.role}
              </p>
            </div>
          </div>
          <div>
            {isModalOpen ? (
              <Modal
                setIsModalOpen={setIsModalOpen}
                updateUser={handleToUpdateProfile}
                user={user}
              />
            ) : (
              ""
            )}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <FaEdit /> Update Profile
          </button>
        </div>
      )}

      {/* Password */}
      {activeTab === "password" && (
        <EHForm
          defaultValues={{ oldPassword: "", newPassword: "" }}
          onsubmit={onChangePassword}
        >
          <div className="bg-white shadow rounded-lg p-6 space-y-4">
            <EHInput
              required
              label="Old Password"
              name="oldPassword"
              type="password"
            />
            <EHInput
              required
              label="New Password"
              name="newPassword"
              type="password"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
            >
              Change Password
            </button>
          </div>
        </EHForm>
      )}

      {activeTab === "history" && (
        <div className="bg-white shadow rounded-lg p-6">
          {payments.length === 0 ? (
            <p className="text-gray-600">No payment history found.</p>
          ) : (
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Date</th>
                  <th className="border p-2 text-left">Amount</th>
                  <th className="border p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments?.map((p: any) => (
                  <tr key={p._id}>
                    <td className="border p-2">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border p-2">{p?.subtotal}</td>
                    <td
                      className={`border p-2 font-semibold ${
                        p.status === "Paid"
                          ? "text-green-600"
                          : p.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {p.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileLayout;
