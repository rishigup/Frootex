import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
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
        <div className="absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-green-200/40 blur-3xl"></div>
        <div className="absolute top-1/3 -right-24 h-[300px] w-[300px] rounded-full bg-emerald-200/40 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 h-[260px] w-[260px] rounded-full bg-lime-200/30 blur-3xl"></div>
      </div>

      {/* subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(22,163,74,0.08),_transparent_45%)]"></div>

      <div className="relative w-full max-w-md">

        {/* Back to home */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1
                     text-base font-medium text-gray-600
                     hover:text-gray-900 transition"
        >
          ← Back to home
        </Link>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur border rounded-xl shadow-lg p-8">

          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Sign In
            </h1>
            <p className="mt-1 text-base text-gray-600">
              Access your FrooteX account
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-base font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
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
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-md border border-gray-300
                           px-4 py-3 text-base
                           focus:border-green-600 focus:ring-green-600"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-green-600 py-3
                         text-base font-semibold text-white
                         hover:bg-green-700 transition
                         disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-base text-gray-600">
            New user?{" "}
            <Link
              to="/signup"
              className="font-medium text-green-600 hover:text-green-700"
            >
              Create account
            </Link>
          </p>

        </div>
      </div>
    </section>
  );
}
