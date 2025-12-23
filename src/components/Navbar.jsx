import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import logo from "../assets/frootex-logo.png";

import {
  Menu,
  X,
  LogOut,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  /* Scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Firebase auth listener */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  /* Logout */
  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    navigate("/");
  };

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how" },
    { label: "Solutions", href: "#" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-white/80 backdrop-blur-lg border-b shadow-sm"
            : "bg-gradient-to-b from-white via-white/70 to-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="FrooteX Logo"
            className="h-9 md:h-10 w-auto object-contain"
          />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-600">
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className="relative group">
              <span className="group-hover:text-gray-900 transition">
                {item.label}
              </span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-600 transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-4">

          {/* NOT LOGGED IN */}
          {!user && (
            <>
              <Link
                to="/login"
                className="hidden sm:inline text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="relative inline-flex items-center justify-center px-5 py-2
                           text-sm font-semibold text-white rounded-md
                           bg-green-600 hover:bg-green-700 transition
                           shadow-sm"
              >
                Get Started
              </Link>
            </>
          )}

          {/* LOGGED IN */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-md px-2 py-1
                           hover:bg-gray-100 transition"
              >
                <div className="w-8 h-8 rounded-full bg-green-600
                                flex items-center justify-center
                                text-white text-sm font-semibold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </button>

              {/* DROPDOWN */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white border
                                rounded-xl shadow-lg overflow-hidden">
                  <div className="px-4 py-3 text-sm text-gray-600 border-b">
                    {user.email}
                  </div>
                  <div className="w-full flex items-center gap-2 px-4 py-3
text-sm text-gray-700 hover:bg-gray-50">                      <a href="/farmer"><button>Dashboard</button></a>
</div>
<hr />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3
                               text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                    <div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40">
          <div className="absolute right-0 top-0 h-full w-72 bg-white
                          shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-semibold">Menu</span>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-5 text-sm font-medium">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-gray-700 hover:text-gray-900"
                >
                  {item.label}
                </a>
              ))}

              {!user ? (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="mt-4 inline-flex justify-center rounded-md
                               bg-green-600 px-4 py-2 text-white font-semibold"
                  >
                    Get Started
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 mt-6"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
