import { CheckCircle2, ShieldCheck, Truck } from "lucide-react";
import React from "react";

export const Delivared = () => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
      <div className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-700">
        <Truck className="h-5 w-5 text-indigo-600" />
        <div className="text-sm">
          <div className="font-semibold">Fast Delivery</div>
          <div className="text-zinc-500">2–5 business days</div>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-700">
        <CheckCircle2 className="h-5 w-5 text-indigo-600" />
        <div className="text-sm">
          <div className="font-semibold">Easy Returns</div>
          <div className="text-zinc-500">Within 7 days</div>
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-700">
        <ShieldCheck className="h-5 w-5 text-indigo-600" />
        <div className="text-sm">
          <div className="font-semibold">Secure Checkout</div>
          <div className="text-zinc-500">Encrypted payments</div>
        </div>
      </div>
    </div>
  );
};
