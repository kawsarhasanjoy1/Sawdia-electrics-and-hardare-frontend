"use client";
import { useRouter, useSearchParams } from "next/navigation";
import EHForm from "@/component/Form/EHForm";
import EHInput from "@/component/Form/EHInput";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/redux/api/authApi";

const ResetPassword = () => {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || "";
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const onSubmit = async (data: any) => {
    const match = data?.newPassword === data?.confirmPassword;
    if (!match) {
      toast.error("Password does not match");
    } else {
      try {
        const res = await resetPassword({
          token,
          ...data,
        }).unwrap();
        if (res?.success) {
          toast.success(res?.message || "Password reset successfully.");
          router.push("/login");
          return;
        }

        toast.success("Password reset successfully.");
        router.push("/login");
      } catch (err: any) {
        toast.error(err?.data?.message || "Something went wrong.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Set a new password for your account.
          </p>
        </div>

        <EHForm
          defaultValues={{ newPassword: "", confirmPassword: "" }}
          onsubmit={onSubmit}
        >
          <div className=" space-y-5">
            <EHInput
              required
              label="New Password"
              name="newPassword"
              type="password"
              placeholder="Enter a strong password"
            />

            <EHInput
              required
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
            />

            <ul className="text-xs text-zinc-600 dark:text-zinc-400 list-disc pl-5">
              <li>Passwords are encrypted and transmitted securely.</li>
              <li>After success, you’ll be redirected to the login page.</li>
            </ul>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700 mt-5"
          >
            {isLoading ? "Loading..." : "Forget"}
          </button>
        </EHForm>
      </div>
    </div>
  );
};

export default ResetPassword;
