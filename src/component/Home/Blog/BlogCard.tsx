import { formatDate } from "@/utils/formateDate";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: any }) => {
  return (
    <div className=" border border-gray-50 bg-gray-100">
      <div>
        <Image
          className="w-full h-[300px] object-cover object-center"
          src={blog?.image}
          alt="Title"
          width={600}
          height={600}
        />
      </div>
      <div className=" px-4 space-y-3 my-3">
        <div className=" flex gap-10">
          <p>{formatDate(blog?.createdAt)}</p>
          <Link href={"#"}>Created By: {blog?.userId?.name}</Link>
        </div>
        <div className=" space-y-3">
          <p className="text black hover:text-blue-400 transition-all duration-200 text-2xl cursor-pointer">
            {blog?.title.slice(0, 20) + "..."}
          </p>
          <p>{blog?.content.slice(0, 40)}</p>
          <Link
            className=" hover:text-blue-400 transition-all duration-200 underline"
            href={`blog/${blog?._id}`}
          >
            READ MORE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
