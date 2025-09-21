import { RegisterForm } from "@/component/RegisterForm/RegisterForm";
import { generateMetadata } from "@/utils/ganeratedMeta";

export const metadata = generateMetadata({
  title: "Register | Sawdia Electrics & Hardware",
  description:
    "Secure Register to Sawdia Electronics. Register to manage your orders, wishlist, and account settings.",
  follow: true,
  index: false,
});

const SignUp = () => {
  return <RegisterForm />;
};

export default SignUp;
