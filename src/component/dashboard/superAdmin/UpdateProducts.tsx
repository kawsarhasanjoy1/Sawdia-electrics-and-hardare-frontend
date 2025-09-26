"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PackagePlus } from "lucide-react";
import Image from "next/image";
import EHForm from "@/component/Form/EHForm";
import EHInput from "@/component/Form/EHInput";
import EHSelect from "@/component/Form/EHSelect";
import EHTextarea from "@/component/Form/EHTextArea";
import Loading from "@/app/loading";
import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import { useGetAllBrandQuery } from "@/redux/api/brandApi";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "@/redux/api/productsApi";
import { toast } from "react-toastify";
import { useAppSelector } from "@/redux/hooks";

interface UpdateProductFormProps {
  productId: string;
}

const UpdateProductForm = ({ productId }: UpdateProductFormProps) => {
  const router = useRouter();
  const [selectedCat, setSelectedCategory] = useState("");
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [updatedImages, setUpdatedImages] = useState<(File | null)[]>([]);
  const [updateProduct] = useUpdateProductMutation();
  const { user } = useAppSelector((state) => state.auth) as any;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { data: productData, isLoading } = useGetSingleProductQuery(productId);
  const product = productData?.data;

  const defaultValues = {
    name: product?.name || "",
    description: product?.description || "",
    categoryId: product?.categoryId || "",
    brandId: product?.brandId || "",
    price: product?.price || "",
    discountPrice: product?.discountPrice || "",
    stock: product?.stock || "",
    sku: product?.sku || "",
    warranty: product?.warranty || "",
    images: [],
  };

  useEffect(() => {
    if (product) {
      setSelectedCategory(product.categoryId);
      setExistingImages(product.images || []);
      setUpdatedImages(new Array(product.images?.length || 0).fill(null));
    }
  }, [product]);

  // Fetch categories & brands
  const { data: categoryData } = useGetAllCategoryQuery({ isDeleted: false });
  const { data: brands } = useGetAllBrandQuery({ categoryId: selectedCat });

  const brandOptions =
    brands?.data?.data?.map((b: any) => ({ label: b.name, value: b._id })) ||
    [];
  const categoryOptions =
    categoryData?.data?.data?.map((c: any) => ({
      label: c.name,
      value: c._id,
    })) || [];

  const handleCategory = (option: any) =>
    setSelectedCategory(option?.value || "");

  const handleReplaceImage = (index: number, file: File) => {
    const copy = [...updatedImages];
    copy[index] = file;
    setUpdatedImages(copy);
  };

  const handleSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify(data));
    updatedImages.forEach((file, index) => {
      if (file) {
        formData.append("index", JSON.stringify(index));
        formData.append("files", file);
      }
    });
    try {
      const res = await updateProduct({
        id: productId,
        data: formData,
      }).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        router.push(`/dashboard/${user?.role}/products`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
      console.error("Failed to update product:", error);
    }
  };

  if (isLoading) return <Loading />;

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
            Update Product
          </h3>
        </div>

        <EHForm defaultValues={defaultValues} onsubmit={handleSubmit}>
          {/* Form Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EHInput type="text" name="name" label="Product Name" />
            <EHInput type="text" name="sku" label="SKU" />
            <EHInput type="number" name="price" label="Price" />
            <EHInput
              required={false}
              type="number"
              name="discountPrice"
              label="Discount Price"
            />
            <EHInput type="number" name="stock" label="Stock" />
            <EHInput type="text" name="warranty" label="Warranty" />

            <EHSelect
              onChange={handleCategory}
              options={categoryOptions}
              label="Category"
              name="categoryId"
            />
            <EHSelect
              isDisabled={!selectedCat}
              options={brandOptions}
              label="Brands"
              name="brandId"
            />
          </div>

          {/* Image Upload */}
          <div className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {existingImages.map((img, index) => (
                <div key={index} className="relative group">
                  <input
                    type="file"
                    className="hidden"
                    ref={(el: any) => (inputRefs.current[index] = el)}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleReplaceImage(index, e.target.files[0]);
                      }
                    }}
                  />
                  <div
                    className="w-full h-20 rounded-xl overflow-hidden shadow-lg border border-gray-200 cursor-pointer relative"
                    onClick={() => inputRefs.current[index]?.click()}
                  >
                    <Image
                      src={
                        updatedImages[index]
                          ? URL.createObjectURL(updatedImages[index]!)
                          : img
                      }
                      alt={`Image ${index}`}
                      fill
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-xl">
                      <span className="text-white font-semibold text-sm bg-indigo-600 px-3 py-1 rounded-full shadow-lg">
                        Change
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <EHTextarea
              label="Description"
              placeholder="Enter product description"
              name="description"
              required
              rows={5}
            />
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pt-8"
          >
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-2xl text-white font-semibold shadow-lg
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
              hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300 disabled:opacity-50"
            >
              Update
            </button>
          </motion.div>
        </EHForm>
      </motion.div>
    </div>
  );
};

export default UpdateProductForm;
