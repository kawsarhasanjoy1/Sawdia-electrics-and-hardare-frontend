export const getSingleProduct = async (id: string) => {
  const res = await fetch(`https://sawdia-electrics-and-hardare-backend.onrender.com/product/${id}`, {
    cache: "force-cache",
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch single product");
  }
  return res?.json();
};
