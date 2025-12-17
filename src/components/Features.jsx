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
    <section id="features" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-28">
        
        {/* Section header */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-green-600 uppercase tracking-wide">
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
              className="group rounded-xl border bg-gray-50 p-6 transition
                         hover:bg-white hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>

              {/* subtle hover indicator */}
              <div className="mt-6 h-[2px] w-10 bg-green-600 opacity-0 transition-all
                              group-hover:opacity-100 group-hover:w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
