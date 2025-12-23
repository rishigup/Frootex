import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import {
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

/* 🔹 Centralized Roles */
const ROLES = [
  { value: "Farmer", label: "Farmer" },
  { value: "Buyer", label: "Buyer" },
  { value: "MSME", label: "MSME / Processor" },
  { value: "Logistics", label: "Logistics Partner" },
  { value: "FieldAgent", label: "Field Agent" },
];

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Farmer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordStrength = () => {
    if (password.length >= 8) return "Strong";
    if (password.length >= 5) return "Medium";
    return "Weak";
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        role: role,
        createdAt: serverTimestamp(),
      });

      navigate("/");
    } catch (err) {
      setError("Unable to create account. Please check your details.");
      setLoading(false);
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4
                 bg-gradient-to-b from-[#FFF7CC] via-[#FFE4C7] to-white"
    >
      {/* BACKGROUND BLOBS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-[360px] w-[360px]
                        rounded-full bg-yellow-300/40 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-[300px] w-[300px]
                        rounded-full bg-red-400/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-[260px] w-[260px]
                        rounded-full bg-green-400/30 blur-3xl" />
      </div>

      {/* TEXTURE */}
      <div className="absolute inset-0
        bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.10),_transparent_45%)]"
      />

      <div className="relative w-full max-w-md">

        {/* BACK TO HOME (ANIMATED) */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2
                     animate-slide-left
                     rounded-full
                     bg-gradient-to-r from-yellow-100 to-green-100
                     border border-green-200
                     px-5 py-2 text-sm font-medium
                     text-green-800
                     shadow-sm
                     hover:shadow-md
                     hover:-translate-y-0.5
                     transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* SIGNUP CARD */}
        <div
          className="animate-fade-scale
                     bg-white/90 backdrop-blur
                     border border-green-200
                     rounded-2xl shadow-xl
                     p-8
                     hover:shadow-2xl
                     hover:-translate-y-1
                     transition"
        >
          {/* HEADER */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12
                            items-center justify-center
                            rounded-xl bg-green-100 text-green-600">
              🍋
            </div>

            <h2 className="text-2xl font-semibold text-gray-900">
              Create your account
            </h2>

            <p className="mt-1 text-base text-gray-700">
              Join the FrooteX ecosystem
            </p>

            {/* Brand underline */}
            <div className="mt-4 h-1 w-16 mx-auto rounded-full
                            bg-gradient-to-r from-green-500 to-yellow-400" />
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 rounded-md
                            bg-red-50 border border-red-200
                            px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">

            {/* ROLE */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 w-full rounded-md
                           border border-gray-300
                           px-4 py-3 text-base bg-white
                           focus:border-green-600
                           focus:ring-green-600"
              >
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-md
                           border border-gray-300
                           px-4 py-3 text-base
                           focus:border-green-600
                           focus:ring-green-600"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-md
                             border border-gray-300
                             px-4 py-3 pr-12 text-base
                             focus:border-green-600
                             focus:ring-green-600"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                             text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* PASSWORD STRENGTH */}
              <p
                className={`mt-2 text-sm ${
                  passwordStrength() === "Strong"
                    ? "text-green-600"
                    : passwordStrength() === "Medium"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Password strength: {passwordStrength()}
              </p>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md
                         bg-green-600 py-3
                         text-base font-semibold text-white
                         hover:bg-green-700 transition
                         disabled:opacity-60
                         flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* TRUST */}
          <div className="mt-6 flex items-center justify-center
                          gap-2 text-sm text-gray-600">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            Secure signup powered by Firebase
          </div>

          {/* FOOTER */}
          <p className="mt-6 text-center text-sm text-gray-700">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-green-600 hover:text-green-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
