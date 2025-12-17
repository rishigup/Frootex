export default function Segments() {
  return (
    <section id="solutions" className="py-16 bg-gray-100">
      <h2 className="text-3xl font-extrabold text-center mb-12">
        Who We Connect
      </h2>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {[
          ["🌾", "For Farmers", "primary-green"],
          ["🛒", "For Bulk Buyers", "accent-orange"],
          ["🏭", "For MSMEs", "secondary-blue"],
        ].map(([icon, title, color]) => (
          <div
            key={title}
            className={`bg-white p-8 rounded-2xl shadow-xl border-t-8 border-${color}`}
          >
            <h3 className={`text-2xl font-bold text-${color}`}>
              {icon} {title}
            </h3>
            <p className="mt-3 text-gray-600">
              End-to-end solutions designed for growth and transparency.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
