import { Search } from "lucide-react";
import React from "react";

const BlogSidebar = ({
  categories,
  recentPosts,
}: {
  categories: Record<string, any>;
  recentPosts: Record<string, any>;
}) => {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="p-4 border rounded-lg shadow-sm bg-white">
        <h2 className="font-semibold mb-2">Search</h2>
        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search blogs..."
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button className="p-2 border rounded hover:bg-gray-100">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 border rounded-lg shadow-sm bg-white">
        <h2 className="font-semibold mb-2">Categories</h2>
        <ul className="space-y-2 text-gray-600">
          {categories?.map((cat: any, idx: number) => (
            <li
              key={idx}
              className="cursor-pointer hover:text-black transition-colors"
            >
              {cat?.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border rounded-lg shadow-sm bg-white">
        <h2 className="font-semibold mb-2">Recent Posts</h2>
        <ul className="space-y-2 text-gray-600 text-sm">
          {recentPosts?.slice(0, 3)?.map((post: any) => (
            <li
              key={post._id}
              className="hover:text-black cursor-pointer transition-colors"
            >
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogSidebar;
