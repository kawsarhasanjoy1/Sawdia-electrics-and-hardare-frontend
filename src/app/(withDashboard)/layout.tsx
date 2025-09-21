import Drawer from "@/component/shared/Drawer";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-12 min-h-screen md:flex">
      <div
        className="
            bg-white h-0
          md:col-span-2 md:fixed md:top-0 md:left-0 md:h-screen md:w-60
        "
      >
        <Drawer />
      </div>
      <div
        className="
          col-span-12 md:p-6 p-2
          md:flex-1 md:ml-60
        "
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
