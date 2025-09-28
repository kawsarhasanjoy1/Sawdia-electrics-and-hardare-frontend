import NotFound from "@/app/not-found";
import BlogMainCard from "@/component/Home/Blog/BlogMainCard";
import BlogSidebar from "@/component/Home/Blog/BlogSidebar";
import { getBlogApi, getParentCategoryAPi } from "@/hooks/blogs/getBlogs";
import { generateMetadata } from "@/utils/ganeratedMeta";

export const metadata = generateMetadata({
  title: "Blog || Sawdia Electrics & Hardware",
  description: "Home page | Sawdia Electrics & Hardware",
  follow: true,
  index: false,
});

const BlogPage = async () => {
  const res = await getBlogApi();

  const blogs = res?.data?.data;
  const categoryData = await getParentCategoryAPi();
  const categories = categoryData?.data?.data;

  return (
    <div>
      {blogs?.length > 0 ? (
        <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-3 space-y-6">
            {blogs?.map((blog: any) => (
              <BlogMainCard key={blog?._id} blog={blog} />
            ))}
          </div>

          <div>
            <BlogSidebar categories={categories} recentPosts={blogs} />
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default BlogPage;
