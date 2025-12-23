import { Link } from "react-router-dom";
import {
  Globe,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden
                 bg-gradient-to-b
                 from-[#FFF7CC]   /* mango */
                 via-[#FFE4C7]    /* peach */
                 to-white
                 border-t border-gray-200"
    >
      {/* ================= FRUITY BLOBS ================= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Lemon */}
        <div className="absolute -top-24 -left-24 h-[300px] w-[300px]
                        rounded-full bg-yellow-300/40 blur-3xl" />

        {/* Apple */}
        <div className="absolute bottom-0 -right-24 h-[260px] w-[260px]
                        rounded-full bg-red-400/30 blur-3xl" />

        {/* Leaf */}
        <div className="absolute top-1/3 right-1/3 h-[240px] w-[240px]
                        rounded-full bg-green-400/25 blur-3xl" />
      </div>

      {/* ================= JUICY TEXTURE ================= */}
      <div className="absolute inset-0
        bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.10),_transparent_45%)]"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20">

        {/* TOP GRID */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">

          {/* BRAND */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900">
              FrooteX
            </h3>
            <p className="mt-4 text-sm text-gray-700 leading-relaxed max-w-md">
              FrooteX is a modern agri-tech platform connecting farmers,
              buyers, MSMEs, and logistics partners through a transparent,
              data-driven fruit supply chain.
            </p>

            {/* SOCIAL */}
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="p-2 rounded-md border bg-white
                           hover:bg-green-50 transition"
              >
                <Globe className="h-4 w-4 text-gray-700" />
              </a>
              <a
                href="#"
                className="p-2 rounded-md border bg-white
                           hover:bg-green-50 transition"
              >
                <Twitter className="h-4 w-4 text-gray-700" />
              </a>
              <a
                href="https://www.linkedin.com/company/frootex/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md border bg-white
                           hover:bg-green-50 transition"
              >
                <Linkedin className="h-4 w-4 text-gray-700" />
              </a>
            </div>
          </div>

          {/* PLATFORM */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Platform
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              <li><a href="#features" className="hover:text-green-700">Features</a></li>
              <li><a href="#how" className="hover:text-green-700">How It Works</a></li>
              <li><a href="#" className="hover:text-green-700">Solutions</a></li>
              <li><a href="#" className="hover:text-green-700">Pricing</a></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Company
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              <li><a href="#" className="hover:text-green-700">About Us</a></li>
              <li><a href="#" className="hover:text-green-700">Careers</a></li>
              <li><a href="#" className="hover:text-green-700">Contact</a></li>
              <li><a href="#" className="hover:text-green-700">Blog</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Contact
            </h4>

            <ul className="mt-4 space-y-4 text-sm text-gray-700">
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 text-green-600 mt-0.5" />
                <span>India · Serving PAN-India Markets</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-4 w-4 text-green-600 mt-0.5" />
                <span>frootex.com</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 text-green-600 mt-0.5" />
                <span>+91 72960 69559</span>
              </li>
            </ul>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="mt-16 grid md:grid-cols-2 gap-8 items-center
                        border-t border-gray-200 pt-10">
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              Stay updated 🍎
            </h4>
            <p className="mt-2 text-sm text-gray-700">
              Get product updates, market insights, and platform news.
            </p>
          </div>

          <form className="flex w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-l-md border
                         border-gray-300 px-4 py-3 text-sm
                         focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-2 rounded-r-md
                         bg-green-600 px-4 py-3 text-sm font-semibold
                         text-white hover:bg-green-700 transition"
            >
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} FrooteX. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
            <a href="#" className="hover:text-gray-700">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
