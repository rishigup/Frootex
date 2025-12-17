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
    <section id="how" className="relative bg-white overflow-hidden">
      
      {/* subtle background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(22,163,74,0.06),transparent_45%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-28">
        
        {/* Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-green-600 uppercase tracking-wide">
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
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gray-200"></div>

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
                  className={`p-8 rounded-2xl border bg-gray-50 shadow-sm
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
                  <div className="w-4 h-4 rounded-full bg-green-600 ring-8 ring-green-100"></div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
