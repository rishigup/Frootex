import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* MAIN GRID */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">

          {/* BRAND */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              FrooteX
            </h3>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              A modern agri-tech platform bringing transparency, efficiency,
              and trust to the fruit supply chain.
            </p>

            {/* SOCIAL */}
            <div className="mt-6 flex gap-4 text-gray-500">
              <a href="#" className="hover:text-gray-900 transition">
                🌐
              </a>
              <a href="#" className="hover:text-gray-900 transition">
                🐦
              </a>
              <a href="#" className="hover:text-gray-900 transition">
                💼
              </a>
            </div>
          </div>

          {/* PLATFORM */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Platform
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <a href="#features" className="hover:text-gray-900 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#how" className="hover:text-gray-900 transition">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Company
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-900 transition">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* ACCESS */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              Access
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li>
                <Link
                  to="/login"
                  className="hover:text-gray-900 transition"
                >
                  Login
                </Link>
              </li>
              <li className="text-gray-400 cursor-default">
                Dashboard (Coming Soon)
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-6 border-t border-gray-200
                        flex flex-col sm:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} FrooteX. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-700 transition">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
