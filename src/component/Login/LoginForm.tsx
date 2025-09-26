"use client";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import { toast } from "react-toastify";
import EHForm from "../Form/EHForm";
import { loginDefaultValue } from "@/defaultValue/global";
import EHInput from "../Form/EHInput";
import { FieldValues } from "react-hook-form";
import { handleLoginSuccess } from "@/services/authServices";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/api/authApi";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [loginUser] = useLoginMutation();
  const router = useRouter();
  const handleSubmit = async (data: FieldValues) => {
    try {
      const res = await loginUser(data).unwrap();
      console.log(res);
      const token = res?.data?.accessToken;
      if (res?.success) {
        handleLoginSuccess(dispatch, token);
        Cookie.set("accessToken", token);
        toast.success(res?.message);
        router.push("/");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-white p-10 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex flex-col space-y-1">
          <h3 className="text-3xl font-bold tracking-tight">Login</h3>
        </div>

        <EHForm defaultValues={loginDefaultValue} onsubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2 text-sm">
              <EHInput
                type="email"
                name="email"
                label="Email"
                placeholder="Please enter your email"
              />
            </div>
            <div className="space-y-2 text-sm">
              <EHInput
                type="password"
                name="password"
                label="Password"
                placeholder="Please enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-sky-500 px-4 py-2 text-white transition-colors hover:bg-sky-600 dark:bg-sky-700"
            >
              Login
            </button>
          </div>
        </EHForm>

        <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
          Do you want to create account{" "}
          <Link
            href="/register"
            className="font-semibold underline text-blue-600"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
