"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { IoHomeOutline } from "react-icons/io5";
import { FaBlogger, FaCartPlus } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { LuFileBox } from "react-icons/lu";
import { GiShoppingBag } from "react-icons/gi";
import { useGetSaveFavouriteProductQuery } from "@/redux/api/productsApi";
import { useAppSelector } from "@/redux/hooks";
import { parentCategoryNames } from "@/constance/global";
import Container from "./Container";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const items = useAppSelector((store) => store.cart?.items);
  const { user, token } = useAppSelector((store) => store?.auth) as any;

  const { data: favourite } = useGetSaveFavouriteProductQuery(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);



  // helpers
  const favCount = favourite?.data?.length ? favourite?.data?.length : 0;
  const cartCount = items?.length ? items?.length : 0;
  const isAdmin = !!(user && (user?.role === "superAdmin" || user?.role === "admin"));

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50 max-w-screen mx-auto">
      <Container className="space-y-5">
        {/* ======= Top bar (Desktop only) ======= */}
        <div className={`hidden md:block ${scrolled ? "absolute -top-20" : ""}`}>
          <div className="flex justify-between pt-2">
            <Link href={"/"} className="text-2xl font-bold text-blue-600">
              Sawdia Electronics
            </Link>

            {/* (Optional) Keep your search here if needed
            <div className="flex w-full max-w-md mx-auto rounded-md border border-gray-200">
              <input
                type="text"
                id="keyword"
                name="keyword"
                placeholder="Enter your keyword"
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none transition duration-200"
              />
              <button className="px-6 py-3 transition duration-200 bg-blue-500 text-white">
                <FaSearch />
              </button>
            </div> */}

            <div className="flex gap-5 mt-3 items-center">
              <Link title="products" href="/products" className="relative text-gray-700 flex gap-1 font-bold">
                Products
              </Link>
              <Link title="about" href="/about-us" className="relative text-gray-700 flex gap-1 font-bold">
                About us
              </Link>
              <Link title="Contact" href="/contact-us" className="relative text-gray-700 flex gap-1 font-bold">
                Contact us
              </Link>
              <Link title="Blog" href="/blog" className="relative text-gray-700 flex gap-1 font-bold">
                Blogs
              </Link>

              <Link href={`/dashboard/${user?.role ?? ""}`} className="relative text-gray-700" title="Dashboard">
                <TbLayoutDashboard size={25} />
              </Link>

              <Link href="/favourite" className="relative text-gray-700" title="Favourite">
                <p className="flex justify-center items-center text-white text-xs bg-red-600 w-5 h-5 absolute -top-2 -right-2 rounded-full">
                  {favCount}
                </p>
                <BsBookmark size={25} />
              </Link>



              {!isAdmin && (
                <div className="flex gap-5">
                  <Link href="/cart" className="relative text-gray-700" title="Cart">
                    <p className="flex justify-center items-center text-white text-xs bg-red-600 w-5 h-5 absolute -top-2 -right-2 rounded-full">
                      {cartCount}
                    </p>
                    <FaCartPlus size={25} />
                  </Link>
                </div>
              )}
              <Link href={`/build-pc`} className="relative text-gray-700" title="Dashboard">
                <button className=" px-4 py-2 bg-red-600 text-white rounded-sm">PC Build</button>
              </Link>
              {token ? (
                ''
              ) : (
                <Link href="/login" className="relative text-gray-700" title="My Account">
                  <MdOutlineAccountCircle size={25} />
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto px-1 md:px-0 flex justify-between lg:gap-20 md:gap-6 gap-0 items-center py-4 border-t">
          <Link href={"/"} className="text-sm font-bold text-blue-600" title="Home">
            <IoHomeOutline size={25} />
          </Link>
          <button onClick={() => setOpen(true)} className="md:hidden p-2 rounded-lg border" aria-label="Open menu">
            <Menu size={22} />
          </button>
          <nav className="hidden md:flex md:justify-between w-full">
            {parentCategoryNames?.map((cat: any) => (
              <div key={cat} className="relative group">
                <Link
                  href={`/products?parentCategory=${encodeURIComponent(cat)}`}
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  {cat}
                </Link>
              </div>
            ))}
          </nav>
        </div>


        {open && (
          <div className="fixed inset-0 z-[60] md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
            <nav className="absolute top-0 left-0 h-full w-[86%] max-w-sm bg-white shadow-xl p-4 overflow-y-auto">
              <div className="mb-4">
                <Link href="/" onClick={() => setOpen(false)} className="text-lg font-semibold">
                  Sawdia Electronics
                </Link>
              </div>

              <div className="space-y-1">
                <Link
                  href="/products"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-2 rounded-lg hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  <GiShoppingBag size={22} /> Products
                </Link>

                {!isAdmin && (
                  <>
                    <Link
                      href="/cart"
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-2 rounded-lg hover:bg-gray-50"
                      onClick={() => setOpen(false)}
                    >
                      <FaCartPlus size={22} /> Cart
                      <span className="ml-auto inline-flex items-center justify-center rounded-full bg-red-600 text-white text-[11px] w-5 h-5">
                        {cartCount}
                      </span>
                    </Link>

                    <Link
                      href="/favourite"
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-2 rounded-lg hover:bg-gray-50"
                      onClick={() => setOpen(false)}
                    >
                      <BsBookmark size={22} /> Favourite
                      <span className="ml-auto inline-flex items-center justify-center rounded-full bg-red-600 text-white text-[11px] w-5 h-5">
                        {favCount}
                      </span>
                    </Link>
                  </>
                )}

                <Link
                  href="/about-us"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-2 rounded-lg hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  <LuFileBox size={22} /> About us
                </Link>

                <Link
                  href="/contact-us"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-2 rounded-lg hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  <LuFileBox size={22} /> Contact us
                </Link>

                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-2 rounded-lg hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  <FaBlogger size={22} /> Blogs
                </Link>

                <Link
                  href={`/dashboard/${user?.role ?? ""}`}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-2 rounded-lg hover:bg-gray-50"
                  onClick={() => setOpen(false)}
                >
                  <TbLayoutDashboard size={22} /> Dashboard
                </Link>
                <Link href={`/build-pc`} className="relative text-gray-700" title="Dashboard">
                  <button className=" px-4 py-2 bg-red-600 text-white rounded-sm">PC Build</button>
                </Link>
                <div className="pt-2">
                  {token ? (
                    ''
                  ) : (
                    <Link
                      href="/login"
                      className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-2 rounded-lg hover:bg-gray-50"
                      onClick={() => setOpen(false)}
                    >
                      <MdOutlineAccountCircle size={22} /> My Account
                    </Link>
                  )}
                </div>

                
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Navbar;
