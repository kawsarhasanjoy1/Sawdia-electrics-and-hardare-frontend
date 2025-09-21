import { LoginForm } from "@/component/Login/LoginForm";
import { generateMetadata } from "@/utils/ganeratedMeta";

export const metadata = generateMetadata({
  title: "Login | Sawdia Electrics & Hardware",
  description:
    "Secure login to Sawdia Electronics. Sign in to manage your orders, wishlist, and account settings.",
  follow: true,
  index: false,
});

const Login = () => {
  return <LoginForm />;
};

export default Login;
