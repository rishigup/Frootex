import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  Package,
  Wallet,   
  LineChart,
  History,
  UserCircle,
  Store,
  ArrowLeft,
  Plus, 
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import logo from "../assets/frootex-logo.png";

export default function FarmerDashboard() {
  
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);
  const [active, setActive] = useState("My Products");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return navigate("/login");

      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists() && snap.data().role === "Farmer") {
        setAllowed(true);
      } else {
        navigate("/");
      }
    });
    return () => unsub();
  }, [navigate]);

  if (!allowed) return null;

  const menu = [
    { name: "My Products", icon: Leaf },
    { name: "Orders", icon: Package },
    { name: "Earnings", icon: Wallet },
    { name: "Market Prices", icon: LineChart },
    { name: "Harvest History", icon: History },
    { name: "Farmer Profile", icon: UserCircle },
    { name: "Buyer Portfolio View", icon: Store },
  ];

  /* ---------------- CONTENT PER SECTION ---------------- */

  const SectionHeader = ({ title, action }) => (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      {action}
    </div>
  );

  const renderContent = () => {
    switch (active) {
      /* ---------------- MY PRODUCTS ---------------- */
     case "My Products":
  return (
    <>
      {/* HEADER */}
      <SectionHeader
        title="My Products"
        action={
          <button
            className="flex items-center gap-2 px-5 py-2.5
                       bg-green-600 text-white rounded-lg text-sm font-medium
                       hover:bg-green-700 transition shadow"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </button>
        }
      />

      {/* PRODUCT GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {/* PRODUCT CARD */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="group bg-white rounded-2xl border
                       shadow-sm hover:shadow-lg transition overflow-hidden"
          >
            {/* IMAGE */}
            <div className="h-36 bg-gradient-to-br from-green-100 to-yellow-100
                            flex items-center justify-center">
              <Leaf className="w-10 h-10 text-green-600" />
            </div>

            {/* CONTENT */}
            <div className="p-5">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Apple
                </h3>

                {/* STATUS */}
                <span className="px-2.5 py-1 text-xs font-medium
                                 rounded-full bg-green-100 text-green-700">
                  Available
                </span>
              </div>

              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <p>Quantity: <span className="font-medium">500 kg</span></p>
                <p>Price: <span className="font-medium">₹60 / kg</span></p>
                <p>Harvest: <span className="font-medium">Mar 2025</span></p>
              </div>

              {/* ACTIONS */}
              <div className="mt-5 flex items-center justify-between">
                <button
                  className="flex items-center gap-1.5 text-sm
                             text-blue-600 hover:text-blue-700"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>

                <div className="flex gap-3">
                  <button
                    className="text-sm text-yellow-600 hover:text-yellow-700"
                  >
                    Disable
                  </button>

                  <button
                    className="flex items-center gap-1 text-sm
                               text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
      /* ---------------- ORDERS ---------------- */
      case "Orders":
  return (
    <>
      {/* HEADER */}
      <SectionHeader title="Orders" />

      {/* ORDERS LIST */}
      <div className="space-y-6">

        {/* ORDER CARD */}
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white border rounded-2xl p-6
                       shadow-sm hover:shadow-lg transition"
          >
            {/* TOP ROW */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Order ID: <span className="font-medium">#ORD-10{i}</span>
                </p>
                <h3 className="text-lg font-semibold text-gray-800 mt-1">
                  Vishal Traders
                </h3>
              </div>

              {/* STATUS */}
              <span
                className="px-3 py-1 rounded-full text-xs font-medium
                           bg-yellow-100 text-yellow-700"
              >
                Pending
              </span>
            </div>

            {/* ORDER DETAILS */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4
                            text-sm text-gray-600">
              <div>
                <p className="text-xs uppercase text-gray-400">Product</p>
                <p className="font-medium text-gray-800">Apple</p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-400">Quantity</p>
                <p className="font-medium text-gray-800">200 kg</p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-400">Price</p>
                <p className="font-medium text-gray-800">₹120 / kg</p>
              </div>

              <div>
                <p className="text-xs uppercase text-gray-400">Expected Delivery</p>
                <p className="font-medium text-gray-800">25 Mar 2025</p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex gap-3">
                <button
                  className="px-4 py-2 text-sm font-medium
                             bg-green-600 text-white rounded-lg
                             hover:bg-green-700 transition"
                >
                  Accept Order
                </button>

                <button
                  className="px-4 py-2 text-sm font-medium
                             bg-red-100 text-red-700 rounded-lg
                             hover:bg-red-200 transition"
                >
                  Reject
                </button>
              </div>

              <button
                className="text-sm text-blue-600 hover:text-blue-700
                           font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );


      /* ---------------- EARNINGS ---------------- */
      case "Earnings":
  return (
    <>
      {/* HEADER */}
      <SectionHeader
        title="Earnings"
        action={
          <button
            className="px-4 py-2 text-sm font-medium
                       bg-gray-900 text-white rounded-lg
                       hover:bg-gray-800 transition"
          >
            Download Report
          </button>
        }
      />

      {/* SUMMARY CARDS */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Earnings</p>
            <Wallet className="w-5 h-5 text-green-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-green-700">
            ₹1,25,000
          </p>
          <p className="text-xs text-gray-500 mt-1">
            All time earnings
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Received</p>
            <LineChart className="w-5 h-5 text-blue-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-blue-700">
            ₹1,07,000
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Payments completed
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Pending</p>
            <Package className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="mt-3 text-3xl font-bold text-yellow-700">
            ₹18,000
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Awaiting settlement
          </p>
        </div>
      </div>

      {/* BREAKDOWN */}
      <div className="mt-10 bg-white border rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Earnings by Product
        </h3>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span>Mango</span>
            <span className="font-medium">₹55,000</span>
          </div>
          <div className="flex justify-between">
            <span>Apple</span>
            <span className="font-medium">₹42,000</span>
          </div>
          <div className="flex justify-between">
            <span>Banana</span>
            <span className="font-medium">₹28,000</span>
          </div>
        </div>
      </div>
    </>
  );


      /* ---------------- MARKET PRICES ---------------- */
     case "Market Prices":
  return (
    <>
      {/* HEADER */}
      <SectionHeader title="Market Prices" />

      <div className="grid gap-8 lg:grid-cols-3">

        {/* LEFT: PRICE LIST */}
        <div className="lg:col-span-2 space-y-4">
          {[
            { crop: "Mango", price: "₹65 / kg", trend: "up" },
            { crop: "Apple", price: "₹110 / kg", trend: "down" },
            { crop: "Banana", price: "₹38 / kg", trend: "up" },
          ].map((item) => (
            <div
              key={item.crop}
              className="flex items-center justify-between
                         p-5 bg-white border rounded-2xl shadow-sm"
            >
              <div>
                <p className="text-sm text-gray-500">Crop</p>
                <p className="text-lg font-semibold text-gray-800">
                  {item.crop}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">Market Price</p>
                <p
                  className={`text-lg font-semibold ${
                    item.trend === "up"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.price} {item.trend === "up" ? "↑" : "↓"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: POLL & INSIGHTS */}
        <div className="space-y-6">

          {/* POLL */}
          <div className="bg-white border rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              📊 Farmer Poll
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              When mango prices rise, what do you prefer?
            </p>

            <div className="space-y-3">
              <button className="w-full px-4 py-2 rounded-lg border
                                 hover:bg-green-50 text-sm">
                Sell Immediately
              </button>
              <button className="w-full px-4 py-2 rounded-lg border
                                 hover:bg-yellow-50 text-sm">
                Wait for Better Price
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Poll results update in real time.
            </p>
          </div>

          {/* SMART SUGGESTION */}
          <div className="bg-green-50 border border-green-200
                          rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              💡 Smart Suggestion
            </h3>
            <p className="text-sm text-green-800">
              Mango demand is increasing in nearby markets.
              Selling within the next 3–5 days may maximize profit.
            </p>
          </div>
        </div>
      </div>
    </>
  );


      /* ---------------- HARVEST HISTORY ---------------- */
      case "Harvest History":
  return (
    <>
      {/* HEADER */}
      <SectionHeader
        title="Harvest History"
        action={
          <button
            className="flex items-center gap-2 px-4 py-2
                       bg-green-600 text-white rounded-lg text-sm
                       hover:bg-green-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add Harvest
          </button>
        }
      />

      {/* INSIGHT CARD */}
      <div className="mb-6 bg-green-50 border border-green-200
                      rounded-2xl p-5">
        <p className="text-sm text-green-700 font-medium">
          🌾 Insight
        </p>
        <p className="text-sm text-green-800 mt-1">
          Mango has been your most profitable crop over the last 6 months.
        </p>
      </div>

      {/* HARVEST TIMELINE */}
      <div className="space-y-4">

        {/* HARVEST ITEM */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm
                        hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Mango
              </h3>
              <p className="text-sm text-gray-500">
                Harvested on 18 March 2025
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-xs
                             bg-green-100 text-green-700 font-medium">
              Completed
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4
                          text-sm">
            <div>
              <p className="text-xs uppercase text-gray-400">Quantity</p>
              <p className="font-medium text-gray-800">800 kg</p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">Season</p>
              <p className="font-medium text-gray-800">Summer</p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">Quality</p>
              <p className="font-medium text-gray-800">Grade A</p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">Market Value</p>
              <p className="font-medium text-gray-800">₹52,000</p>
            </div>
          </div>
        </div>

        {/* SECOND ITEM */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm
                        hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Apple
              </h3>
              <p className="text-sm text-gray-500">
                Harvested on 05 February 2025
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-xs
                             bg-blue-100 text-blue-700 font-medium">
              Completed
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4
                          text-sm">
            <div>
              <p className="text-xs uppercase text-gray-400">Quantity</p>
              <p className="font-medium text-gray-800">600 kg</p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">Season</p>
              <p className="font-medium text-gray-800">Winter</p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">Quality</p>
              <p className="font-medium text-gray-800">Grade B</p>
            </div>

            <div>
              <p className="text-xs uppercase text-gray-400">Market Value</p>
              <p className="font-medium text-gray-800">₹48,000</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );


      /* ---------------- FARMER PROFILE ---------------- */
      case "Farmer Profile":
  return (
    <>
      {/* HEADER */}
      <SectionHeader
        title="Farmer Profile"
        action={
          <button
            className="flex items-center gap-2 px-4 py-2
                       bg-blue-600 text-white rounded-lg text-sm
                       hover:bg-blue-700 transition"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        }
      />

      {/* PROFILE CARD */}
      <div className="mt-6 bg-white border rounded-3xl shadow-sm p-8">

        {/* TOP INFO */}
        <div className="flex flex-col md:flex-row gap-6">

          {/* FARMER AVATAR */}
          <div className="w-28 h-28 rounded-2xl bg-green-100
                          flex items-center justify-center
                          text-3xl font-bold text-green-700">
            R
          </div>

          {/* BASIC DETAILS */}
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-gray-800">
              Rishabh kr. Gupta
            </h3>
            <p className="text-gray-600 mt-1">
              Organic Fruit Farmer • Patna, Bihar
            </p>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-3">
              <span className="px-3 py-1 rounded-full
                               bg-green-100 text-green-700 text-sm font-medium">
                ⭐ 4.6 / 5
              </span>
              <span className="text-sm text-gray-500">
                (128 buyer ratings)
              </span>
            </div>
          </div>
        </div>

        {/* FARM DETAILS */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-gray-500 uppercase">
              Farm Details
            </p>
            <p className="mt-2 text-gray-700 text-sm leading-relaxed">
              12+ years of experience in fruit farming.
              Specializes in mango, banana, and apple cultivation using
              sustainable and organic practices.
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 uppercase">
              Delivery & Capacity
            </p>
            <ul className="mt-2 text-sm text-gray-700 space-y-1">
              <li>📦 Avg Supply Capacity: 1–2 tons / week</li>
              <li>🚚 Delivery Radius: 200 km</li>
              <li>⏱ Avg Dispatch Time: 24–48 hrs</li>
            </ul>
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="mt-8">
          <p className="text-sm text-gray-500 uppercase mb-3">
            Certifications
          </p>
          <div className="flex gap-3 flex-wrap">
            <span className="px-4 py-1 rounded-full
                             bg-green-50 text-green-700 text-sm">
              🌿 Organic Certified
            </span>
            <span className="px-4 py-1 rounded-full
                             bg-blue-50 text-blue-700 text-sm">
              FSSAI Registered
            </span>
          </div>
        </div>

        {/* AVAILABLE PRODUCE */}
        <div className="mt-8">
          <p className="text-sm text-gray-500 uppercase mb-3">
            Available Produce
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border rounded-xl p-4">
              <p className="font-medium">Mango</p>
              <p className="text-sm text-gray-600">₹60 / kg</p>
            </div>
            <div className="border rounded-xl p-4">
              <p className="font-medium">Banana</p>
              <p className="text-sm text-gray-600">₹35 / kg</p>
            </div>
            <div className="border rounded-xl p-4">
              <p className="font-medium">Apple</p>
              <p className="text-sm text-gray-600">₹120 / kg</p>
            </div>
          </div>
        </div>

        {/* TRUST NOTE */}
        <div className="mt-10 bg-green-50 border border-green-200
                        rounded-2xl p-5">
          <p className="text-sm text-green-800">
            ✅ Buyers trust this farmer for consistent quality,
            timely delivery, and transparent pricing.
          </p>
        </div>
      </div>
    </>
  );


      /* ---------------- BUYER VIEW ---------------- */
      case "Buyer Portfolio View":
  return (
    <>
      {/* HEADER */}
      <SectionHeader title="Buyer Portfolio" />

      {/* INFO NOTE */}
      <div className="mb-6 bg-blue-50 border border-blue-200
                      rounded-2xl p-5">
        <p className="text-sm text-blue-800">
          👥 Browse verified buyers and MSMEs. Choose whom to sell based on
          ratings, demand, and payment reliability.
        </p>
      </div>

      {/* BUYER LIST */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {/* BUYER CARD */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white border rounded-2xl p-6 shadow-sm
                       hover:shadow-lg transition"
          >
            {/* TOP */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  GreenFresh Traders
                </h3>
                <p className="text-sm text-gray-500">
                  Wholesaler • Delhi NCR
                </p>
              </div>

              {/* RATING */}
              <span className="px-3 py-1 rounded-full
                               bg-green-100 text-green-700
                               text-sm font-medium">
                ⭐ 4.7
              </span>
            </div>

            {/* BUYER STATS */}
            <div className="mt-4 space-y-2 text-sm text-gray-700">
              <p>📦 Avg Purchase: 1.5 tons / month</p>
              <p>💰 Payment Reliability: <span className="font-medium text-green-600">High</span></p>
              <p>⏱ Avg Payment Time: 3–5 days</p>
            </div>

            {/* INTEREST */}
            <div className="mt-4">
              <p className="text-xs uppercase text-gray-400 mb-1">
                Interested Crops
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs">
                  Mango
                </span>
                <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-xs">
                  Banana
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex items-center justify-between">
              <button
                className="text-sm text-blue-600 hover:text-blue-700
                           font-medium"
              >
                View Profile
              </button>

              <button
                className="px-3 py-1.5 text-sm
                           bg-green-600 text-white rounded-lg
                           hover:bg-green-700 transition"
              >
                Sell to Buyer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TRUST LEGEND */}
      <div className="mt-10 grid md:grid-cols-3 gap-4 text-sm">
        <div className="bg-white border rounded-xl p-4">
          ⭐ Rating reflects buyer reliability & reviews
        </div>
        <div className="bg-white border rounded-xl p-4">
          💰 Payment reliability based on past transactions
        </div>
        <div className="bg-white border rounded-xl p-4">
          📦 Purchase volume shows buyer capacity
        </div>
      </div>
    </>
  );


      default:
        return null;
    }
  };

  /* ---------------- UI LAYOUT ---------------- */

  return (
    <div className="relative min-h-screen flex
                    bg-gradient-to-br from-green-50 via-white to-yellow-50">

      {/* LOGO WATERMARK */}
      <div className="absolute inset-0 flex items-center justify-center
                      opacity-[0.04] pointer-events-none">
        <img src={logo} alt="bg" className="w-[520px]" />
      </div>

      {/* SIDEBAR */}
      <aside className="w-64 bg-white/90 backdrop-blur border-r fixed inset-y-0 z-10">
        <div className="p-6 border-b">
          <img src={logo} alt="FrooteX" className="h-8" />
        </div>

        <nav className="p-4 space-y-1">
          {menu.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setActive(name)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm
                ${
                  active === name
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Icon className="w-4 h-4" />
              {name}
            </button>
          ))}
        </nav>

        <button
          onClick={() => navigate("/")}
          className="absolute bottom-6 left-6 flex items-center gap-2
                     text-sm text-gray-500 hover:text-green-600"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </aside>

      {/* MAIN */}
      <main className="ml-64 flex-1 p-10 relative z-10">
        <div className="bg-white/80 backdrop-blur rounded-3xl
                        shadow-xl border border-green-100 p-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
