"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { IoHomeOutline } from "react-icons/io5";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import { BsBookmark } from "react-icons/bs";
import { MdOutlineAccountCircle } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { LuFileBox } from "react-icons/lu";
import { useGetSaveFavouriteProductQuery } from "@/redux/api/productsApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logOut } from "@/redux/api/features/authSlice";
import { removeCookies } from "@/services/action/removeCookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { clearCart } from "@/redux/api/features/cartSlice";

const categories = [
  { name: "Electronics", sub: ["Mobiles", "Laptops", "TVs"] },
  { name: "Mobile Accessories", sub: ["Chargers", "Cables", "Cases"] },
  { name: "Computers & Laptops", sub: ["Desktops", "Laptops", "Monitors"] },
  {
    name: "Televisions & Home Entertainment",
    sub: ["LED TVs", "Projectors", "Sound Systems"],
  },
  { name: "Kitchen Appliances", sub: ["Mixers", "Ovens", "Microwaves"] },
  { name: "Power Tools", sub: ["Drills", "Saws", "Grinders"] },
  {
    name: "Hardware & Construction",
    sub: ["Nuts & Bolts", "Screws", "Hinges"],
  },
  { name: "Lighting & Electrical", sub: ["Bulbs", "Wires", "Switches"] },
  { name: "Cables & Wires", sub: ["USB", "HDMI", "Power Cables"] },
  { name: "Gaming & Consoles", sub: ["PS5", "Xbox", "Accessories"] },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [dropdown, setDropdown] = useState<number | null>(null);
  const { data: favourite } = useGetSaveFavouriteProductQuery(undefined);
  const items = useAppSelector((store) => store.cart?.items);
  const { user, token } = useAppSelector((store) => store?.auth) as any;
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logOut());
    dispatch(clearCart());
    removeCookies("accessToken");
    toast.info("Logout successful");

    setTimeout(() => {
      router.push("/login");
    }, 100);
  };
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50 max-w-screen mx-auto overflow-x-hidden overflow-y-hidden">
      <div className=" hidden md:block ">
        <div className=" flex justify-between px-10 py-3">
          <h1 className="text-2xl font-bold text-blue-600">
            Sawdia Electronics
          </h1>
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

            <Link href="/cart" className="relative text-gray-700">
              <p className="flex justify-center items-center text-white text-xs bg-red-600 w-5 h-5 absolute -top-2 -right-2 rounded-full">
                {items?.length ? items?.length : 0}
              </p>
              <FaCartPlus size={25} />
            </Link>

            <Link href="/favourite" className="relative text-gray-700">
              <p className="flex justify-center items-center text-white text-xs bg-red-600 w-5 h-5 absolute -top-2 -right-2 rounded-full">
                {favourite?.data?.length ? favourite?.data?.length : 0}
              </p>
              <BsBookmark size={25} />
            </Link>
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
      <div className="mx-auto px-4 py-3 flex justify-between items-center md:px-10">
        <Link href={"/"} className="text-sm font-bold text-blue-600">
          <IoHomeOutline size={25} />
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg border"
        >
          <Menu size={22} />
        </button>
        <nav className="hidden md:flex gap-9">
          {categories.map((cat) => (
            <div key={cat.name} className="relative group">
              <Link
                href={`/category/${cat.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="text-gray-700 hover:text-blue-600 transition flex items-center"
              >
                {cat.name}
              </Link>

              {/* Dropdown */}
              {cat.sub.length > 0 && (
                <div className="absolute left-0 mt-2 w-48 bg-white shadow-md rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
                  {cat.sub.map((sub) => (
                    <Link
                      key={sub}
                      href={`/category/${sub
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-50 border-t shadow-sm">
          <nav className="flex flex-col p-4 space-y-3">
            {/* Added Links for mobile */}
            <Link
              href="/products"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-1"
              onClick={() => setOpen(false)}
            >
              <LuFileBox size={22} /> Products
            </Link>
            <Link
              href={`/dashboard/${user?.role}`}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-1"
              onClick={() => setOpen(false)}
            >
              <TbLayoutDashboard size={22} /> Dashboard
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-1"
              onClick={() => setOpen(false)}
            >
              <FaCartPlus size={22} /> Cart
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition px-2 py-1"
              onClick={() => setOpen(false)}
            >
              <BsBookmark size={22} /> Wishlist
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

            {/* Existing Categories for mobile */}
            {categories.map((cat, index) => (
              <div key={cat.name}>
                <button
                  onClick={() => setDropdown(dropdown === index ? null : index)}
                  className="flex justify-between w-full text-gray-700 hover:text-blue-600 transition px-2 py-1"
                >
                  {cat.name}
                  {cat.sub.length > 0 && <ChevronDown size={14} />}
                </button>
                {dropdown === index &&
                  cat.sub.map((sub) => (
                    <Link
                      key={sub}
                      href={`/category/${sub
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="block pl-4 py-1 text-gray-700 hover:text-blue-600"
                      onClick={() => setOpen(false)}
                    >
                      {sub}
                    </Link>
                  ))}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
