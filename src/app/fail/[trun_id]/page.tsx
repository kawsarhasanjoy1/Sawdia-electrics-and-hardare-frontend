"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";



const PaymentFailedPage = ({ params }: any) => {
  const { trun_id } = params;
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100 px-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6 animate-fade-in">
        <div className="flex justify-center">
          <XCircle className="w-20 h-20 text-red-600 animate-shake" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Payment Failed</h1>
        <p className="text-gray-600">
          Oops! Something went wrong while processing your payment with{" "}
          <span className="font-semibold">SSLCommerz</span>.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg shadow-inner text-left space-y-2">
          <p className="text-gray-700">
            <span className="font-semibold">Transaction ID:</span> {trun_id}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Status:</span>{"failed"}
            <span className="text-red-600 font-bold">Failed</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/cart"
            className="w-full md:w-auto bg-red-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-red-700 transition"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
