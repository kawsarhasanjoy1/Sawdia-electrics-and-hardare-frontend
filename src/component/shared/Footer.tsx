import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">Sawdia</h2>
          <p className="text-sm">
            Your trusted partner for premium electronics and reliable hardware.
          </p>
        </div>


        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-blue-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-blue-400">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-blue-400">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/favourite" className="hover:text-blue-400">
                Favourite
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-blue-400">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Customer Support
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-blue-400">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-400">
                Shipping & Delivery
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-400">
                Return Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-400">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <p>📍 Bangla moto, kazi nazrul isla avu, Dhaka, Bangladesh</p>
          <p>📞 +880 1234-567890</p>
          <p>✉️ support@sawdia.com</p>
          <p>🕒 Mon - Sat: 9:00am - 8:00pm</p>
          <div className="flex space-x-4 mt-3">
           <Link
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 text-2xl transition-all duration-200"
        >
          <FaFacebook />
        </Link>
        <Link
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 text-2xl transition-all duration-200"
        >
          <FaInstagram />
        </Link>
        <Link
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 text-2xl transition-all duration-200"
        >
          <FaYoutube />
        </Link>
        <Link
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 text-2xl transition-all duration-200"
        >
          <FaLinkedin />
        </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Sawdia Electronics & Hardware. All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;
