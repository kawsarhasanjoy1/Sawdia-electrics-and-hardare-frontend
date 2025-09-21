import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogMainCard = ({ blog }: { blog: any }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition-all overflow-hidden">
      <div className="relative w-full h-96">
        <Image
          quality={100}
          src={blog.image}
          alt={blog.title}
          fill
          className="object-contain border w-full"
        />
      </div>

      <div className="p-5">
        <h2 className="text-xl font-bold mb-1">{blog?.title}</h2>
        <div className="text-sm text-gray-500 mb-3 flex gap-3 items-center justify-between">
          <span className=" flex flex-col">
            <span>{blog?.userId?.name}</span>
            <span>{blog?.userId?.email}</span>
          </span>
          <span>{new Date(blog?.createdAt).toLocaleDateString()} </span>
        </div>
        <p className="text-gray-700 mb-4 line-clamp-2">{(blog?.content)}</p>
        <Link
          href={`/blog/${blog?._id}`}
          className="text-blue-600 hover:underline font-medium"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogMainCard;
