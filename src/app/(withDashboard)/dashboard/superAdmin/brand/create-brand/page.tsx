"use client";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import EHForm from "@/component/Form/EHForm";
import EHSelect from "@/component/Form/EHSelect";
import { useCreateBrandMutation } from "@/redux/api/brandApi";
import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import { useGetAllParentCategoryQuery } from "@/redux/api/parentCategoryApi";
import { allBrands, AllCategoryName } from "@/constance/global";

const BrandDefaultValue = {
  parentCategory: "",
  categoryId: "",
  name: "",
};

const BrandForm = () => {
  const [createBrand] = useCreateBrandMutation();

  const [selectedParentId, setSelectedParentId] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");


  const { data: parentRes } = useGetAllParentCategoryQuery({
    isDeleted: false,
  });

  const parentList = parentRes?.data?.data ?? [];
  const parentOptions =
    parentList?.map((p: any) => ({ label: p?.name, value: p?._id })) ?? [];

  const { data: catRes, isFetching: catLoading } = useGetAllCategoryQuery(
    { isDeleted: false, parentCategory: selectedParentId },
    { skip: !selectedParentId }
  );

  const catList = catRes?.data?.data ?? [];
  const categoryOptions =
    catList.map((c: any) => ({ label: c?.name, value: c?._id })) ?? [];

  const [brandOptions, setBrandOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const handleParentChange = (value: string) => {
    setSelectedParentId(value);
    setSelectedCategoryId("");
    setBrandOptions([]);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategoryId(value);

    const selected = catList.find((c: any) => c?._id === value);
    const catName = (selected?.name || "") as AllCategoryName;
  

    const brands = allBrands[catName] || [];
    setBrandOptions(brands.map((b) => ({ label: b, value: b })));
  };

  const onSubmit = async (values: FieldValues) => {
    if (!values.parentCategory || !values.categoryId || !values.name) {
      toast.error("Please select parent, category, and brand");
      return;
    }

    try {
      const res = await createBrand({
        categoryId: values.categoryId,
        parentCategory: values?.parentCategory,
        name: values.name,
      }).unwrap();

      if (res?.success) toast.success("Brand created successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create brand");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* animated bg */}
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
          Create Brand
        </h2>

        <EHForm onsubmit={onSubmit} defaultValues={BrandDefaultValue}>
          <div className="space-y-5">
            <motion.div whileHover={{ scale: 1.02 }}>
              <EHSelect
                name="parentCategory"
                label="Parent Category"
                options={parentOptions}
                onChange={handleParentChange}
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <EHSelect
                key={selectedParentId || "category-empty"}
                name="categoryId"
                label="Category"
                options={categoryOptions}
                onChange={handleCategoryChange}
                isDisabled={!selectedParentId || catLoading}
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <EHSelect
                key={selectedCategoryId || "brand-empty"}
                name="name"
                label="Brand"
                options={brandOptions}
                isDisabled={!selectedCategoryId || brandOptions.length === 0}
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full py-3 px-6 rounded-xl text-white font-semibold overflow-hidden shadow-xl"
              disabled={
                !selectedParentId ||
                !selectedCategoryId ||
                brandOptions.length === 0
              }
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 transition-all duration-300" />
              <span className="relative z-10">Create Brand</span>
            </motion.button>
          </div>
        </EHForm>
      </motion.div>
    </motion.div>
  );
};

export default BrandForm;
