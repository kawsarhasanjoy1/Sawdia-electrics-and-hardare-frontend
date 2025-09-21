"use client";

import Image from "next/image";
import Link from "next/link";

import CommonTitle from "@/component/shared/CommonTitle";
import { useGetCouponsQuery } from "@/redux/api/couponApi";

const SeasonalOffersPage = () => {
  const { data } = useGetCouponsQuery(undefined);
  const coupon = data?.data;

  return (
    <section className="relative w-full bg-gradient-to-br from-[#fdfbfb] via-[#ebedee] to-[#e6e9f0] py-20">
      {/* soft glowing background accents */}
      {/* <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[40rem] h-[40rem] rounded-full bg-purple-300/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[40rem] h-[40rem] rounded-full bg-pink-300/20 blur-3xl" />
      </div> */}

      <div className="relative container mx-auto px-4">
        <CommonTitle
          title={{ a: "Seasonal", b: "Offers" }}
          description="Exclusive seasonal discounts you won’t find anywhere else—grab them before they’re gone!"
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          {/* === BIG FEATURED OFFER === */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-[34px] shadow-2xl group w-full h-[300px] sm:h-[400px] lg:h-[500px]">
            <Image
              src="https://thumbs.dreamstime.com/b/discount-stamp-vector-clip-art-33305813.jpg"
              alt="Mega Discount"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-black/20" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 backdrop-blur-md bg-white/20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-wide drop-shadow-lg">
                Mega Discount
              </h2>

              {coupon && coupon.length > 0 ? (
                <div className="mt-3 sm:mt-5 space-y-2 sm:space-y-3 text-white">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                    Get up to{" "}
                    <span className="font-bold text-yellow-300">
                      {coupon[0].amount}%
                    </span>{" "}
                    off on electronics when you shop over{" "}
                    <span className="font-bold">{coupon[0].minPurchase}৳</span>.
                  </p>
                  <Link href="/products">
                    <button className="inline-block px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-700 hover:to-indigo-700 font-semibold text-white shadow-lg transition-all duration-300 text-sm sm:text-base">
                      Shop Now
                    </button>
                  </Link>
                </div>
              ) : (
                <p className="mt-3 sm:mt-5 text-sm sm:text-base font-medium text-white">
                  No seasonal discounts available right now.
                </p>
              )}
            </div>
          </div>

          {/* === TWO PREMIUM MINI DEALS === */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {[
              {
                img: "https://istockbd.com/cdn/shop/products/Dell-XPS-15-price-in-Bangladesh_iStock-BD.jpg?v=1669620788",
                label: "Laptop Deals",
                badge: "from-indigo-500 to-cyan-500",
              },
              {
                img: "https://files.refurbed.com/ii/iphone-14-pro-max-1662626703.jpg",
                label: "Smartphone Sale",
                badge: "from-rose-500 to-orange-400",
              },
            ].map(({ img, label, badge }, idx) => (
              <div
                key={idx}
                className="relative h-[200px] sm:h-[250px] lg:h-[260px] rounded-[28px] overflow-hidden shadow-xl group w-full"
              >
                <Image
                  src={img}
                  alt={label}
                  width={400}
                  height={400}
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110 w-full h-full"
                />
                <div
                  className={`absolute bottom-3 sm:bottom-5 left-3 sm:left-5 px-3 sm:px-5 py-1 sm:py-2 rounded-full text-white font-semibold text-xs sm:text-sm bg-gradient-to-r ${badge} shadow-md backdrop-blur-sm`}
                >
                  {label}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent group-hover:from-black/40 transition duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalOffersPage;
