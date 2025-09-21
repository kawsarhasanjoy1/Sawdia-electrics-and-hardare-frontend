import CommonTitle from "@/component/shared/CommonTitle";
import BranchCard from "./BrancCard";
import { branches } from "@/constance/branche";


const Branch = () => {
  

  return (
    <section className="bg-gray-50 py-16 px-8 w-full">
      <CommonTitle
        title={{ a: "Our", b: "Brancehes" }}
        description=" Explore our branches across different cities. Find the closest one to
        you"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {branches?.map((branch, idx) => (
          <BranchCard key={idx} branch={branch} />
        ))}
      </div>
    </section>
  );
};

export default Branch;
