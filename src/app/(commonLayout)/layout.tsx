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
      <Container className=" space-y-4 md:space-y-10 mt-4">
        {children}
      </Container>
      <Footer />
    </div>
  );
}
