export default function Features() {
  const features = [
    {
      title: "Verified Fruit Supply",
      description:
        "Quality-checked produce sourced directly from trusted farmers, ensuring consistency and freshness.",
    },
    {
      title: "Transparent Pricing",
      description:
        "Real-time market visibility with fair pricing for farmers and buyers across regions.",
    },
    {
      title: "Smart Logistics",
      description:
        "Optimized movement of goods with end-to-end tracking from harvest to delivery.",
    },
    {
      title: "Data-Driven Insights",
      description:
        "Actionable analytics to support demand planning, pricing decisions, and supply forecasting.",
    },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden
                 bg-gradient-to-b from-white via-green-50 to-white"
    >
      {/* background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-green-200/40 blur-3xl"></div>
        <div className="absolute top-1/3 -right-24 h-[300px] w-[300px] rounded-full bg-emerald-200/40 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 h-[260px] w-[260px] rounded-full bg-lime-200/30 blur-3xl"></div>
      </div>

      {/* subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(22,163,74,0.08),_transparent_45%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-28">
        
        {/* Section header */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-green-700 uppercase tracking-wide">
            Platform Capabilities
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            Built for the Modern Fruit Supply Chain
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            FrooteX brings farmers, buyers, and logistics partners together
            through a single, transparent platform.
          </p>
        </div>

        {/* Features grid */}
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="group rounded-xl border bg-white/80 backdrop-blur
                         p-6 transition hover:bg-white hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>

              {/* hover indicator */}
              <div
                className="mt-6 h-[2px] w-10 bg-green-600 opacity-0 transition-all
                           group-hover:opacity-100 group-hover:w-16"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
