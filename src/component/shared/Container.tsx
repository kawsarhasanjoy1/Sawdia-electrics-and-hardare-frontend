import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className=" w-full px-2 md:px-20 mx-auto space-y-20">{children}</div>;
};

export default Container;
