"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useSuccessPaymentMutation } from "@/redux/api/orderApi";

const PaymentSuccessPage = ({ params }: any) => {
  const { trun_id } = params;
  console.log(trun_id);
  const [successPayment, { data }] = useSuccessPaymentMutation();
  useEffect(() => {
    if (trun_id) {
      successPayment(trun_id);
    }
  }, [trun_id, successPayment]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <CheckCircle className="w-20 h-20 text-green-600 animate-bounce" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800">Payment Successful</h1>
        <p className="text-gray-600">
          Thank you for your purchase! Your payment has been processed
          successfully via <span className="font-semibold">SSLCommerz</span>.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner text-left space-y-2">
          <p className="text-gray-700">
            <span className="font-semibold">Transaction ID:</span> {trun_id}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-green-600 font-bold">Paid</span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Amount:</span> $
            {data?.data?.totalAmount}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/cart"
            className="w-full md:w-auto bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition"
          >
            View Orders
          </Link>
          <Link
            href="/products"
            className="w-full md:w-auto bg-gray-100 text-gray-800 py-3 px-6 rounded-lg shadow-md hover:bg-gray-200 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
