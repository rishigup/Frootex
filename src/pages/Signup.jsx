import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { Eye, EyeOff, ShieldCheck, ArrowLeft } from "lucide-react";

/* 🔹 Roles */
const ROLES = [
  { value: "Farmer", label: "Farmer" },
  { value: "Buyer", label: "Buyer" },
  { value: "MSME", label: "MSME / Processor" },
  { value: "Logistics", label: "Logistics Partner" },
  { value: "FieldAgent", label: "Field Agent" },
];

export default function Signup() {
  const navigate = useNavigate();

  const [signupType, setSignupType] = useState("phone");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [role, setRole] = useState("Farmer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* 🔐 reCAPTCHA ref */
  const recaptchaVerifierRef = useRef(null);

  /* ✅ Init reCAPTCHA ONCE after mount */
  useEffect(() => {
    if (!recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
  }, []);

  /* ================= EMAIL SIGNUP ================= */
  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        email,
        role,
        signupMethod: "email",
        createdAt: serverTimestamp(),
      });

      navigateByRole(role);
    } catch (err) {
      console.error(err);
      setError("Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  /* ================= SEND OTP ================= */
  const sendOTP = async () => {
    if (!/^\d{10}$/.test(phone)) {
      return setError("Enter valid 10-digit mobile number");
    }

    setLoading(true);
    setError("");

    try {
      const formattedPhone = `+91${phone}`;

      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        recaptchaVerifierRef.current
      );

      window.confirmationResult = confirmation;
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      setError("OTP send failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const verifyOTP = async () => {
    if (!otp) return setError("Enter OTP");

    setLoading(true);
    setError("");

    try {
      const res = await window.confirmationResult.confirm(otp);

      const userRef = doc(db, "users", res.user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: res.user.uid,
          phone: res.user.phoneNumber,
          role,
          signupMethod: "phone",
          createdAt: serverTimestamp(),
        });
      }

      navigateByRole(role);
    } catch (err) {
      console.error(err);
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const navigateByRole = (role) => {
    if (role === "Farmer") navigate("/farmer");
    else if (role === "Buyer") navigate("/buyer");
    else navigate("/");
  };

  return (
    <section className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-b from-[#FFF7CC] via-[#FFE4C7] to-white">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <Link to="/" className="flex items-center gap-2 mb-6 text-green-700">
          <ArrowLeft /> Back to home
        </Link>

        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        {/* TOGGLE */}
        <div className="flex mb-4 border rounded-lg overflow-hidden">
          <button
            onClick={() => setSignupType("phone")}
            className={`w-1/2 py-2 ${
              signupType === "phone"
                ? "bg-green-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Phone
          </button>
          <button
            onClick={() => setSignupType("email")}
            className={`w-1/2 py-2 ${
              signupType === "email"
                ? "bg-green-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Email
          </button>
        </div>

        {error && <div className="mb-4 text-red-600">{error}</div>}

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-4 border p-3 rounded"
        >
          {ROLES.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>

        {signupType === "email" ? (
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-3 rounded pr-10"
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
              className="w-full bg-green-600 text-white py-3 rounded"
            >
              Create Account
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {!otpSent ? (
              <>
                <input
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border p-3 rounded"
                />
                <button
                  onClick={sendOTP}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border p-3 rounded"
                />
                <button
                  onClick={verifyOTP}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded"
                >
                  Verify OTP
                </button>
              </>
            )}
          </div>
        )}

        <div className="mt-6 text-sm text-center text-gray-600 flex justify-center gap-2">
          <ShieldCheck className="text-green-600" />
          Secure signup powered by Firebase
        </div>
      </div>

      {/* 🔴 REQUIRED FOR FIREBASE PHONE AUTH */}
      <div id="recaptcha-container"></div>
    </section>
  );
}
