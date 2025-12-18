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
                 bg-gradient-to-b from-white via-green-50 to-white
                 border-t border-gray-200"
    >
      {/* background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-[300px] w-[300px] rounded-full bg-green-200/40 blur-3xl" />
        <div className="absolute bottom-0 -right-24 h-[260px] w-[260px] rounded-full bg-emerald-200/40 blur-3xl" />
      </div>

      {/* texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(22,163,74,0.08),_transparent_45%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">

        {/* TOP GRID */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">

          {/* BRAND */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900">
              FrooteX
            </h3>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed max-w-md">
              FrooteX is a modern agri-tech platform connecting farmers,
              buyers, MSMEs, and logistics partners through a transparent,
              data-driven fruit supply chain.
            </p>

            {/* SOCIAL */}
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="p-2 rounded-md border bg-white hover:bg-green-50 transition"
              >
                <Globe className="h-4 w-4 text-gray-700" />
              </a>
              <a
                href="#"
                className="p-2 rounded-md border bg-white hover:bg-green-50 transition"
              >
                <Twitter className="h-4 w-4 text-gray-700" />
              </a>
              <a
                 href="https://www.linkedin.com/company/frootex/"
  target="_blank"
  rel="noopener noreferrer"
  className="p-2 rounded-md border bg-white hover:bg-green-50 transition"
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
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li><a href="#features" className="hover:text-gray-900">Features</a></li>
              <li><a href="#how" className="hover:text-gray-900">How It Works</a></li>
              <li><a href="#" className="hover:text-gray-900">Solutions</a></li>
              <li><a href="#" className="hover:text-gray-900">Pricing</a></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Company
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="hover:text-gray-900">Careers</a></li>
              <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              <li><a href="#" className="hover:text-gray-900">Blog</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Contact
            </h4>

            <ul className="mt-4 space-y-4 text-sm text-gray-600">
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
              Stay updated
            </h4>
            <p className="mt-2 text-sm text-gray-600">
              Get product updates, market insights, and platform news.
            </p>
          </div>

          <form className="flex w-full max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-l-md border border-gray-300 px-4 py-3 text-sm focus:outline-none"
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
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
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
