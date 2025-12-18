import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

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
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

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

        {/* Back to Home */}
        <Link
          to="/"
          className="mb-6 inline-block text-base text-gray-600 hover:text-gray-900"
        >
          ← Back to home
        </Link>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur p-8 rounded-xl shadow-lg border">
          <h2 className="text-2xl font-semibold text-center text-gray-900">
            Create Account
          </h2>

          <p className="text-base text-center text-gray-600 mt-2">
            Join FrooteX
          </p>

          <form onSubmit={handleSignup} className="mt-6 space-y-5">

            {/* Role */}
            <div>
              <label className="block text-base font-medium text-gray-700">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-2 w-full border rounded-md px-4 py-3 text-base bg-white"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border rounded-md px-4 py-3 text-base"
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
                className="mt-2 w-full border rounded-md px-4 py-3 text-base"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-md
                         text-base font-semibold hover:bg-green-700
                         disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-5 text-center text-base text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
