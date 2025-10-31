// app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { BadgeCheck, Truck, Shield, Star, Wrench, Sparkles, Mail, Phone, MapPin } from "lucide-react";
import Container from "@/component/shared/Container";
import OurServices from "@/component/Home/Services/OurServicest";
import CommonTitle from "@/component/shared/CommonTitle";
import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa";
import AboutHero from "@/component/About/AboutHero";
import TimeLine from "@/component/About/TimeLine";
import OurTheam from "@/component/About/OurTheam";

export const metadata: Metadata = {
    title: "About Us | Sawdia Electronics",
    description:
        "Sawdia Electronics is a Bangladesh-based electronics & hardware shop offering genuine components, fast delivery, and reliable support for builders, gamers, and businesses.",
    openGraph: {
        title: "About Sawdia Electronics",
        description:
            "Genuine parts, fair pricing, fast delivery, and real support—built for enthusiasts and businesses.",
        url: "https://your-domain.com/about",
        siteName: "Sawdia Electronics",
        images: [{ url: "/images/og-about.jpg", width: 1200, height: 630, alt: "Sawdia Electronics" }],
        locale: "en_US",
        type: "website",
    },
};


export default function AboutPage() {
    return (
        <>
            <AboutHero />
            <OurServices />
            <TimeLine />
            <OurTheam />
        </>
    );
}
