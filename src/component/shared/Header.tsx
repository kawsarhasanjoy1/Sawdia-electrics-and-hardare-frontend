"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { IoHomeOutline } from "react-icons/io5";
import { FaBlogger, FaCartPlus, FaSearch } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { LuFileBox } from "react-icons/lu";
import { useGetSaveFavouriteProductQuery } from "@/redux/api/productsApi";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { removeAllToken } from "@/utils/removeAllToken";
import { GiShoppingBag } from "react-icons/gi";
import { parentCategoryNames } from "@/constance/global";
import Container from "./Container";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const items = useAppSelector((store) => store.cart?.items);
  const { user, token } = useAppSelector((store) => store?.auth) as any;
  const router = useRouter();
  const { data: favourite } = useGetSaveFavouriteProductQuery(undefined);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const handleLogout = async () => {
    await removeAllToken();
    toast.info("Logout successful");
    router.push("/login");
    // window.location.reload()
  };
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50 max-w-screen mx-auto overflow-x-hidden overflow-y-hidden ">
      <Container className="space-y-5">

        <div className={`hidden md:block ${scrolled ? 'absolute -top-20' : ''}`}>
          <div className=" flex justify-between pt-2">
            <Link href={"/"} className="text-2xl font-bold text-blue-600">
              Sawdia Electronics
            </Link>
            <div className="flex w-full max-w-md mx-auto rounded-md border border-gray-200">
              <input
                type="text"
                id="keyword"
                name="keyword"
                placeholder="Enter your keyword"
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none transition duration-200"
              />
              <button className=" px-6 py-3 transition duration-200 bg-blue-500 text-white">
                <FaSearch />
              </button>
            </div>

            <div className="flex gap-5 mt-3">
              <Link
                title="products"
                href="/products"
                className="relative text-gray-700 flex gap-1 font-bold"
              >
                {/* <LuFileBox size={25} /> */}
                Products
              </Link>
              <Link
                title="about"
                href="/about-us"
                className="relative text-gray-700 flex gap-1 font-bold"
              >
                {/* <LuFileBox size={25} /> */}
                About us
              </Link>
              <Link
                title="Contact"
                href="/contact-us"
                className="relative text-gray-700 flex gap-1 font-bold"
              >
                {/* <LuFileBox size={25} /> */}
                Contact us
              </Link>
              {/* <Link
                title="Categories"
                href="/categories"
                className="relative text-gray-700 flex gap-1 font-bold"
              >
                Category
              </Link> */}
              <Link
                title="Blog"
                href="/blog"
                className="relative text-gray-700 flex gap-1 font-bold"
              >
                {/* <LuFileBox size={25} /> */}
                Blogs
              </Link>
              <Link
                href={`/dashboard/${user?.role}`}
                className="relative text-gray-700"
              >
                <TbLayoutDashboard size={25} />
              </Link>
              <Link href="/favourite" className="relative text-gray-700">
                <p className="flex justify-center items-center text-white text-xs bg-red-600 w-5 h-5 absolute -top-2 -right-2 rounded-full">
                  {favourite?.data?.length ? favourite?.data?.length : 0}
                </p>
                <BsBookmark size={25} />
              </Link>
              {user && user?.role === "superAdmin" || user?.role == 'admin' ? (
                ''
              ) : (
                <div className=" flex gap-5">
                  <Link href="/cart" className="relative text-gray-700">
                    <p className="flex justify-center items-center text-white text-xs bg-red-600 w-5 h-5 absolute -top-2 -right-2 rounded-full">
                      {items?.length ? items?.length : 0}
                    </p>
                    <FaCartPlus size={25} />
                  </Link>

                </div>
              )}
              {token ? (
                <button
                  onClick={() => handleLogout()}
                  className="relative px-3 mb-3 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login" className="relative text-gray-700">
                  <MdOutlineAccountCircle size={25} />
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="mx-auto px-1 md:px-0 flex justify-between lg:gap-20 md:gap-6 gap-0 items-center py-4 border-t">

          <Link href={"/"} className="text-sm font-bold text-blue-600">
            <IoHomeOutline size={25} />
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg border"
          >
            <Menu size={22} />
          </button>

          <nav className="hidden md:flex md:justify-between w-full">
            {parentCategoryNames?.map((cat: any) => (
              <div key={cat} className="relative group">
                <Link
                  href={`/products?parentCategory=${encodeURIComponent(
                    cat
                  )}`}
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  {cat}
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {open && (
          <div className="md:hidden bg-gray-50 border-t shadow-sm">
            <nav className="flex flex-col p-4 space-y-3">
              <Link
                href="/products"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-1"
                onClick={() => setOpen(false)}
              >
                <GiShoppingBag size={22} /> Products
              </Link>

              {(user && user?.role == "superAdmin") || user?.role == "admin" ? (
                ""
              ) : (
                <div>
                  <Link
                    href="/cart"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-1"
                    onClick={() => setOpen(false)}
                  >
                    <FaCartPlus size={22} /> Cart
                  </Link>
                  <Link
                    href="/favourite"
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-1"
                    onClick={() => setOpen(false)}
                  >
                    <BsBookmark size={22} /> Favourite
                  </Link>
                </div>
              )}
              <Link
                title="about"
                href="/about-us"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-1"
              >
                <LuFileBox size={22} /> About us
              </Link>
              <Link
                title="contact"
                href="/contact-us"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-1"
              >
                <LuFileBox size={22} /> Contact us
              </Link>
              <Link
                title="Blog"
                href="/blog"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-1"
              >
                <FaBlogger size={22} /> Blogs
              </Link>
              <Link
                href={`/dashboard/${user?.role}`}
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-1"
                onClick={() => setOpen(false)}
              >
                <TbLayoutDashboard size={22} /> Dashboard
              </Link>

              {token ? (
                <button
                  onClick={() => handleLogout()}
                  className=" px-3 text-sm w-20 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-1"
                  onClick={() => setOpen(false)}
                >
                  <MdOutlineAccountCircle size={22} /> My Account
                </Link>
              )}
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

export default Navbar;
