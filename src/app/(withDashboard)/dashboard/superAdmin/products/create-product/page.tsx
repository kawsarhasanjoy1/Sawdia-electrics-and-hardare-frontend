"use client";
import EHForm from "@/component/Form/EHForm";
import EHImageUploader from "@/component/Form/EHImage";
import EHInput from "@/component/Form/EHInput";
import EHSelect from "@/component/Form/EHSelect";
import EHTextarea from "@/component/Form/EHTextArea";
import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import { useCreateProductMutation } from "@/redux/api/productsApi";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { PackagePlus } from "lucide-react";
import { useGetAllBrandQuery } from "@/redux/api/brandApi";
import { useState } from "react";
import { useGetAllParentCategoryQuery } from "@/redux/api/parentCategoryApi";
import { optionGenerator } from "@/utils/optionGenerator";

const productDefaultValue = {
  name: "",
  description: "",
  categoryId: "",
  brandId: "",
  price: "",
  discountPrice: "",
  stock: "",
  images: [],
  sku: "",
  warranty: "",
};

const ProductForm = () => {
  const [selectedCat, setSelectedCategory] = useState("");
  const [selectedParentCat, setSelectedParentCategory] = useState("");

  const { data } = useGetAllParentCategoryQuery({ isDeleted: false });
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { data: categoryData } = useGetAllCategoryQuery({
    isDeleted: false,
    parentCategory: selectedParentCat,
  });
  const { data: brands } = useGetAllBrandQuery({
    categoryId: selectedCat,
  });

  const parentCategories = data?.data?.data;
  const brand = brands?.data?.data || [];

  const handleCategory = (option: any) => {
    setSelectedCategory(option || "");
  };

  const handleSubmit = async (data: FieldValues) => {
    try {
      const formData = new FormData();
      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file: any) => {
          formData.append("files", file);
        });
      }
      const { ...rest } = data;
      formData.append("data", JSON.stringify(rest));

      const res: any = await createProduct(formData).unwrap();
      if (res?.success) {
        toast.success(" Product created successfully!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || " Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-4xl rounded-3xl border border-white/20 bg-white/30 backdrop-blur-xl p-10 shadow-2xl dark:bg-zinc-900/70 dark:border-zinc-700"
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <PackagePlus
              className="text-indigo-600 dark:text-indigo-400"
              size={40}
            />
          </div>
          <h3 className="text-4xl font-extrabold tracking-tight text-indigo-700 dark:text-indigo-400">
            Add New Product
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Fill in the details to create a new product in your inventory.
          </p>
        </div>

        {/* Form */}
        <EHForm defaultValues={productDefaultValue} onsubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EHInput type="text" name="name" label="Product Name" />
            <EHInput type="text" name="sku" label="SKU" />
            <EHInput type="number" name="price" label="Price" />
            <EHInput
              type="number"
              name="discountPrice"
              label="Discount Price"
              required={false}
            />
            <EHInput type="number" name="stock" label="Stock" />
            <EHInput type="text" name="warranty" label="Warranty" />

            <EHSelect
              onChange={(e) => setSelectedParentCategory(e)}
              options={optionGenerator(parentCategories)}
              label="Parent Category"
              name="parentCategory"
            />
            <EHSelect
              onChange={handleCategory}
              isDisabled={!selectedParentCat}
              options={optionGenerator(categoryData?.data?.data)}
              label="Category"
              name="categoryId"
            />

            <EHSelect
              isDisabled={!selectedCat}
              options={optionGenerator(brand)}
              label="Brands"
              name="brandId"
            />
          </div>

          <div className="mt-6">
            <EHImageUploader name="images" />
          </div>

          <div className="mt-6">
            <EHTextarea
              label="Description"
              placeholder="Enter product description"
              name="description"
              required
              rows={5}
            />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-8"
          >
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 rounded-2xl text-white font-semibold shadow-lg 
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
              hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Create Product"}
            </button>
          </motion.div>
        </EHForm>
      </motion.div>
    </div>
  );
};

export default ProductForm;
