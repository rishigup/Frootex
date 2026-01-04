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

  /* ================= STATES ================= */
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

  /* OTP Timer */
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  /* reCAPTCHA */
  const recaptchaRef = useRef(null);

  /* ================= INIT reCAPTCHA (SAFE) ================= */
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

    recaptchaRef.current = window.recaptchaVerifier;
  }, []);

  /* ================= OTP TIMER ================= */
  useEffect(() => {
    if (!otpSent) return;

    setOtpTimer(60);
    setCanResend(false);

    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [otpSent]);

  /* ================= PASSWORD STRENGTH ================= */
  const passwordStrength = () => {
    if (password.length < 6) return "Weak";
    if (/[A-Z]/.test(password) && /\d/.test(password)) return "Strong";
    return "Medium";
  };

  /* ================= ERROR HANDLER ================= */
  const firebaseError = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "Email already registered";
      case "auth/weak-password":
        return "Password too weak";
      case "auth/invalid-phone-number":
        return "Invalid phone number";
      case "auth/too-many-requests":
        return "Too many attempts. Try later";
      case "auth/invalid-app-credential":
        return "reCAPTCHA verification failed";
      default:
        return "Something went wrong";
    }
  };

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
      setError(firebaseError(err.code));
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
      const appVerifier = recaptchaRef.current;

      await appVerifier.render(); // ✅ REQUIRED

      const confirmation = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        appVerifier
      );

      window.confirmationResult = confirmation;
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      setError(firebaseError(err.code));
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
    } catch {
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= ROLE REDIRECT ================= */
  const navigateByRole = (role) => {
    if (role === "Farmer") navigate("/farmer");
    else if (role === "Buyer") navigate("/buyer");
    else navigate("/");
  };

  /* ================= UI ================= */
  return (
    <section className="min-h-screen flex justify-center items-center px-4 bg-gradient-to-b from-[#FFF7CC] via-[#FFE4C7] to-white">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">

        <Link to="/" className="flex items-center gap-2 mb-6 text-green-700">
          <ArrowLeft size={18} /> Back to home
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

        {error && (
          <div className="mb-4 text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        {/* ROLE */}
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

        {/* EMAIL SIGNUP */}
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

            <p className="text-sm">
              Password strength: {passwordStrength()}
            </p>

            <button
              disabled={loading}
              className="w-full py-3 rounded text-white bg-green-600"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        ) : (
          /* PHONE SIGNUP */
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
                  className="w-full border p-3 rounded"
                />
                <button
                  onClick={verifyOTP}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded"
                >
                  Verify OTP
                </button>

                <p className="text-sm text-center">
                  {canResend ? (
                    <button onClick={sendOTP} className="text-green-600">
                      Resend OTP
                    </button>
                  ) : (
                    <>Resend OTP in {otpTimer}s</>
                  )}
                </p>
              </>
            )}
          </div>
        )}

        <div className="mt-6 text-sm text-center text-gray-600 flex justify-center gap-2">
          <ShieldCheck className="text-green-600" />
          Secure signup powered by Firebase
        </div>
      </div>

      {/* REQUIRED */}
      <div id="recaptcha-container"></div>
    </section>
  );
}
