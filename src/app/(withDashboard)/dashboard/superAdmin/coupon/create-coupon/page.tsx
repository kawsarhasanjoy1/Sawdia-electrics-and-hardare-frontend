"use client";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import EHForm from "@/component/Form/EHForm";
import EHInput from "@/component/Form/EHInput";
import { useCreateCouponMutation } from "@/redux/api/couponApi";
import EHSelect from "@/component/Form/EHSelect";

const CouponDefaultValue = {
  code: "",
  discountType: "percentage",
  amount: 0,
  expiryDate: "",
  minPurchase: 0,
  isActive: true,
};

const CouponForm = () => {
  const [createCoupon] = useCreateCouponMutation();

  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await createCoupon(values).unwrap();
      if (res.success) toast.success("Coupon created successfully!");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create coupon");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div className="relative w-full max-w-2xl bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/30">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-white drop-shadow-lg">
          Create Coupon
        </h2>

        <EHForm onsubmit={onSubmit} defaultValues={CouponDefaultValue}>
          <div className="space-y-5">
            <EHInput name="code" label="Coupon Code" type="text" />
            <EHSelect
              name="discountType"
              options={[
                { value: "percentage", label: "Percentage" },
                { value: "fixed", label: "Fixed Amount" },
              ]}
              label="Discount Type"
            />
            <EHInput name="amount" label="Discount Amount" type="number" />
            <EHInput name="expiryDate" label="Expiry Date" type="date" />
            <EHInput
              name="minPurchase"
              label="Minimum Purchase"
              type="number"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full py-3 px-6 rounded-xl text-white font-semibold overflow-hidden shadow-xl"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 transition-all duration-300" />
              <span className="relative z-10">Create Coupon</span>
            </motion.button>
          </div>
        </EHForm>
      </motion.div>
    </motion.div>
  );
};

export default CouponForm;
