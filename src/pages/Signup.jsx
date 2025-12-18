import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md"> {/* ⬅ increased */}

        {/* Back to Home */}
        <Link
          to="/"
          className="mb-6 inline-block text-base text-gray-600 hover:text-gray-900"
        >
          ← Back to home
        </Link>

        <div className="bg-white p-8 rounded-xl shadow-sm border"> {/* ⬅ increased */}
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
                className="mt-2 w-full border rounded-md px-4 py-3 text-base"
              >
                <option>Farmer</option>
                <option>Buyer</option>
                <option>Logistics</option>
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

          <p className="mt-5 text-center text-base text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
