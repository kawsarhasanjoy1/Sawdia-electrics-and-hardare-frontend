import { ReactNode } from "react";

const Container = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`max-w-[1500px] px-2 md:px-10 mx-auto ${className || ""} `}>
      {children}
    </div>
  );
};

export default Container;
