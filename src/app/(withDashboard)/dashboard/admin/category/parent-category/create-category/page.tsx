"use client";

import EHForm from "@/component/Form/EHForm";
import EHInput from "@/component/Form/EHInput";
import EHSelect from "@/component/Form/EHSelect";
import { useCreateParentCategoryMutation } from "@/redux/api/parentCategoryApi";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { parentCategoryNames } from "@/constance/global";

const ParentCategoryDefaultValue = {
  name: "",
  description: "",
};

const ParentCategoryForm = () => {
  const [createParentCategory] = useCreateParentCategoryMutation();

  // Parent Category Options
  const parentCategoryOptions =
    parentCategoryNames?.map((name: string) => ({
      label: name,
      value: name,
    })) || [];

  const onSubmit = async (values: FieldValues) => {
    console.log(values);
    try {
      const res = await createParentCategory(values).unwrap();
      if (res.success) {
        toast.success("Parent Category created successfully!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create parent category");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
  
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Centered form card */}
      <motion.div
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-lg bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/30"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">
          Create Parent Category
        </h2>

        <EHForm onsubmit={onSubmit} defaultValues={ParentCategoryDefaultValue}>
          <motion.div whileFocus={{ scale: 1.02 }} className="mb-4">
            <EHSelect
              name="name"
              label="Parent Category Name"
              options={parentCategoryOptions}
            />
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="mb-4">
            <EHInput
              name="description"
              label="Description"
              type="text"
              placeholder="Enter parent category description"
            />
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-700 transition"
          >
            Create Parent Category
          </motion.button>
        </EHForm>
      </motion.div>
    </motion.div>
  );
};

export default ParentCategoryForm;
