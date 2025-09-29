"use client";

import EHForm from "@/component/Form/EHForm";
import EHInput from "@/component/Form/EHInput";
import { useForgetPasswordMutation } from "@/redux/api/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ForgotPasswordForm = () => {
  const [forgotPassword, { isLoading }] = useForgetPasswordMutation();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const res = await forgotPassword({ email: data?.email }).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success(res?.message || "Password reset link sent to your email");
        router.push("/login");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-white p-10 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex flex-col space-y-1">
          <h3 className="text-3xl font-bold tracking-tight">Forgot Password</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Enter your email and we’ll send you instructions to reset your
            password.
          </p>
        </div>

        <EHForm defaultValues={{ email: "" }} onsubmit={handleSubmit}>
          <div className="space-y-6">
            <EHInput
              type="email"
              name="email"
              label="Email"
              placeholder="Please enter your registered email"
              required
            />

            <button
              type="submit"
              className="w-full rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700"
            >
              {isLoading ? "Loading..." : "Send Reset Link"}
            </button>
          </div>
        </EHForm>

        <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
          Remembered your password?{" "}
          <Link href="/login" className="font-semibold underline text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
