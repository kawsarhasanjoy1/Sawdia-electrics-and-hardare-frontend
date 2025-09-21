"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const PaymentCancelledPage = ({ params }: any) => {
  const transactionId = params?.trun_id;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-amber-100 px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <AlertTriangle className="w-20 h-20 text-yellow-600 animate-pulse" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Payment Cancelled</h1>
        <p className="text-gray-600">
          Your payment was cancelled. If this was a mistake, you can try again
          from your cart.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg shadow-inner text-left space-y-2">
          <p className="text-gray-700">
            <span className="font-semibold">Transaction ID:</span>{" "}
            {transactionId}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-yellow-600 font-bold">Cancelled</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/cart"
            className="w-full md:w-auto bg-yellow-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-yellow-700 transition"
          >
            Return to Cart
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

export default PaymentCancelledPage;
