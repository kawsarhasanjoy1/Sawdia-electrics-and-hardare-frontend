import Container from "@/component/shared/Container";
import Footer from "@/component/shared/Footer";
import Navbar from "@/component/shared/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
}
