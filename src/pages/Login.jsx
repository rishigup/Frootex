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
      // 🔐 Firebase login
      await signInWithEmailAndPassword(auth, email, password);

      // ✅ Redirect to home
      navigate("/");

    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-3">
      <div className="w-full max-w-xs">

        {/* Back to home */}
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-1 text-xs font-medium
                     text-gray-600 hover:text-gray-900 transition"
        >
          ← Back to home
        </Link>

        {/* Card */}
        <div className="bg-white border rounded-lg shadow-sm p-5">

          {/* Header */}
          <div className="mb-4 text-center">
            <h1 className="text-lg font-semibold text-gray-900">
              Sign In
            </h1>
            <p className="mt-0.5 text-xs text-gray-600">
              Access your FrooteX account
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-3">

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-2.5 py-2
                           text-xs focus:border-green-600 focus:ring-green-600"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-2.5 py-2
                           text-xs focus:border-green-600 focus:ring-green-600"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-green-600 py-2
                         text-xs font-semibold text-white
                         hover:bg-green-700 transition disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-4 text-center text-xs text-gray-600">
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
    </div>
  );
}
