import UpdateProductForm from "@/component/dashboard/superAdmin/UpdateProducts";
import { use } from "react";



const UpdateProductPage =({ params }: any) => {
  const {productId} = use(Promise.resolve(params))
  return <UpdateProductForm productId={productId} />;
}


export default UpdateProductPage;