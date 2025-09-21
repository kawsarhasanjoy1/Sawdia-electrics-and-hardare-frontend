"use client";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import EHForm from "@/component/Form/EHForm";
import EHSelect from "@/component/Form/EHSelect";
import { useCreateBrandMutation } from "@/redux/api/brandApi";
import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import { allBrands, AllCategoryName } from "@/constance/global";

const BrandDefaultValue = {
  name: "",
  categoryId: "",
};

const BrandForm = () => {
  const { data: categories } = useGetAllCategoryQuery({ isDeleted: false });
  const [createBrand] = useCreateBrandMutation();

  const [selectedCategory, setSelectedCategory] = useState<
    AllCategoryName | ""
  >("");
  const [brandOptions, setBrandOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const categoryOptions =
    categories?.data?.data?.map((cat: any) => ({
      label: cat.name,
      value: cat._id,
    })) || [];

  const handleCategoryChange = (value: string) => {
    const selectedCat = categories?.data?.data?.find((cat: any) => cat._id === value);
    if (!selectedCat) return;

    setSelectedCategory(selectedCat.name as AllCategoryName);

    const brands = allBrands[selectedCat.name as AllCategoryName] || [];
    setBrandOptions(brands.map((brand) => ({ label: brand, value: brand })));
  };

  const onSubmit = async (values: FieldValues) => {
    console.log(values);
    try {
      const res = await createBrand(values).unwrap();
      if (res.success) {
        toast.success("Brand created successfully!");
      }
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
                name="categoryId"
                label="Category"
                options={categoryOptions}
                onChange={handleCategoryChange}
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <EHSelect
                name="name"
                label="Brand"
                options={brandOptions}
                isDisabled={!selectedCategory}
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full py-3 px-6 rounded-xl text-white font-semibold overflow-hidden shadow-xl"
              disabled={!selectedCategory || brandOptions.length === 0}
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
