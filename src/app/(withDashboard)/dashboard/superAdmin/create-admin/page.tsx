"use client";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { motion } from "framer-motion";
import EHForm from "@/component/Form/EHForm";
import EHInput from "@/component/Form/EHInput";
import EHSelect from "@/component/Form/EHSelect";
import { useCreateAdminMutation } from "@/redux/api/userApi";
import { toast } from "react-toastify";
import EHImageUploader from "@/component/Form/EHImage";

const defaultValues = {
  name: "",
  email: "",
  password: "",
  role: "",
};

const roles = [
  { label: "Admin", value: "admin" },
  { label: "Sales", value: "sales" },
];

const CreateAdmin = () => {
  const [createAdmin] = useCreateAdminMutation();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: FieldValues) => {
    const { avatar, ...rest } = values;
    const image = avatar?.[0];
    const formData = new FormData();
    formData.append("file", image);
    formData.append("data", JSON.stringify(rest));
    try {
      const res = await createAdmin(formData).unwrap();
      if (res.success) {
        toast.success("Admin created successfully!");
      } else {
        toast.error(res.message || "Failed to create admin");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Glass-style card */}
      <motion.div
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-lg bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/30"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-white drop-shadow-lg">
          Create Admin
        </h2>

        <EHForm onsubmit={onSubmit} defaultValues={defaultValues}>
          <div className="space-y-5">
            <motion.div whileHover={{ scale: 1.02 }}>
              <EHInput
                type="text"
                name="name"
                label="Full Name"
                placeholder="Enter admin name"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <EHInput
                name="email"
                type="email"
                label="Email"
                placeholder="Enter email address"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <EHInput
                name="password"
                type="password"
                label="Password"
                placeholder="Set a password"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <EHSelect name="role" label="Role" options={roles} />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <EHImageUploader name="avatar" />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="relative w-full py-3 px-6 rounded-xl text-white font-semibold overflow-hidden shadow-xl disabled:opacity-70"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 transition-all duration-300" />
              <span className="relative z-10">
                {loading ? "Creating..." : "Create Admin"}
              </span>
            </motion.button>
          </div>
        </EHForm>
      </motion.div>
    </motion.div>
  );
};

export default CreateAdmin;
