"use client";

import CommonTitle from "@/component/shared/CommonTitle";
import { ShieldCheck, Truck, Headphones, BadgePercent } from "lucide-react";

const services = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
    title: "Quality Assurance",
    description:
      "We ensure 100% original electronics & hardware with warranty and after-sales support.",
  },
  {
    icon: <Truck className="w-10 h-10 text-green-600" />,
    title: "Fast Delivery",
    description:
      "Nationwide delivery within 24-48 hours so you never have to wait long for your product.",
  },
  {
    icon: <Headphones className="w-10 h-10 text-purple-600" />,
    title: "24/7 Support",
    description:
      "Our dedicated support team is available round the clock to assist you with any queries.",
  },
  {
    icon: <BadgePercent className="w-10 h-10 text-orange-600" />,
    title: "Best Prices & Offers",
    description:
      "Enjoy seasonal discounts and exclusive deals with the best value for your money.",
  },
];

const OurServices = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6 sm:px-12 w-full h-full py-20">
      <div className="max-w-7xl mx-auto text-center">
        <CommonTitle
          title={{ a: "Our", b: "Services" }}
          description="  We provide top-notch services to make your shopping experience smooth,
        reliable, and hassle-free."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 bg-blue-50 rounded-full group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
