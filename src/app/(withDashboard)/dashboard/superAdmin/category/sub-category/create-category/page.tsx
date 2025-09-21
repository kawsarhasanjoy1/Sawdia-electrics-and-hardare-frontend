"use client";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import EHForm from "@/component/Form/EHForm";
import EHInput from "@/component/Form/EHInput";
import EHSelect from "@/component/Form/EHSelect";
import { useCreateCategoryMutation } from "@/redux/api/categoryApi";
import { useGetAllParentCategoryQuery } from "@/redux/api/parentCategoryApi";
import { ParentCategoryName, parentToSubCategories } from "@/constance/global";

const CategoryDefaultValue = {
  name: "",
  description: "",
  parentCategory: "",
};

const CategoryForm = () => {
  const { data: parentCategories } = useGetAllParentCategoryQuery({
    isDeleted: false,
  });
  const [createCategory] = useCreateCategoryMutation();


  const [selectedParent, setSelectedParent] = useState<ParentCategoryName | "">(
    ""
  );
  const [subCategoryOptions, setSubCategoryOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const parentCategoryOptions =
    parentCategories?.data?.data?.map((cat: any) => ({
      label: cat.name,
      value: cat._id,
    })) || [];

  const handleParentChange = (value: string) => {
    const parent = parentCategories?.data?.data?.find(
      (cat: any) => cat._id === value
    );
    if (!parent) return;

    setSelectedParent(parent.name as ParentCategoryName);

    const subs = parentToSubCategories[parent.name as ParentCategoryName] || [];
    setSubCategoryOptions(subs.map((sub) => ({ label: sub, value: sub })));
  };

  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await createCategory(values).unwrap();
      if (res.success) {
        toast.success("Category created successfully!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create category");
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

      <motion.div
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-lg bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/30"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-white drop-shadow-lg">
          Create Category
        </h2>

        <EHForm onsubmit={onSubmit} defaultValues={CategoryDefaultValue}>
          <div className="space-y-5">
            <motion.div whileHover={{ scale: 1.02 }}>
              <EHSelect
                name="parentCategory"
                label="Parent Category"
                options={parentCategoryOptions}
                onChange={handleParentChange}
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <EHSelect
                name="name"
                label="Sub Category"
                options={subCategoryOptions}
                isDisabled={!selectedParent}
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <EHInput
                name="description"
                label="Description"
                type="text"
                placeholder="Enter category description"
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full py-3 px-6 rounded-xl text-white font-semibold overflow-hidden shadow-xl"
              disabled={!selectedParent || subCategoryOptions.length === 0}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 transition-all duration-300" />

              <span className="relative z-10">Create Category</span>
            </motion.button>
          </div>
        </EHForm>
      </motion.div>
    </motion.div>
  );
};

export default CategoryForm;
