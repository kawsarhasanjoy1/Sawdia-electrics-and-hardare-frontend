'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

const CommonBanner = ({
    title = "Welcome to Our Store",
    subtitle = "Explore top products and exclusive offers",
    background = "https://pcbros.tech/cdn/shop/products/PXL_20220407_135813056.PORTRAIT.jpg?v=1711649579&width=3979"
}) => {
    const path = usePathname()

    return (
        <div
            className="relative w-full space-y-3 h-60 md:h-[500px] flex flex-col justify-center items-center text-center text-white bg-cover bg-center"
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10 px-4">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">{title}</h1>
                <p className="text-sm md:text-lg text-gray-200">{subtitle}</p>
                <div className=" flex gap-4 justify-center items-center">
                    <Link className="hover:text-blue-400 duration-200" href={'/'}>Home</Link> \
                    <Link className="hover:text-blue-400 duration-200" href={path}>{path.replace('/', '')}</Link>
                </div>
            </div>
        </div>
    );
};

export default CommonBanner;
