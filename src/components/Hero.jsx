import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden
                 bg-gradient-to-b
                 from-[#FFF7CC]   /* mango yellow */
                 via-[#FFE4C7]    /* peach */
                 to-white"
    >
      {/* ================= FRUITY BACKGROUND BLOBS ================= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Mango */}
        <div
          className="absolute -top-24 -left-24 h-[360px] w-[360px]
                     rounded-full bg-yellow-300/40 blur-3xl
                     animate-float"
        />

        {/* Apple */}
        <div
          className="absolute top-32 -right-24 h-[320px] w-[320px]
                     rounded-full bg-red-400/30 blur-3xl
                     animate-float-slow"
        />

        {/* Leaf */}
        <div
          className="absolute bottom-0 left-1/3 h-[280px] w-[280px]
                     rounded-full bg-green-400/30 blur-3xl
                     animate-float"
        />
      </div>

      {/* ================= JUICY TEXTURE ================= */}
      <div className="absolute inset-0
        bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.10),_transparent_45%)]"
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-40 pb-28
                      grid md:grid-cols-2 gap-20 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <div>
          {/* Fruity Eyebrow */}
          <p
            className="inline-flex items-center gap-2
                       text-sm font-medium
                       text-green-700
                       bg-green-100 px-4 py-1 rounded-full
                       opacity-0 animate-fadeUp"
          >
            🍎 Fresh • 🍋 Natural • 🌿 Trusted
          </p>

          {/* Heading */}
          <h1
            className="mt-6 text-[3.4rem] leading-tight
                       font-semibold text-gray-900
                       opacity-0 animate-fadeUp animate-delay-1"
          >
            Fresh Fruits,
            <span className="block text-green-700">
              Directly From Farmers
            </span>
          </h1>

          {/* Subheading */}
          <p
            className="mt-6 text-lg text-gray-700 max-w-xl
                       opacity-0 animate-fadeUp animate-delay-2"
          >
            FrooteX brings farm-fresh fruits straight to consumers and businesses —
            ensuring quality, fair pricing, and full transparency across the supply chain.
          </p>

          {/* Value bullets */}
          <div
            className="mt-6 space-y-3
                       opacity-0 animate-fadeUp animate-delay-3"
          >
            {[
              "🍎 Handpicked, premium quality fruits",
              "🍋 Fair & transparent market pricing",
              "🌿 Farm-to-doorstep traceability",
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <CheckCircle className="h-4 w-4 text-green-600" />
                {text}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-10 flex items-center gap-5
                       opacity-0 animate-fadeUp animate-delay-3"
          >
            <Link
              to="/signup"
              className="inline-flex items-center gap-2
                         px-8 py-4 text-base font-semibold rounded-lg
                         bg-green-600 text-white
                         hover:bg-green-700 transition
                         shadow-md hover:shadow-lg
                         hover:scale-[1.03] active:scale-[0.97]"
            >
              Explore Fresh Fruits
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
          <p
            className="mt-8 text-sm text-gray-600
                       opacity-0 animate-fadeUp animate-delay-3"
          >
            Trusted by farmers, retailers & fruit buyers across India 🇮🇳
          </p>
        </div>

        {/* ================= RIGHT VISUAL ================= */}
        <div className="hidden md:block">
          <div
            className="relative h-[480px] rounded-2xl
                       bg-white/85 backdrop-blur
                       border shadow-xl p-10
                       transition
                       hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="space-y-6">
              <div className="h-20 rounded-xl bg-gradient-to-r from-yellow-100 to-yellow-50" />
              <div className="h-20 rounded-xl bg-gradient-to-r from-red-100 to-red-50" />
              <div className="h-20 rounded-xl bg-gradient-to-r from-green-100 to-green-50" />
            </div>

            <div
              className="absolute -bottom-6 -left-6
                         bg-white border shadow-lg
                         rounded-xl px-6 py-4"
            >
              <p className="text-sm font-semibold text-gray-900">
                Farm Fresh Guarantee
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Picked • Packed • Delivered
              </p>
            </div>

            <div
              className="absolute -top-6 -right-6
                         bg-white border shadow-lg
                         rounded-xl px-6 py-4"
            >
              <p className="text-sm font-semibold text-gray-900">
                Natural Pricing
              </p>
              <p className="text-xs text-gray-500 mt-1">
                No middlemen margins
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
