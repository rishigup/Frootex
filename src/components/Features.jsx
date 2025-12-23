import {
  CheckCircle,
  TrendingUp,
  Truck,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "Verified Fruit Supply",
      description:
        "Quality-checked produce sourced directly from trusted farmers, ensuring consistency and freshness.",
      icon: CheckCircle,
      stat: "100% Quality Assured",
    },
    {
      title: "Transparent Pricing",
      description:
        "Real-time market visibility with fair pricing for farmers and buyers across regions.",
      icon: TrendingUp,
      stat: "Live Market Rates",
    },
    {
      title: "Smart Logistics",
      description:
        "Optimized movement of goods with end-to-end tracking from harvest to delivery.",
      icon: Truck,
      stat: "End-to-End Tracking",
    },
    {
      title: "Data-Driven Insights",
      description:
        "Actionable analytics to support demand planning, pricing decisions, and supply forecasting.",
      icon: BarChart3,
      stat: "AI-Powered Insights",
    },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden
                 bg-gradient-to-b
                 from-[#FFF7CC]   /* mango */
                 via-[#FFE4C7]    /* peach */
                 to-white"
    >
      {/* ================= FRUITY BACKGROUND BLOBS ================= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Mango */}
        <div className="absolute -top-24 -left-24 h-[360px] w-[360px]
                        rounded-full bg-yellow-300/35 blur-3xl" />

        {/* Apple */}
        <div className="absolute top-1/3 -right-24 h-[300px] w-[300px]
                        rounded-full bg-red-400/30 blur-3xl" />

        {/* Leaf */}
        <div className="absolute bottom-0 left-1/4 h-[260px] w-[260px]
                        rounded-full bg-green-400/30 blur-3xl" />
      </div>

      {/* ================= SOFT FRUIT TEXTURE ================= */}
      <div className="absolute inset-0
        bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.10),_transparent_45%)]"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-28">

        {/* HEADER */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-green-700 uppercase tracking-wide">
            Platform Capabilities
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            Built for the Modern Fruit Supply Chain
          </h2>

          <p className="mt-4 text-lg text-gray-700">
            FrooteX brings farmers, buyers, MSMEs, and logistics partners together
            through a single, transparent platform.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl
                           bg-white/85 backdrop-blur
                           border border-gray-200
                           p-6 transition-all duration-300
                           hover:-translate-y-2
                           hover:shadow-xl"
              >
                {/* icon */}
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center
                             rounded-xl bg-green-100 text-green-600
                             group-hover:bg-green-600
                             group-hover:text-white transition"
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* title */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>

                {/* description */}
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>

                {/* stat */}
                <p className="mt-5 text-sm font-medium text-green-700">
                  {item.stat}
                </p>

                {/* hover line */}
                <div
                  className="absolute bottom-0 left-0 h-[3px] w-0
                             bg-green-600 transition-all duration-300
                             group-hover:w-full rounded-b-2xl"
                />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 flex items-center justify-between
                        flex-col sm:flex-row gap-6">
          <p className="text-lg text-gray-700 max-w-xl">
            Ready to experience a smarter, transparent fruit supply chain?
          </p>

          <a
            href="/signup"
            className="inline-flex items-center gap-2
                       bg-green-600 text-white
                       px-8 py-4 rounded-lg
                       text-base font-semibold
                       hover:bg-green-700 transition
                       shadow-md hover:shadow-lg"
          >
            Get Started
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
