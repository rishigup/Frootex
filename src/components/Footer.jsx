import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-5">
        
        {/* Main Grid */}
        <div className="grid gap-12 md:grid-cols-4">
          
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              FrooteX
            </h3>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed max-w-sm">
              FrooteX is a modern agri-tech platform designed to bring transparency,
              efficiency, and trust to the fruit supply chain.
            </p>
          </div>

          {/* Platform */}
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

          {/* Company */}
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

          {/* Access */}
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
              <li>
                <span className="text-gray-400 cursor-default">
                  Dashboard (Coming Soon)
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
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
