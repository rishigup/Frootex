import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden
                 bg-gradient-to-b from-white via-green-50 to-white"
    >
      {/* background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-green-200/40 blur-3xl" />
        <div className="absolute top-40 -right-24 h-[320px] w-[320px] rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-[280px] w-[280px] rounded-full bg-lime-200/30 blur-3xl" />
      </div>

      {/* texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(22,163,74,0.08),_transparent_45%)]" />

      <div className="relative max-w-7xl mx-auto px-6 pt-40 pb-28 grid md:grid-cols-2 gap-20 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <div>
          {/* Eyebrow */}
          <p className="inline-flex items-center gap-2
                        text-sm font-medium text-green-700
                        bg-green-100 px-3 py-1 rounded-full">
            🌱 Smart Fruit Supply Chain Platform
          </p>

          {/* Heading */}
          <h1 className="mt-6 text-[3.4rem] leading-tight font-semibold text-gray-900">
            Powering a
            <span className="block text-green-700">
              Transparent Fruit Ecosystem
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            FrooteX connects farmers, buyers, MSMEs, and logistics partners
            on one intelligent platform — ensuring fair pricing, verified supply,
            and predictable delivery.
          </p>

          {/* Value bullets */}
          <div className="mt-6 space-y-3">
            {[
              "Verified farmers & quality produce",
              "Real-time pricing & demand visibility",
              "End-to-end logistics tracking",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle className="h-4 w-4 text-green-600" />
                {text}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex items-center gap-5">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2
                         px-8 py-4 text-base font-semibold rounded-lg
                         bg-green-600 text-white
                         hover:bg-green-700 transition shadow-md"
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center
                         px-8 py-4 text-base font-semibold rounded-lg
                         border border-gray-300 text-gray-700
                         hover:border-gray-400 transition"
            >
              Login
            </Link>
          </div>

          {/* Trust line */}
          <p className="mt-8 text-sm text-gray-500">
            Built for farmers, buyers, MSMEs & agri enterprises.
          </p>
        </div>

        {/* ================= RIGHT VISUAL ================= */}
        <div className="hidden md:block">
          <div
            className="relative h-[480px] rounded-2xl
                       bg-white/80 backdrop-blur
                       border shadow-xl p-10
                       hover:shadow-2xl transition"
          >
            {/* mock dashboard rows */}
            <div className="space-y-6">
              <div className="h-20 rounded-xl bg-gradient-to-r from-green-100 to-green-50" />
              <div className="h-20 rounded-xl bg-gradient-to-r from-emerald-100 to-emerald-50" />
              <div className="h-20 rounded-xl bg-gradient-to-r from-lime-100 to-lime-50" />
            </div>

            {/* floating stat */}
            <div className="absolute -bottom-6 -left-6
                            bg-white border shadow-lg
                            rounded-xl px-6 py-4">
              <p className="text-sm font-semibold text-gray-900">
                100% Traceable Supply
              </p>
              <p className="text-xs text-gray-500 mt-1">
                From farm to final delivery
              </p>
            </div>

            {/* floating stat */}
            <div className="absolute -top-6 -right-6
                            bg-white border shadow-lg
                            rounded-xl px-6 py-4">
              <p className="text-sm font-semibold text-gray-900">
                Fair Pricing
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Real-time market rates
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
