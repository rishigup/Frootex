import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: "Farmer",
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const user = userCredential.user;

      // 2. Store user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: form.name,
        email: form.email,
        role: form.role,
        createdAt: serverTimestamp(),
      });

      // 3. Redirect (later we’ll do role-based)
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
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
                     text-gray-600 hover:text-gray-900"
        >
          ← Back to home
        </Link>

        {/* Card */}
        <div className="bg-white border rounded-lg shadow-sm p-5">
          
          {/* Header */}
          <div className="mb-4 text-center">
            <h1 className="text-lg font-semibold text-gray-900">
              Create Account
            </h1>
            <p className="text-xs text-gray-600">
              Join FrooteX
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSignup} className="space-y-3">
            
            {/* Role */}
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-300 px-2.5 py-2
                           text-xs focus:border-green-600 focus:ring-green-600"
              >
                <option>Farmer</option>
                <option>Buyer</option>
                <option>Logistics</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Name
              </label>
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full rounded-md border border-gray-300 px-2.5 py-2
                           text-xs focus:border-green-600 focus:ring-green-600"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-700">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
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
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
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
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-4 text-center text-xs text-gray-600">
            Have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-green-600 hover:text-green-700"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
