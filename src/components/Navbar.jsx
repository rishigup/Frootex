import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Scroll effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm border-b"
            : "bg-gradient-to-b from-white to-white/70"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-semibold tracking-tight text-gray-900"
        >
          FrooteX
        </Link>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-600">
          {["Features", "Solutions", "How it Works"].map((item) => (
            <a key={item} href="#" className="relative group">
              <span className="transition-colors duration-200 group-hover:text-gray-900">
                {item}
              </span>
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">

          {/* ❌ Not logged in */}
          {!user && (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white rounded-md
                           bg-green-600 hover:bg-green-700 transition
                           before:absolute before:inset-0 before:rounded-md
                           before:bg-white/10 before:opacity-0 hover:before:opacity-100"
              >
                Get Started
              </Link>
            </>
          )}

          {/* ✅ Logged in */}
          {user && (
            <div className="flex items-center gap-3">

              {/* User avatar */}
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-semibold">
                {user.email?.charAt(0).toUpperCase()}
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition"
              >
                Logout
              </button>

            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
