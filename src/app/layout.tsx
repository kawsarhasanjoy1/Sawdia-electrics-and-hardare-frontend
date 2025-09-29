import { Geist, Geist_Mono,  } from "next/font/google";
import "./globals.css";
import Providers from "@/libs/Provider";
import { ToastContainer } from "react-toastify";
import { generateMetadata } from "@/utils/ganeratedMeta";
import "@smastrom/react-rating/style.css";


export const metadata = generateMetadata({
  title: "Sawdia Electrics & Hardware",
  description: "Home page | Sawdia Electrics & Hardware",
  follow: true,
  index: false,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
