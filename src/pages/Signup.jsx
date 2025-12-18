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
      className="relative min-h-screen flex items-center justify-center
                 bg-gradient-to-b from-white via-green-50 to-white px-4"
    >
      {/* background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-green-200/40 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-[300px] w-[300px] rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-[260px] w-[260px] rounded-full bg-lime-200/30 blur-3xl" />
      </div>

      {/* texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(22,163,74,0.08),_transparent_45%)]" />

      <div className="relative w-full max-w-md">

        {/* Back to Home */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1
                     text-base font-medium text-gray-600
                     hover:text-gray-900 transition"
        >
          ← Back to home
        </Link>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur p-8 rounded-xl shadow-lg border">

          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Create your account
            </h2>
            <p className="mt-1 text-base text-gray-600">
              Join the FrooteX ecosystem
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-200
                            px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">

            {/* Role */}
            <div>
              <label className="block text-base font-medium text-gray-700">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 w-full rounded-md border border-gray-300
                           px-4 py-3 text-base bg-white"
              >
                {ROLES.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="block text-base font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-md border border-gray-300
                           px-4 py-3 text-base
                           focus:border-green-600 focus:ring-green-600"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-base font-medium text-gray-700">
                Password
              </label>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-md border border-gray-300
                             px-4 py-3 pr-12 text-base
                             focus:border-green-600 focus:ring-green-600"
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

              {/* Strength */}
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-green-600 py-3
                         text-base font-semibold text-white
                         hover:bg-green-700 transition
                         disabled:opacity-60
                         flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-5 h-5 animate-spin" />}
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Trust */}
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            Secure signup powered by Firebase
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-base text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-green-600 hover:text-green-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
