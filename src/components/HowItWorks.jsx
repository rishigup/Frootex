export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Farmers List Produce",
      description:
        "Farmers onboard and publish fruit availability with quality, quantity, and pricing details.",
    },
    {
      step: "02",
      title: "Buyers Discover & Order",
      description:
        "Buyers explore verified produce, compare options, and place orders with confidence.",
    },
    {
      step: "03",
      title: "Smart Logistics & Delivery",
      description:
        "Optimized logistics ensure traceable, timely delivery from farm to destination.",
    },
  ];

  return (
    <>
      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how"
        className="relative overflow-hidden bg-gradient-to-b from-white via-green-50 to-white"
      >
        {/* background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-green-200/40 blur-3xl" />
          <div className="absolute top-1/3 -right-24 h-[300px] w-[300px] rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-[260px] w-[260px] rounded-full bg-lime-200/30 blur-3xl" />
        </div>

        {/* subtle texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(22,163,74,0.08),_transparent_45%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-28">
          {/* Header */}
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-green-700 uppercase tracking-wide">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-gray-900">
              Designed as a Clear, Connected Flow
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              Every participant operates on a shared workflow — reducing friction,
              improving trust, and increasing efficiency.
            </p>
          </div>

          {/* Timeline */}
          <div className="mt-20 relative">
            {/* central line */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gray-200" />

            <div className="space-y-20">
              {steps.map((item, index) => (
                <div
                  key={index}
                  className={`relative grid md:grid-cols-2 gap-12 items-center ${
                    index % 2 === 0 ? "" : "md:text-right"
                  }`}
                >
                  {/* Content */}
                  <div
                    className={`p-8 rounded-2xl border bg-white/80 backdrop-blur shadow-sm
                    transition hover:bg-white hover:shadow-md
                    ${index % 2 === 0 ? "md:mr-20" : "md:ml-20 md:order-2"}`}
                  >
                    <div className="text-sm font-semibold text-green-600">
                      Step {item.step}
                    </div>

                    <h3 className="mt-2 text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Timeline node */}
                  <div className="hidden md:flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-green-600 ring-8 ring-green-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= BLACK VALUE SECTION ================= */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold">
              One Platform. Every Stakeholder Connected.
            </h2>

            <p className="mt-4 text-lg text-gray-400">
              FrooteX aligns farmers, buyers, MSMEs, and logistics partners
              through a transparent, data-driven supply chain.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              ["3×", "Faster Order Fulfillment"],
              ["100%", "Traceable Supply Chain"],
              ["24/7", "Real-Time Market Access"],
              ["Transparency", "Reduced Middlemen"],
            ].map(([value, label], i) => (
              <div key={i}>
                <p className="text-4xl font-semibold text-green-500">
                  {value}
                </p>
                <p className="mt-2 text-sm text-gray-400">{label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <a
              href="/signup"
              className="inline-flex items-center justify-center
                         bg-green-600 text-white px-8 py-4 rounded-lg
                         text-base font-semibold hover:bg-green-700 transition"
            >
              Get Started on FrooteX
            </a>

            <p className="text-sm text-gray-400 max-w-md">
              Join a smarter, transparent fruit supply ecosystem built for scale.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
