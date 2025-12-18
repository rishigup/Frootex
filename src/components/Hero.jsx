import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden
                 bg-gradient-to-b from-white via-green-50 to-white"
    >
      {/* background blobs (same as Features) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-green-200/40 blur-3xl"></div>
        <div className="absolute top-40 -right-24 h-[320px] w-[320px] rounded-full bg-emerald-200/40 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 h-[280px] w-[280px] rounded-full bg-lime-200/30 blur-3xl"></div>
      </div>

      {/* subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(22,163,74,0.08),_transparent_45%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 pt-40 pb-28 grid md:grid-cols-2 gap-20 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <p className="text-sm font-medium text-green-700 tracking-wide uppercase">
            Fruit Supply Chain Platform
          </p>

          <h1 className="mt-4 text-[3.2rem] leading-tight font-semibold text-gray-900">
            A Smarter Way to
            <br />
            Move Fruits from
            <span className="block text-green-700">
              Farms to Markets
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            FrooteX enables farmers, buyers, and logistics partners to
            collaborate on a single platform — improving transparency,
            pricing, and delivery efficiency across the fruit ecosystem.
          </p>

          <div className="mt-10 flex items-center gap-5">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold rounded-md
                         bg-green-600 text-white hover:bg-green-700 transition shadow-sm"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold rounded-md
                         border border-gray-300 text-gray-700 hover:border-gray-400 transition"
            >
              Login
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Designed for farmers, buyers, and agri businesses.
          </p>
        </div>

        {/* RIGHT VISUAL BLOCK */}
        <div className="hidden md:block">
          <div className="relative h-[460px] rounded-2xl bg-white/80 backdrop-blur
                          border shadow-lg p-10">

            <div className="space-y-6">
              <div className="h-20 rounded-lg bg-gray-100"></div>
              <div className="h-20 rounded-lg bg-gray-100"></div>
              <div className="h-20 rounded-lg bg-gray-100"></div>
            </div>

            {/* floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white border shadow-md rounded-xl px-6 py-4">
              <p className="text-sm font-semibold text-gray-900">
                End-to-End Visibility
              </p>
              <p className="text-xs text-gray-500 mt-1">
                From harvest to delivery
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
