import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gray-50">
      
      {/* subtle texture layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(22,163,74,0.08),_transparent_40%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 pt-40 pb-28 grid md:grid-cols-2 gap-20 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          {/* eyebrow */}
          <p className="text-sm font-medium text-green-600 tracking-wide uppercase">
            Fruit Supply Chain Platform
          </p>

          {/* main heading */}
          <h1 className="mt-4 text-[3.2rem] leading-tight font-semibold text-gray-900">
            A Smarter Way to
            <br />
            Move Fruits from
            <span className="block text-green-700">
              Farms to Markets
            </span>
          </h1>

          {/* description */}
          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            FrooteX enables farmers, buyers, and logistics partners to
            collaborate on a single platform — improving transparency,
            pricing, and delivery efficiency across the fruit ecosystem.
          </p>

          {/* CTA */}
          <div className="mt-10 flex items-center gap-5">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-7 py-3 text-sm font-semibold rounded-md
                         bg-green-600 text-white hover:bg-green-700 transition"
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

          {/* trust line */}
          <p className="mt-8 text-sm text-gray-500">
            Designed for farmers, buyers, and agri businesses.
          </p>
        </div>

        {/* RIGHT VISUAL BLOCK */}
        <div className="hidden md:block">
          <div className="relative h-[460px] rounded-2xl bg-white border shadow-sm p-10">
            
            <div className="space-y-6">
              <div className="h-20 rounded-lg bg-gray-100"></div>
              <div className="h-20 rounded-lg bg-gray-100"></div>
              <div className="h-20 rounded-lg bg-gray-100"></div>
            </div>

            {/* floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white border shadow-sm rounded-xl px-6 py-4">
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
