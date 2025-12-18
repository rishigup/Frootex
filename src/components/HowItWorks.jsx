import {
  Leaf,
  ShoppingCart,
  Truck,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Farmers List Produce",
      description:
        "Farmers onboard and list fresh produce with quality, quantity, and pricing details.",
      benefit: "Direct market access & fair pricing",
      icon: Leaf,
    },
    {
      step: "02",
      title: "Buyers Discover & Order",
      description:
        "Buyers explore verified listings, compare suppliers, and place orders confidently.",
      benefit: "Transparent sourcing & trusted supply",
      icon: ShoppingCart,
    },
    {
      step: "03",
      title: "Smart Logistics & Delivery",
      description:
        "Optimized logistics with real-time tracking ensure timely delivery from farm to market.",
      benefit: "Predictable delivery & reduced losses",
      icon: Truck,
    },
  ];

  return (
    <>
      {/* ================= HOW IT WORKS ================= */}
      <section
        id="how"
        className="relative overflow-hidden
                   bg-gradient-to-b from-white via-green-50 to-white"
      >
        {/* background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-[360px] w-[360px] rounded-full bg-green-200/40 blur-3xl" />
          <div className="absolute top-1/3 -right-24 h-[300px] w-[300px] rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-[260px] w-[260px] rounded-full bg-lime-200/30 blur-3xl" />
        </div>

        {/* texture */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(22,163,74,0.08),_transparent_45%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-28">

          {/* HEADER */}
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-green-700 uppercase tracking-wide">
              How It Works
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-gray-900">
              A Simple Flow. Powerful Outcomes.
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              FrooteX connects every stakeholder through a unified, transparent
              workflow — from farm to final delivery.
            </p>
          </div>

          {/* STEPS */}
          <div className="mt-20 grid gap-10 md:grid-cols-3">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="group relative rounded-2xl
                             bg-white/80 backdrop-blur
                             border border-gray-200
                             p-8 transition-all duration-300
                             hover:-translate-y-2
                             hover:shadow-xl"
                >
                  {/* Step badge */}
                  <div className="absolute -top-4 -right-4
                                  bg-green-600 text-white
                                  rounded-lg px-3 py-1 text-sm font-semibold">
                    Step {item.step}
                  </div>

                  {/* Icon */}
                  <div
                    className="mb-5 flex h-12 w-12 items-center justify-center
                               rounded-xl bg-green-100 text-green-600
                               group-hover:bg-green-600
                               group-hover:text-white transition"
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Benefit */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-medium text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    {item.benefit}
                  </div>

                  {/* hover bar */}
                  <div
                    className="absolute bottom-0 left-0 h-[3px] w-0
                               bg-green-600 transition-all duration-300
                               group-hover:w-full rounded-b-2xl"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= VALUE / TRUST SECTION ================= */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">

          {/* Heading */}
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold">
              One Platform. Every Stakeholder Aligned.
            </h2>

            <p className="mt-4 text-lg text-gray-400">
              FrooteX removes inefficiencies, middlemen, and guesswork from
              the fruit supply chain — replacing them with trust and data.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              ["3×", "Faster Order Fulfillment"],
              ["100%", "Traceable Supply Chain"],
              ["24/7", "Live Market Access"],
              ["Lower Losses", "Optimized Logistics"],
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
              className="inline-flex items-center gap-2
                         bg-green-600 text-white px-8 py-4 rounded-lg
                         text-base font-semibold hover:bg-green-700 transition"
            >
              Get Started on FrooteX
              <ArrowRight className="h-5 w-5" />
            </a>

            <p className="text-sm text-gray-400 max-w-md">
              Build smarter supply chains with transparency and trust.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
