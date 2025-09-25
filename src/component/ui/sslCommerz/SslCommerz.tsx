"use client";

import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {  useInitPaymentMutation } from "@/redux/api/paymentApi2";
import EHForm from "@/component/Form/EHForm";
import EHInput from "@/component/Form/EHInput";
import EHSelect from "@/component/Form/EHSelect";



const DEFAULTS = {
  name: "",
  email: "",
  address: "",
  city: "Dhaka",
  postcode: "1207",
  country: "Bangladesh",
  phone: ""
};

const countryOptions = [
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "India", value: "India" },
  { label: "Pakistan", value: "Pakistan" },
  { label: "Nepal", value: "Nepal" },
  { label: "Sri Lanka", value: "Sri Lanka" },
];

const SSLCommerzCheckout = ({ userId, items, amount }: any) => {
  const [initPayment, { isLoading }] = useInitPaymentMutation();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (values: FieldValues) => {
    try {
      setSubmitting(true);

      // Basic guard; backend recomputes securely anyway
      if (!values?.name || !values?.email || !values?.address) {
        toast.error("Please fill all required fields.");
        return;
      }

      const payload = {
        userId,
        items,
        amount, // server re-validates
        customer: {
          name: values.name as string,
          email: values.email as string,
          address: values.address as string,
          city: values.city as string,
          postcode: values.postcode as string,
          country: (values.country as string) || "Bangladesh",
          phone: (values.phone as string) ,
        },
      };

      const res = await initPayment(payload).unwrap();

      if (!res?.redirectUrl) {
        toast.error("Could not get gateway URL. Please try again.");
        return;
      }
     
      window.location.href = res.redirectUrl;
    } catch (err: any) {
      toast.error(err?.data?.error || err?.message || "Payment init failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const formattedTotal = amount?.toLocaleString("en-BD");

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen relative overflow-hidden px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated gradient backdrop */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Glass card */}
      <motion.div
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-xl bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/30"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-white drop-shadow-lg">
          Checkout
        </h2>

        <EHForm onsubmit={onSubmit} defaultValues={DEFAULTS}>
          <div className="space-y-5">
            <motion.div whileHover={{ scale: 1.02 }}>
              <EHInput
                type="text"
                name="name"
                label="Full name"
                placeholder="John Doe"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <EHInput
                name="email"
                type="email"
                label="Email"
                placeholder="john@example.com"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <EHInput
                name="phone"
                type="number"
                label="Contact No"
                placeholder="017XXXXXXXX"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <EHInput
                type="text"
                name="address"
                label="Address"
                placeholder="House, Road, Area"
              />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.02 }}>
                <EHInput
                  type="text"
                  name="city"
                  label="City"
                  placeholder="Dhaka"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }}>
                <EHInput
                  type="text"
                  name="postcode"
                  label="Postcode"
                  placeholder="1207"
                />
              </motion.div>
            </div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <EHSelect
                name="country"
                label="Country"
                options={countryOptions}
                // default to Bangladesh visually if your EHSelect needs it
              />
            </motion.div>

            {/* Order summary */}
            <div className="flex items-center justify-between mt-2">
              <span className="text-white/80">Total</span>
              <span className="text-white text-2xl font-extrabold">
                {formattedTotal}৳
              </span>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              disabled={submitting || isLoading}
              className="relative w-full py-3 px-6 rounded-xl text-white font-semibold overflow-hidden shadow-xl disabled:opacity-70"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 transition-all duration-300" />
              <span className="relative z-10">
                {submitting || isLoading
                  ? "Redirecting…"
                  : "Pay with SSLCommerz"}
              </span>
            </motion.button>

            <p className="text-xs text-white/80 text-center">
              You’ll be redirected to the secure SSLCommerz gateway to complete
              payment.
            </p>
          </div>
        </EHForm>
      </motion.div>
    </motion.div>
  );
};

export default SSLCommerzCheckout;
