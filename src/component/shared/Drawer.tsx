"use client";
import { useState } from "react";
import Link from "next/link";
import { MdLogout, MdOutlineClose } from "react-icons/md";
import { ChevronDown } from "lucide-react";
import SideBarItem from "@/utils/sidebar/sidebarItem";
import { CgMenuLeftAlt } from "react-icons/cg";
import { useAppSelector } from "@/redux/hooks";
import { FaHome } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { removeAllToken } from "@/utils/removeAllToken";


const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );

  const { user } = useAppSelector((store) => store.auth) as any;
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter();
  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleLogout = async () => {
    await removeAllToken();
    toast.info("Logout successful");
    router.push("/login");
  };

  const renderMenu = (items: any[], level = 0) => {
    return (
      <div className="">
        <ul className={`${level === 0 ? "space-y-2" : "pl-8 space-y-1"}`}>
          {items.map((item, idx) => (
            <li key={`${item.title}-${idx}`}>
              {item.children ? (
                <>
                  <button
                    type="button"
                    className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                    onClick={() => toggleDropdown(item.title)}
                  >
                    {item.icon && (
                      <item.icon className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                    )}
                    <span className="flex-1 ms-3 text-left whitespace-nowrap">
                      {item.title}
                    </span>
                    <ChevronDown
                      className={`w-3 h-3 transform transition-transform ${openDropdowns[item.title] ? "rotate-180" : "rotate-0"
                        }`}
                    />
                  </button>
                  {openDropdowns[item.title] &&
                    renderMenu(item.children, level + 1)}
                </>
              ) : (
                <Link
                  href={`/dashboard/${item.path}`}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  onClick={toggleDrawer}
                >
                  {item.icon && (
                    <item.icon className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                  )}
                  <span className="ms-3 flex-1 whitespace-nowrap">
                    {item.title}
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <>
      {/* Button to show drawer on small screens */}
      <div className="md:hidden text-center relative h-screen">
        <button
          className="text-white fixed z-10 left-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          onClick={toggleDrawer}
        >
          <CgMenuLeftAlt size={20} />
        </button>
      </div>

      {/* Drawer Component */}
      <aside
        id="drawer-navigation"
        className={`fixed md:static top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800 md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <h5
          id="drawer-navigation-label"
          className="text-base font-semibold  uppercase text-blue-500"
        >
          Dashboard
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          className="md:hidden text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <MdOutlineClose size={22} />
          <span className="sr-only">Close menu</span>
        </button>

        {/* Render Menu */}
        <div className="py-4 overflow-y-auto">
          {renderMenu(SideBarItem(user?.role), 0)}
        </div>
        <span className="block w-full border-t border-gray-300 border-1 my-9"></span>

        <div>
          <Link
            href={"/"}
            className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
          >
            <FaHome className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />

            <span className="flex-1 ms-3 text-left whitespace-nowrap">
              Home
            </span>
          </Link>
          <button
            type="button"
            onClick={() => handleLogout()}
            className={`flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
          >
            <MdLogout className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />

            <span className="flex-1 ms-3 text-left whitespace-nowrap">
              LogOut
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Drawer;
