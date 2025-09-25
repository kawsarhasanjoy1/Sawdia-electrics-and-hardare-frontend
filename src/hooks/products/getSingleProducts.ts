export const getSingleProduct = async (id: string) => {
  const res = await fetch(`http://localhost:5000/api/v1/product/${id}`, {
    cache: "force-cache",
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch single product");
  }
  return res?.json();
};
