export async function getBlogApi() {
  const url =
    "https://sawdia-electrics-and-hardare-backend.onrender.com/api/v1/blog";
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch blogs: ${res.status} ${res.statusText} – ${body}`
    );
  }
  return res.json();
}

export const getSingleBlog = async (id: string) => {
  const res = await fetch(
    `https://sawdia-electrics-and-hardare-backend.onrender.com/api/v1/blog/${id}`,
    {
      cache: "no-store",
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch blog");
  return await res.json();
};

export const getParentCategoryAPi = async () => {
  const res = await fetch(
    `https://sawdia-electrics-and-hardare-backend.onrender.com/api/v1/parent-category`,
    {
      cache: "force-cache",
      next: { revalidate: 10 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return res.json();
};
