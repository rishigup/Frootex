import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
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

  /* OTP Timer */
  const [otpTimer, setOtpTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  /* reCAPTCHA */
  const recaptchaRef = useRef(null);

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

  /* ================= ERROR HANDLER ================= */
  const firebaseError = (code) => {
    switch (code) {
      case "auth/user-not-found":
        return "Account not found";
      case "auth/wrong-password":
        return "Incorrect password";
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

  /* ================= ROLE REDIRECT ================= */
  const redirectByRole = async (user) => {
    const snap = await getDoc(doc(db, "users", user.uid));
    const role = snap.exists() ? snap.data().role : null;

    if (role === "Farmer") navigate("/farmer");
    else if (role === "Buyer") navigate("/buyer");
    else navigate("/");
  };

  /* ================= SETUP reCAPTCHA (SAFE) ================= */
  const setupRecaptcha = () => {
    if (!recaptchaRef.current) {
      recaptchaRef.current = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
  };

  /* ================= EMAIL LOGIN ================= */
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      await redirectByRole(res.user);
    } catch (err) {
      setError(firebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  /* ================= SEND OTP ================= */
  const sendOTP = async () => {
    if (!/^\d{10}$/.test(phone)) {
      return setError("Enter valid 10-digit number");
    }

    setLoading(true);
    setError("");

    try {
      setupRecaptcha();

      const confirmation = await signInWithPhoneNumber(
        auth,
        `+91${phone}`,
        recaptchaRef.current
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
      await redirectByRole(res.user);
    } catch {
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <section className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-[#FFF7CC] via-[#FFE4C7] to-white">
      <div className="w-full max-w-md">

        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-green-700"
        >
          <ArrowLeft size={18} /> Back to home
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-semibold text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Login to your account
          </p>

          {/* TOGGLE */}
          <div className="flex mb-4 border rounded-lg overflow-hidden">
            <button
              onClick={() => setLoginType("email")}
              className={`w-1/2 py-2 ${
                loginType === "email"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setLoginType("phone")}
              className={`w-1/2 py-2 ${
                loginType === "phone"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              Phone OTP
            </button>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          {/* EMAIL LOGIN */}
          {loginType === "email" && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
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
                disabled={loading}
                className="w-full py-3 rounded text-white bg-green-600 flex justify-center gap-2"
              >
                {loading && <Loader2 className="animate-spin" />}
                Sign In
              </button>
            </form>
          )}

          {/* PHONE LOGIN */}
          {loginType === "phone" && (
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

                  <p className="text-sm text-center text-gray-500">
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

          <div className="mt-6 flex justify-center items-center gap-2 text-sm text-gray-600">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            Secure login powered by Firebase
          </div>

          <p className="mt-6 text-center text-sm">
            New user?{" "}
            <Link to="/signup" className="text-green-600 font-medium">
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* 🔥 MUST ALWAYS EXIST */}
      <div id="recaptcha-container"></div>
    </section>
  );
}
