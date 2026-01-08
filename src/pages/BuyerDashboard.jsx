import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Store,
  ShoppingCart,
  UserCircle,
  Search,
  Menu,
  X,
} from "lucide-react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import logo from "../assets/frootex-logo.png";

export default function BuyerDashboard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("Marketplace");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [buyer, setBuyer] = useState(null);

  /* ================= AUTH ================= */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return navigate("/login");

      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setBuyer(snap.data());
      setLoading(false);
    });

    return () => unsub();
  }, [navigate]);

  /* ================= PRODUCTS ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDocs(collection(db, "products"));
      setProducts(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center
                      bg-gradient-to-br from-green-50 to-green-100">
        <div className="bg-white/70 backdrop-blur p-8 rounded-2xl shadow-xl">
          <div className="w-10 h-10 border-4 border-green-200
                          border-t-green-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-gray-600 text-center">
            Loading Buyer Dashboard...
          </p>
        </div>
      </div>
    );
  }

  const filtered = products.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  const menu = [
    { name: "Marketplace", icon: Store },
    { name: "My Orders", icon: ShoppingCart },
    { name: "Profile", icon: UserCircle },
  ];

  const renderContent = () => {
    switch (active) {
      /* ================= MARKETPLACE ================= */
     case "Marketplace":
  return (
    <>
      {/* ================= STICKY HEADER ================= */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur
                      border-b mb-8">
        <div className="py-4 flex flex-col lg:flex-row
                        lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              FrooteX Marketplace
            </h1>
            <p className="text-sm text-gray-500">
              India’s trusted B2B fruit sourcing platform
            </p>
          </div>

          <div className="flex gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search fruits, farmers, location..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border
                           focus:ring-2 focus:ring-green-200"
              />
            </div>

            <select className="border rounded-xl px-3 py-2.5 text-sm">
              <option>Sort</option>
              <option>Newest</option>
              <option>Price: Low → High</option>
              <option>Price: High → Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* ================= CATEGORY PILLS ================= */}
      <div className="flex gap-3 overflow-x-auto mb-8 pb-1">
        {["All", "Apple", "Banana", "Mango", "Orange", "Pomegranate"].map(
          (cat) => (
            <button
              key={cat}
              className="px-4 py-1.5 rounded-full text-sm
                         bg-green-50 text-green-700
                         hover:bg-green-100 transition whitespace-nowrap"
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Products", value: filtered.length },
          { label: "Verified Farmers", value: "120+" },
          { label: "Avg Price", value: "₹58/kg" },
          { label: "Live Orders", value: "36" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 shadow
                       hover:shadow-md transition"
          >
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-800">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* ================= PRODUCT GRID ================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-3xl
                       shadow-md hover:shadow-xl
                       transition overflow-hidden"
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={item.image}
                className="h-48 w-full object-cover
                           group-hover:scale-105 transition"
              />

              <span className="absolute top-3 left-3
                               bg-green-600 text-white
                               text-xs px-3 py-1 rounded-full">
                Verified
              </span>
            </div>

            {/* BODY */}
            <div className="p-5">
              <h3 className="font-semibold text-lg text-gray-800">
                {item.name}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                {item.farmerName}
              </p>

              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-green-700 font-bold text-xl">
                    ₹{item.price}
                  </p>
                  <p className="text-xs text-gray-500">per kg</p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    {item.quantity} kg
                  </p>
                  <p className="text-xs text-gray-400">Available</p>
                </div>
              </div>

              {/* STOCK BAR */}
              <div className="mt-4">
                <div className="h-1.5 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${item.stockPercent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Stock availability
                </p>
              </div>

              {/* CTA */}
              <button
                className="mt-5 w-full bg-green-600 hover:bg-green-700
                           text-white py-2.5 rounded-xl text-sm transition"
              >
                Buy / Request Quote
              </button>

              <p className="text-xs text-center text-gray-400 mt-2">
                Bulk orders supported
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );


case "My Orders": {
  const orders = [
    {
      id: "ORD-3021",
      farmer: "Patna Farm",
      product: "Apple",
      qty: 200,
      price: 60,
      status: "Pending",
      progress: 30,
      date: "14 Aug 2025",
    },
    {
      id: "ORD-3002",
      farmer: "Ratnagiri Mango Farm",
      product: "Alphonso Mango",
      qty: 150,
      price: 120,
      status: "In Transit",
      progress: 65,
      date: "12 Aug 2025",
    },
    {
      id: "ORD-2988",
      farmer: "Muzaffarpur Farm",
      product: "Banana",
      qty: 500,
      price: 28,
      status: "Completed",
      progress: 100,
      date: "10 Aug 2025",
    },
  ];

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "In Transit":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">My Orders</h2>
          <p className="text-sm text-gray-500">
            Track your purchases & deliveries
          </p>
        </div>

        <select className="border rounded-xl px-4 py-2 text-sm">
          <option>All Orders</option>
          <option>Pending</option>
          <option>In Transit</option>
          <option>Completed</option>
        </select>
      </div>

      {/* ===== ORDERS LIST ===== */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl p-5 shadow-sm border"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">
                {order.product}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <p className="text-sm text-gray-500">
              Farmer: {order.farmer}
            </p>

            <div className="flex justify-between text-sm mt-2">
              <span>Qty: {order.qty} kg</span>
              <span>₹{order.price}/kg</span>
              <span>{order.date}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${order.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}


      case "Profile":
  return (
    <div className="max-w-4xl mx-auto
                    bg-white rounded-3xl
                    shadow-xl p-8">

      {/* ===== HEADER ===== */}
      <div className="flex items-center gap-5 mb-8">
        <div className="h-20 w-20 rounded-full
                        bg-green-100 flex items-center justify-center
                        text-green-700 text-2xl font-bold">
          {buyer?.name?.charAt(0) || "B"}
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Buyer Profile
          </h2>
          <p className="text-sm text-gray-500">
            Manage your business information
          </p>

          <span className="inline-block mt-2
                           text-xs px-3 py-1 rounded-full
                           bg-green-100 text-green-700">
            Verified Buyer
          </span>
        </div>
      </div>

      {/* ===== BASIC INFO ===== */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div>
          <label className="text-xs text-gray-500">
            Buyer Name
          </label>
          <input
            className="w-full border p-3 rounded-xl mt-1
                       bg-gray-50 cursor-not-allowed"
            value={buyer?.name || ""}
            readOnly
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">
            Email Address
          </label>
          <input
            className="w-full border p-3 rounded-xl mt-1
                       bg-gray-50 cursor-not-allowed"
            value={buyer?.email || ""}
            readOnly
          />
        </div>
      </div>

      {/* ===== BUSINESS DETAILS ===== */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Business Details
        </h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-xs text-gray-500">
              Business Location
            </label>
            <input
              className="w-full border p-3 rounded-xl mt-1"
              placeholder="Patna, Bihar"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500">
              Business Type
            </label>
            <select
              className="w-full border p-3 rounded-xl mt-1"
            >
              <option>Wholesaler</option>
              <option>Retailer</option>
              <option>Distributor</option>
              <option>Processor</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs text-gray-500">
            About Your Business
          </label>
          <textarea
            rows="4"
            className="w-full border p-3 rounded-xl mt-1"
            placeholder="We source fruits in bulk for retail & wholesale markets..."
          />
        </div>
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="flex justify-end gap-4 mt-10">
        <button
          className="px-6 py-2 rounded-xl
                     border text-gray-600
                     hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          className="px-8 py-2 rounded-xl
                     bg-green-600 hover:bg-green-700
                     text-white text-sm font-medium
                     transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex relative
                    bg-gradient-to-br from-green-50 via-white to-green-100">

      <div className="md:hidden fixed top-0 left-0 right-0 z-30
                      bg-white/80 backdrop-blur border-b
                      flex items-center justify-between px-4 py-3">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu />
        </button>
        <img src={logo} className="h-7" />
        <button onClick={() => navigate("/")}>
          <Home className="text-green-600" />
        </button>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 h-full w-64
        bg-white/90 backdrop-blur border-r z-30
        transform transition-transform duration-300
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-6 border-b">
          <img src={logo} className="h-8" />
        </div>

        <nav className="p-4 space-y-1">
          {menu.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => {
                setActive(name);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3
                px-4 py-2 rounded-xl text-sm transition
                ${
                  active === name
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Icon size={16} />
              {name}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 pt-16 md:pt-0 p-4 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
}
