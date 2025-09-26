export const getSingleProduct = async (id: string) => {
  const res = await fetch(`https://sawdia-electrics-and-hardare-backend.onrender.com/api/v1/product/${id}`, {
    cache: "force-cache",
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch blogs: ${res.status} ${res.statusText} – ${body}`
    );
  }
  return res.json();
};
