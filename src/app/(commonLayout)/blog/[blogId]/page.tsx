import { getSingleBlog } from "@/hooks/blogs/getBlogs";
import { generateMetadata } from "@/utils/ganeratedMeta";
import Image from "next/image";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Details blog || Sawdia Electrics & Hardware",
  description: "Home page | Sawdia Electrics & Hardware",
  follow: true,
  index: false,
});

const BlogDetailsPage = async ({ params }: any) => {
  const { blogId } = await params;
  const data = await getSingleBlog(blogId);
  const blog = await data?.data;

  return (
    <div className="container mx-auto md:px-4 py-12">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative w-full h-48 md:h-[700px]">
          <Image
            src={blog?.image}
            alt={blog?.title}
            fill
            quality={1000}
            className=" object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-8 md:p-12">
          {/* Title */}
          <h1 className="text-2xl md:text-5xl font-extrabold mb-4 text-gray-900">
            {blog?.title}
          </h1>

          {/* Author & Date */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 text-gray-500">
            <div className="flex items-center gap-4 mb-2 md:mb-0">
              <div className="flex flex-col">
                <span className="font-semibold">{blog?.userId?.name}</span>
                <span className="text-sm">{blog?.userId?.email}</span>
              </div>
            </div>
            <div className="text-sm md:text-base">
              {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-10">
            {blog?.content}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-10" />

          {/* Share Buttons / Footer */}
          <div className="flex items-center gap-4 text-gray-500">
            <span>Share:</span>
            <Link href="#" className="hover:text-blue-600 transition-colors">
              Twitter
            </Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">
              Facebook
            </Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
