import { USER_ROLE } from "@/constance/global";
import { FaBlogger, FaGift, FaPercent, FaShoppingCart, FaTicketAlt, FaUserShield } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { GiPriceTag } from "react-icons/gi";
import { IoAddCircleOutline } from "react-icons/io5";
import { LuFileBox } from "react-icons/lu";
import {
  MdAccountCircle,
  MdCategory,
  MdLibraryAdd,
  MdOutlineCategory,
  MdOutlineDashboard,
  MdOutlineShoppingCart,
  MdPayment,
  MdReviews,
} from "react-icons/md";

export type UserRole = keyof typeof USER_ROLE;

const SideBarItem = (role: UserRole) => {
  const roleMenu: Record<string, any>[] = [];

  switch (role) {
    case USER_ROLE.superAdmin:
      roleMenu.push(
        {
          title: "Dashboard",
          path: `/${role}`,
          icon: MdOutlineDashboard,
        },
        {
          title: "Products",
          icon: FaShoppingCart,
          children: [
            {
              title: "All Products",
              path: `/${role}/products`,
              icon: LuFileBox,
            },
            {
              title: "Create Product",
              path: `/${role}/products/create-product`,
              icon: IoAddCircleOutline,
            },
          ],
        },
        {
          title: "Categories",
          icon: MdCategory,
          children: [
            {
              title: "Create Parent Category",
              path: `/${role}/category/parent-category/create-category`,
              icon: IoAddCircleOutline,
            },
            {
              title: "Parent Categories",
              path: `/${role}/category/parent-category`,
              icon: LuFileBox,
            },
            {
              title: "Create Sub Category",
              path: `/${role}/category/sub-category/create-category`,
              icon: IoAddCircleOutline,
            },
            {
              title: "Sub Categories",
              path: `/${role}/category/sub-category`,
              icon: LuFileBox,
            },
          ],
        },
        {
          title: "Brands",
          icon: GiPriceTag,
          children: [
            {
              title: "Brands",
              path: `/${role}/brand`,
              icon: MdOutlineCategory,
            },
            {
              title: "Create Brand",
              path: `/${role}/brand/create-brand`,
              icon: IoAddCircleOutline,
            },
          ],
        },
        {
          title: "Coupons",
          icon: FaTicketAlt,
          children: [
            {
              title: "Coupons",
              path: `/${role}/coupon`,
              icon: FaGift,
            },
            {
              title: "Create Coupon",
              path: `/${role}/coupon/create-coupon`,
              icon: IoAddCircleOutline,
            },
          ],
        },
        {
          title: "Orders",
          path: `/${role}/orders`,
          icon: MdOutlineShoppingCart,
        },
        {
          title: "Create Admin",
          path: `/${role}/create-admin`,
          icon: FaUserShield,
        },
        {
          title: "Users",
          path: `/${role}/users`,
          icon: FaUsersGear,
        },
        {
          title: "Blogs",
          icon: FaBlogger,
          children: [
            {
              title: "All Blogs",
              path: `/${role}/blog`,
              icon: FaBlogger,
            },
            {
              title: "Create Blog",
              path: `/${role}/blog/create-blog`,
              icon: MdLibraryAdd,
            },
          ],
        },
        {
          title: "Reviews",
          path: `/${role}/reviews`,
          icon: MdReviews,
        },
        {
          title: "Profile",
          path: `/${role}/my-profile`,
          icon: MdAccountCircle,
        }
      );
      break;
    case USER_ROLE.admin:
      roleMenu.push(
        {
          title: "Dashboard",
          path: `/${role}`,
          icon: MdOutlineDashboard,
        },
        {
          title: "Products",
          icon: FaShoppingCart,
          children: [
            {
              title: "All Products",
              path: `/${role}/products`,
              icon: LuFileBox,
            },
            {
              title: "Create Product",
              path: `/${role}/products/create-product`,
              icon: FaPercent,
            },
          ],
        },
        {
          title: "Categories",
          icon: MdCategory,
          children: [
            {
              title: "Create Parent Category",
              path: `/${role}/category/parent-category/create-category`,
              icon: IoAddCircleOutline,
            },
            {
              title: "Parent Categories",
              path: `/${role}/category/parent-category`,
              icon: LuFileBox,
            },
            {
              title: "Create Sub Category",
              path: `/${role}/category/sub-category/create-category`,
              icon: IoAddCircleOutline,
            },
            {
              title: "Sub Categories",
              path: `/${role}/category/sub-category`,
              icon: LuFileBox,
            },
          ],
        },
        {
          title: "Brands",
          icon: GiPriceTag,
          children: [
            {
              title: "Brands",
              path: `/${role}/brand`,
              icon: MdOutlineCategory,
            },
            {
              title: "Create Brand",
              path: `/${role}/brand/create-brand`,
              icon: IoAddCircleOutline,
            },
          ],
        },
        {
          title: "Orders",
          path: `/${role}/orders`,
          icon: MdOutlineShoppingCart,
        },
        {
          title: "Users",
          path: `/${role}/users`,
          icon: FaUsersGear,
        },
        {
          title: "Blogs",
          icon: FaBlogger,
          children: [
            {
              title: "All Blogs",
              path: `/${role}/blog`,
              icon: FaBlogger,
            },
            {
              title: "Create Blog",
              path: `/${role}/blog/create-blog`,
              icon: MdLibraryAdd,
            },
          ],
        },
        {
          title: "Reviews",
          path: `/${role}/reviews`,
          icon: MdReviews,
        },
        {
          title: "Profile",
          path: `/${role}/my-profile`,
          icon: MdAccountCircle,
        }
      );
      break;
    case USER_ROLE.user:
      roleMenu.push(
        {
          title: "Dashboard",
          path: `/${role}`,
          icon: MdOutlineDashboard,
        },
        {
          title: "Order",
          path: `/${role}/my-order`,
          icon: MdOutlineShoppingCart,
        },
        {
          title: "Payment-history",
          path: `/${role}/payment-history`,
          icon: MdPayment,
        },
        {
          title: "Review",
          path: `/${role}/my-review`,
          icon: MdReviews,
        },
        {
          title: "Profile",
          path: `/${role}/my-profile`,
          icon: MdAccountCircle,
        }
      );
  }
  return [...roleMenu];
};

export default SideBarItem;
