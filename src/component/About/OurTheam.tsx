import Image from "next/image"
import Link from "next/link"
import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa"
import CommonTitle from "../shared/CommonTitle";

const OurTheam = () => {
    const team = [
    { name: "Khairul Islam", role: "Founder & Lead Builder", img: "https://aronic-hardware-shop.myshopify.com/cdn/shop/files/team-1.jpg?v=1613791562&width=1500" },
    { name: "Ayesha Rahman", role: "Operations & Logistics", img: "https://aronic-hardware-shop.myshopify.com/cdn/shop/files/team-2.jpg?v=1613791562&width=1500" },
    { name: "Rafi Chowdhury", role: "Customer Success", img: "https://aronic-hardware-shop.myshopify.com/cdn/shop/files/team-3.jpg?v=1613791562&width=1500" },
];
    return (
        <section className="bg-gray-50">
            <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <CommonTitle title={{ a: "Expert", b: "Theme" }} />

                <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {team.map((m) => (
                        <li key={m.name} className="group">
                            <div className="relative mx-auto h-[500px] w-full overflow-hidden rounded-xl">
                                <Image
                                    src={m.img}
                                    alt={m.name}
                                    fill
                                    priority
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                                />


                                <div
                                    className="pointer-events-nonr absolute inset-x-0 bottom-0 h-1/2
                             translate-y-full group-hover:translate-y-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent
                              transition-transform duration-500 ease-out will-change-transform
              "
                                >
                                    <div className=" flex gap-6 absolute bottom-8 justify-center items-center text-white z-20 w-full">
                                        <Link className=" border w-10 flex justify-center items-center duration-300 transform transition-all h-10 rounded-full hover:bg-green-400" href={'#'}><FaInstagram size={30} /></Link>
                                        <Link className=" border w-10 flex justify-center items-center duration-300 transform transition-all h-10 rounded-full hover:bg-green-400" href={'#'}><FaTelegram size={30} /></Link>
                                        <Link className=" border w-10 flex justify-center items-center duration-300 transform transition-all h-10 rounded-full hover:bg-green-400" href={'#'}><FaFacebook size={30} /></Link>
                                    </div>
                                </div>
                                <div className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/5 to-transparent" />
                            </div>

                            <h3 className="mt-4 text-center text-lg font-semibold text-gray-900">
                                {m.name}
                            </h3>
                            <p className="text-center text-sm text-gray-600">{m.role}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}


export default OurTheam