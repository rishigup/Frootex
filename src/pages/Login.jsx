import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

import {
  Eye,
  EyeOff,
  Loader2,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  /* ================= STATES ================= */
  const [loginType, setLoginType] = useState("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* Email */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  /* Phone */
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  /* ================= INIT RECAPTCHA (FIXED) ================= */
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {},
        }
      );
    }

    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  /* ================= ROLE REDIRECT ================= */
  const redirectByRole = async (user) => {
    const snap = await getDoc(doc(db, "users", user.uid));

    if (snap.exists()) {
      const role = snap.data().role;
      if (role === "Farmer") navigate("/farmer");
      else if (role === "Buyer") navigate("/buyer");
      else navigate("/");
    } else {
      navigate("/");
    }
  };

  /* ================= EMAIL LOGIN ================= */
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await redirectByRole(result.user);
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SEND OTP ================= */
  const sendOTP = async () => {
    if (!phone) {
      setError("Please enter phone number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );

      window.confirmationResult = confirmationResult;
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const verifyOTP = async () => {
    if (!otp) {
      setError("Enter OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await window.confirmationResult.confirm(otp);
      await redirectByRole(result.user);
    } catch {
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-[#FFF7CC] via-[#FFE4C7] to-white">
      <div className="relative w-full max-w-md">

        {/* BACK */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-100 to-green-100 border px-5 py-2 text-sm font-medium text-green-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* CARD */}
        <div className="bg-white/90 backdrop-blur border rounded-2xl shadow-xl p-8">

          {/* HEADER */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              🍎
            </div>
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-gray-700">Sign in to your FrooteX account</p>
          </div>

          {/* TOGGLE */}
          <div className="mb-6 flex rounded-lg overflow-hidden border">
            <button
              onClick={() => setLoginType("email")}
              className={`w-1/2 py-2 text-sm font-medium ${
                loginType === "email"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setLoginType("phone")}
              className={`w-1/2 py-2 text-sm font-medium ${
                loginType === "phone"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Phone OTP
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded">
              {error}
            </div>
          )}

          {/* EMAIL LOGIN */}
          {loginType === "email" && (
            <form onSubmit={handleEmailLogin} className="space-y-5">
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border px-4 py-3 rounded-md"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border px-4 py-3 rounded-md pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-md flex justify-center gap-2"
              >
                {loading && <Loader2 className="animate-spin" />}
                Sign In
              </button>
            </form>
          )}

          {/* PHONE OTP */}
          {loginType === "phone" && (
            <div className="space-y-5">
              {!otpSent ? (
                <>
                  <input
                    type="tel"
                    placeholder="+91XXXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border px-4 py-3 rounded-md"
                  />
                  <button
                    onClick={sendOTP}
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-3 rounded-md"
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border px-4 py-3 rounded-md"
                  />
                  <button
                    onClick={verifyOTP}
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-3 rounded-md"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </>
              )}
            </div>
          )}

          {/* TRUST */}
          <div className="mt-6 flex justify-center items-center gap-2 text-sm text-gray-600">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            Secure login powered by Firebase
          </div>

          <p className="mt-6 text-center text-sm">
            New to FrooteX?{" "}
            <Link to="/signup" className="text-green-600 font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* REQUIRED FOR FIREBASE PHONE AUTH */}
      <div id="recaptcha-container"></div>
    </section>
  );
}
