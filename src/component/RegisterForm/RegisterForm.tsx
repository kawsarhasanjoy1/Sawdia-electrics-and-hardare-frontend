"use client";
import { useCreateUserMutation } from "@/redux/api/userApi";
import EHForm from "../Form/EHForm";
import { DefaultRegisterValue } from "@/defaultValue/global";
import EHInput from "../Form/EHInput";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const [createUser] = useCreateUserMutation();
  const router = useRouter();
  const handleSubmit = async (data: any) => {
    try {
      const res = await createUser(data).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-6 rounded-lg border bg-white p-10 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex flex-col space-y-1">
          <h3 className="text-3xl font-bold tracking-tight">Sign Up</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Please fill in the form to create an account.
          </p>
        </div>

        <EHForm defaultValues={DefaultRegisterValue} onsubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="space-y-2 text-sm">
              <EHInput
                name="name"
                type="text"
                label="Name"
                placeholder="Please enter your name"
              />
            </div>
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
              Sign Up
            </button>
          </div>
        </EHForm>

        <p className="text-center text-sm text-zinc-700 dark:text-zinc-300">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold underline text-blue-600">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
