import ProductDetails from "@/component/Home/Products/ProductDetails";
import { getSingleProduct } from "@/hooks/products/getSingleProducts";
import { generateMetadata } from "@/utils/ganeratedMeta";
export const metadata = generateMetadata({
  title: "Product Details || Electrics & Hardware",
  description: "Home page | Sawdia Electrics & Hardware",
  follow: true,
  index: false,
});
const ProductDetailsPage = async ({ params }: any) => {
  const { productId } = await params;
  const data = await getSingleProduct(productId);

  return <div>{data?.data && <ProductDetails product={data.data} />}</div>;
};

export default ProductDetailsPage;
