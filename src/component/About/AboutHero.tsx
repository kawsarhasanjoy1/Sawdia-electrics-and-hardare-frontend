import { Sparkles, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const AboutHero = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
            <div className="absolute inset-0 -z-10 opacity-10">
                <Sparkles className="absolute right-10 top-10 size-24" />
                <Star className="absolute left-8 bottom-8 size-16" />
            </div>

            <div className="mx-auto l px-4 sm:px-6 lg:px-8 pt-14 pb-10 md:pt-20 md:pb-16">
                <div className="grid gap-10 md:grid-cols-2 md:items-center">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                            Built for builders.<br className="hidden md:block" />
                            Powered by <span className="text-green-600">genuine parts</span>.
                        </h1>
                        <p className="mt-5 text-gray-600 text-base md:text-lg leading-relaxed">
                            We’re an electronics and hardware shop that believes in clear advice, fair pricing, and reliable delivery.
                            Whether you’re assembling your first PC or managing procurement for a growing team, we’ve got your back.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                href="#"
                                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-5 py-3 text-white font-semibold hover:bg-green-700 transition"
                            >
                                Start a PC Build
                            </Link>
                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-gray-800 font-semibold hover:bg-gray-50 transition"
                            >
                                Browse Products
                            </Link>
                        </div>
                    </div>

                    <div className="relative aspect-[4/3] w-full">
                        <Image
                            src="https://pcbros.tech/cdn/shop/products/PXL_20220407_135813056.PORTRAIT.jpg?v=1711649579&width=3979"
                            alt="Workbench with components and tools"
                            fill
                            priority
                            className="rounded-2xl object-cover shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}


export default AboutHero