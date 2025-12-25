import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Leaf,
  Package,
  Wallet,
  LineChart,
  History,
  UserCircle,
  Store,
  Home,
  ArrowLeft,
  Plus,
  Trash2,
  Edit,
  Upload,
  Menu,
  X,
} from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import logo from "../assets/frootex-logo.png";

export default function FarmerDashboard() {
  const navigate = useNavigate();

  /* ================= STATES ================= */
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("My Products");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [productForm, setProductForm] = useState({
    name: "",
    quantity: "",
    price: "",
    image: null,
  });

  /* ================= AUTH ================= */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return navigate("/login");

      const snap = await getDoc(doc(db, "users", user.uid));
      if (!snap.exists() || snap.data().role !== "Farmer") {
        navigate("/");
      }
      setLoading(false);
    });

    return () => unsub();
  }, [navigate]);

  /* ================= CRUD ================= */
  const saveProduct = () => {
    if (!productForm.name) return;

    if (editingId) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...p, ...productForm } : p
        )
      );
    } else {
      setProducts((prev) => [
        ...prev,
        { id: Date.now(), ...productForm },
      ]);
    }

    setProductForm({ name: "", quantity: "", price: "", image: null });
    setEditingId(null);
    setShowModal(false);
  };

  const editProduct = (p) => {
    setProductForm(p);
    setEditingId(p.id);
    setShowModal(true);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center
                      bg-gradient-to-br from-green-50 to-green-100">
        <div className="bg-white/70 backdrop-blur p-8 rounded-2xl shadow-xl">
          <div className="w-10 h-10 border-4 border-green-200
                          border-t-green-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-gray-600 text-center">
            Verifying Farmer Access...
          </p>
        </div>
      </div>
    );
  }

  /* ================= MENU ================= */
  const menu = [
    { name: "My Products", icon: Leaf },
    { name: "Orders", icon: Package },
    { name: "Earnings", icon: Wallet },
    { name: "Market Prices", icon: LineChart },
    { name: "Harvest History", icon: History },
    { name: "Farmer Profile", icon: UserCircle },
    { name: "Buyer Portfolio View", icon: Store },
  ];

  /* ================= CONTENT ================= */
  const renderContent = () => {
    switch (active) {
      case "My Products":
  return (
    <>
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            My Products
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your crops and products listed for buyers
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2
                     bg-green-600 hover:bg-green-700
                     text-white px-4 py-2 rounded-xl
                     text-sm shadow"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* SUMMARY STATS (DUMMY DATA) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Total Products</p>
          <h3 className="text-xl font-semibold text-gray-800 mt-1">
            {products.length || 5}
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Active Listings</p>
          <h3 className="text-xl font-semibold text-green-600 mt-1">
            4
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Avg. Price</p>
          <h3 className="text-xl font-semibold text-gray-800 mt-1">
            ₹42 / kg
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Buyer Interest</p>
          <h3 className="text-xl font-semibold text-blue-600 mt-1">
            High
          </h3>
        </div>
      </div>

      {/* PRODUCT GRID */}
      {products.length === 0 ? (
        <div className="bg-white/80 backdrop-blur
                        rounded-3xl p-10 text-center shadow">
          <p className="text-gray-600 mb-4">
            You haven’t added any products yet.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2
                       bg-green-600 text-white
                       px-5 py-2 rounded-xl text-sm"
          >
            <Plus size={16} /> Add Your First Product
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white/80 backdrop-blur
                         rounded-2xl shadow-lg p-5
                         hover:shadow-xl transition"
            >
              {p.image && (
                <img
                  src={URL.createObjectURL(p.image)}
                  className="h-32 w-full object-cover rounded-xl mb-3"
                />
              )}

              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">
                  {p.name}
                </h3>
                <span className="text-xs px-2 py-1
                                 bg-green-100 text-green-700
                                 rounded-full">
                  Active
                </span>
              </div>

              <p className="text-sm text-gray-600">
                Quantity: <span className="font-medium">{p.quantity}</span>
              </p>
              <p className="text-sm text-gray-600">
                Price: <span className="font-medium">{p.price}</span>
              </p>

              <div className="flex justify-between items-center mt-5">
                <button
                  onClick={() => editProduct(p)}
                  className="text-blue-600 text-sm flex items-center gap-1"
                >
                  <Edit size={14} /> Edit
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="text-red-600 text-sm flex items-center gap-1"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );

  case "Orders":
  return (
    <>
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Orders
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Track orders placed by buyers for your products
        </p>
      </div>

      {/* ORDER SUMMARY (DUMMY STATS) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Total Orders</p>
          <h3 className="text-xl font-semibold text-gray-800 mt-1">
            12
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Pending</p>
          <h3 className="text-xl font-semibold text-yellow-600 mt-1">
            3
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Completed</p>
          <h3 className="text-xl font-semibold text-green-600 mt-1">
            9
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Total Revenue</p>
          <h3 className="text-xl font-semibold text-blue-600 mt-1">
            ₹48,500
          </h3>
        </div>
      </div>

      {/* ORDER LIST */}
      <div className="space-y-5">
        {/* ORDER CARD */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-800">
                Order #ORD-1023
              </h3>
              <p className="text-sm text-gray-500">
                Buyer: Patna Wholesale Market
              </p>
            </div>

            <span className="text-xs px-3 py-1 rounded-full
                             bg-yellow-100 text-yellow-700">
              Pending
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <p>
              Product: <span className="font-medium">Apple</span>
            </p>
            <p>
              Quantity: <span className="font-medium">200 kg</span>
            </p>
            <p>
              Price: <span className="font-medium">₹60 / kg</span>
            </p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-xs text-gray-400">
              Ordered on: 12 Aug 2025
            </p>

            <button
              className="text-sm text-green-600 font-medium hover:underline"
            >
              Mark as Completed
            </button>
          </div>
        </div>

        {/* ORDER CARD */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-800">
                Order #ORD-1018
              </h3>
              <p className="text-sm text-gray-500">
                Buyer: Delhi Fruit Traders
              </p>
            </div>

            <span className="text-xs px-3 py-1 rounded-full
                             bg-green-100 text-green-700">
              Completed
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <p>
              Product: <span className="font-medium">Banana</span>
            </p>
            <p>
              Quantity: <span className="font-medium">500 kg</span>
            </p>
            <p>
              Price: <span className="font-medium">₹28 / kg</span>
            </p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-xs text-gray-400">
              Delivered on: 08 Aug 2025
            </p>

            <span className="text-xs text-gray-500">
              Payment Received
            </span>
          </div>
        </div>
      </div>
    </>
  );

  case "Earnings":
  return (
    <>
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Earnings
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your income from sold products
        </p>
      </div>

      {/* EARNINGS SUMMARY (DUMMY DATA) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Total Earnings</p>
          <h3 className="text-xl font-semibold text-green-700 mt-1">
            ₹1,24,500
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">This Month</p>
          <h3 className="text-xl font-semibold text-blue-600 mt-1">
            ₹32,800
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Pending Payments</p>
          <h3 className="text-xl font-semibold text-yellow-600 mt-1">
            ₹8,200
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Avg. Monthly</p>
          <h3 className="text-xl font-semibold text-gray-800 mt-1">
            ₹27,000
          </h3>
        </div>
      </div>

      {/* EARNINGS BREAKDOWN */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* PRODUCT WISE */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            Earnings by Product
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Apple</span>
              <span className="font-medium">₹52,000</span>
            </div>
            <div className="flex justify-between">
              <span>Banana</span>
              <span className="font-medium">₹38,500</span>
            </div>
            <div className="flex justify-between">
              <span>Mango</span>
              <span className="font-medium">₹34,000</span>
            </div>
          </div>
        </div>

        {/* MONTHLY TREND */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            Monthly Earnings Trend
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>June</span>
              <span className="font-medium">₹22,400</span>
            </div>
            <div className="flex justify-between">
              <span>July</span>
              <span className="font-medium">₹29,300</span>
            </div>
            <div className="flex justify-between">
              <span>August</span>
              <span className="font-medium text-green-700">
                ₹32,800 ↑
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT PAYMENTS */}
      <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
        <h3 className="font-semibold text-gray-800 mb-4">
          Recent Payments
        </h3>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <div>
              <p className="font-medium">Order #ORD-1018</p>
              <p className="text-gray-500">Delhi Fruit Traders</p>
            </div>
            <span className="font-semibold text-green-700">
              + ₹14,000
            </span>
          </div>

          <div className="flex justify-between">
            <div>
              <p className="font-medium">Order #ORD-1023</p>
              <p className="text-gray-500">Patna Wholesale Market</p>
            </div>
            <span className="font-semibold text-yellow-600">
              + ₹8,200 (Pending)
            </span>
          </div>
        </div>
      </div>
    </>
  );
case "Market Prices":
  return (
    <>
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Market Prices
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Latest mandi prices to help you sell at the right time
        </p>
      </div>

      {/* MARKET SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Market Status</p>
          <h3 className="text-lg font-semibold text-green-700 mt-1">
            Open
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Trending Crop</p>
          <h3 className="text-lg font-semibold text-blue-600 mt-1">
            Apple 🍎
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Highest Demand</p>
          <h3 className="text-lg font-semibold text-yellow-600 mt-1">
            Banana 🍌
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Last Updated</p>
          <h3 className="text-sm font-medium text-gray-800 mt-1">
            Today, 10:30 AM
          </h3>
        </div>
      </div>

      {/* PRICE TABLE */}
      <div className="bg-white/80 backdrop-blur rounded-3xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-4 bg-green-50 p-4 text-sm font-medium text-gray-700">
          <span>Crop</span>
          <span>Mandi</span>
          <span>Price (₹ / kg)</span>
          <span>Trend</span>
        </div>

        {/* ROW */}
        <div className="grid grid-cols-4 p-4 text-sm border-t">
          <span className="font-medium">Apple</span>
          <span>Patna</span>
          <span className="font-semibold text-green-700">
            ₹62
          </span>
          <span className="text-green-600">▲ Rising</span>
        </div>

        <div className="grid grid-cols-4 p-4 text-sm border-t">
          <span className="font-medium">Banana</span>
          <span>Muzaffarpur</span>
          <span className="font-semibold text-gray-800">
            ₹28
          </span>
          <span className="text-red-600">▼ Falling</span>
        </div>

        <div className="grid grid-cols-4 p-4 text-sm border-t">
          <span className="font-medium">Mango</span>
          <span>Bhagalpur</span>
          <span className="font-semibold text-green-700">
            ₹55
          </span>
          <span className="text-green-600">▲ Rising</span>
        </div>

        <div className="grid grid-cols-4 p-4 text-sm border-t">
          <span className="font-medium">Papaya</span>
          <span>Gaya</span>
          <span className="font-semibold text-gray-800">
            ₹32
          </span>
          <span className="text-gray-500">— Stable</span>
        </div>
      </div>

      {/* INSIGHT CARD */}
      <div className="mt-8 bg-green-50 rounded-2xl p-6">
        <h3 className="font-semibold text-green-800 mb-2">
          Market Insight
        </h3>
        <p className="text-sm text-green-700">
          Apple and Mango prices are trending upward this week.
          Consider listing your stock now to maximize profits.
        </p>
      </div>
    </>
  );
case "Harvest History":
  return (
    <>
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Harvest History
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Track past harvests, yields, and performance over time
        </p>
      </div>

      {/* SUMMARY STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Total Harvests</p>
          <h3 className="text-xl font-semibold text-gray-800 mt-1">
            18
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Best Yield</p>
          <h3 className="text-xl font-semibold text-green-700 mt-1">
            1,200 kg
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Avg. Quality</p>
          <h3 className="text-xl font-semibold text-blue-700 mt-1">
            Grade A
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Total Revenue</p>
          <h3 className="text-xl font-semibold text-gray-800 mt-1">
            ₹2,10,000
          </h3>
        </div>
      </div>

      {/* HARVEST LIST */}
      <div className="space-y-6">
        {/* HARVEST CARD */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-800">
                Apple Harvest – Summer 2025
              </h3>
              <p className="text-sm text-gray-500">
                Harvest Date: 05 Aug 2025
              </p>
            </div>

            <span className="text-xs px-3 py-1 rounded-full
                             bg-green-100 text-green-700">
              Completed
            </span>
          </div>

          <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
            <p>
              Quantity: <span className="font-medium">800 kg</span>
            </p>
            <p>
              Quality: <span className="font-medium">Grade A</span>
            </p>
            <p>
              Sold At: <span className="font-medium">₹60 / kg</span>
            </p>
            <p>
              Revenue: <span className="font-medium">₹48,000</span>
            </p>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Notes: High demand due to premium quality apples.
          </p>
        </div>

        {/* HARVEST CARD */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-800">
                Banana Harvest – Monsoon 2025
              </h3>
              <p className="text-sm text-gray-500">
                Harvest Date: 18 Jul 2025
              </p>
            </div>

            <span className="text-xs px-3 py-1 rounded-full
                             bg-blue-100 text-blue-700">
              Completed
            </span>
          </div>

          <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
            <p>
              Quantity: <span className="font-medium">1,200 kg</span>
            </p>
            <p>
              Quality: <span className="font-medium">Grade B+</span>
            </p>
            <p>
              Sold At: <span className="font-medium">₹28 / kg</span>
            </p>
            <p>
              Revenue: <span className="font-medium">₹33,600</span>
            </p>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Notes: Slight price drop due to excess market supply.
          </p>
        </div>

        {/* HARVEST CARD */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-800">
                Mango Harvest – Summer 2024
              </h3>
              <p className="text-sm text-gray-500">
                Harvest Date: 02 Jun 2024
              </p>
            </div>

            <span className="text-xs px-3 py-1 rounded-full
                             bg-yellow-100 text-yellow-700">
              Archived
            </span>
          </div>

          <div className="grid md:grid-cols-4 gap-4 text-sm text-gray-600">
            <p>
              Quantity: <span className="font-medium">950 kg</span>
            </p>
            <p>
              Quality: <span className="font-medium">Grade A</span>
            </p>
            <p>
              Sold At: <span className="font-medium">₹52 / kg</span>
            </p>
            <p>
              Revenue: <span className="font-medium">₹49,400</span>
            </p>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Notes: Strong seasonal demand resulted in good pricing.
          </p>
        </div>
      </div>
    </>
  );
case "Buyer Portfolio View":
  return (
    <>
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Buyer Profiles
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          View verified buyers interested in purchasing your products
        </p>
      </div>

      {/* BUYER SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Total Buyers</p>
          <h3 className="text-xl font-semibold text-gray-800 mt-1">
            8
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Verified Buyers</p>
          <h3 className="text-xl font-semibold text-green-700 mt-1">
            6
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Active Orders</p>
          <h3 className="text-xl font-semibold text-blue-700 mt-1">
            3
          </h3>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow">
          <p className="text-xs text-gray-500">Trust Level</p>
          <h3 className="text-xl font-semibold text-purple-700 mt-1">
            High
          </h3>
        </div>
      </div>

      {/* BUYER LIST */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* BUYER CARD */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
              PM
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                Patna Wholesale Market
              </h3>
              <p className="text-sm text-gray-500">
                Bihar
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              Interested Crop: <span className="font-medium">Apple</span>
            </p>
            <p>
              Buying Capacity: <span className="font-medium">500+ kg</span>
            </p>
            <p>
              Avg. Price Offered: <span className="font-medium">₹58/kg</span>
            </p>
          </div>

          <div className="flex justify-between items-center mt-5">
            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
              Verified
            </span>
            <button className="text-sm text-green-600 font-medium hover:underline">
              View Details
            </button>
          </div>
        </div>

        {/* BUYER CARD */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              DF
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                Delhi Fruit Traders
              </h3>
              <p className="text-sm text-gray-500">
                Delhi
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              Interested Crop: <span className="font-medium">Banana</span>
            </p>
            <p>
              Buying Capacity: <span className="font-medium">1,000+ kg</span>
            </p>
            <p>
              Avg. Price Offered: <span className="font-medium">₹30/kg</span>
            </p>
          </div>

          <div className="flex justify-between items-center mt-5">
            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">
              Verified
            </span>
            <button className="text-sm text-green-600 font-medium hover:underline">
              View Details
            </button>
          </div>
        </div>

        {/* BUYER CARD */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold">
              GF
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                Gaya Fruit Hub
              </h3>
              <p className="text-sm text-gray-500">
                Bihar
              </p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p>
              Interested Crop: <span className="font-medium">Mango</span>
            </p>
            <p>
              Buying Capacity: <span className="font-medium">300+ kg</span>
            </p>
            <p>
              Avg. Price Offered: <span className="font-medium">₹54/kg</span>
            </p>
          </div>

          <div className="flex justify-between items-center mt-5">
            <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
              New Buyer
            </span>
            <button className="text-sm text-green-600 font-medium hover:underline">
              View Details
            </button>
          </div>
        </div>
      </div>
    </>
  );

     case "Farmer Profile":
  return (
    <div className="max-w-4xl mx-auto
                    bg-white/80 backdrop-blur
                    rounded-3xl shadow-xl p-8">

      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Farmer Profile
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          This profile will be visible to buyers and marketplaces
        </p>
      </div>

      {/* PHOTOS */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Farmer Photo */}
        <label className="border-2 border-dashed rounded-2xl
                          p-6 text-center cursor-pointer
                          hover:bg-gray-50 transition">
          <Upload className="mx-auto mb-2 text-green-600" />
          <p className="font-medium text-gray-700">
            Upload Farmer Photo
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Builds trust with buyers
          </p>
          <input type="file" hidden />
        </label>

        {/* Farm Photo */}
        <label className="border-2 border-dashed rounded-2xl
                          p-6 text-center cursor-pointer
                          hover:bg-gray-50 transition">
          <Upload className="mx-auto mb-2 text-green-600" />
          <p className="font-medium text-gray-700">
            Upload Farm Photo
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Show your farm & crop quality
          </p>
          <input type="file" hidden />
        </label>
      </div>

      {/* BASIC DETAILS */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          className="border p-3 rounded-xl"
          placeholder="Farmer Name"
        />
        <input
          className="border p-3 rounded-xl"
          placeholder="Farm Location (Village, State)"
        />
        <input
          className="border p-3 rounded-xl"
          placeholder="Experience (e.g. 10 years)"
        />
      </div>

      {/* FARM DETAILS */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <input
          className="border p-3 rounded-xl"
          placeholder="Primary Crops (e.g. Apple, Banana)"
        />
        <select className="border p-3 rounded-xl">
          <option>Farming Type</option>
          <option>Organic Farming</option>
          <option>Natural Farming</option>
          <option>Traditional Farming</option>
        </select>
      </div>

      {/* ABOUT FARMER */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          About the Farmer
        </label>
        <textarea
          rows="4"
          className="w-full border p-3 rounded-xl"
          placeholder="Tell buyers about your farming journey, quality practices, and why they should buy from you..."
        />
      </div>

      {/* TRUST BADGES (DUMMY – VERY ATTRACTIVE) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600">Experience</p>
          <p className="font-semibold text-green-700">10+ Years</p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600">Quality Rating</p>
          <p className="font-semibold text-blue-700">★★★★☆</p>
        </div>

        <div className="bg-yellow-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600">Buyer Trust</p>
          <p className="font-semibold text-yellow-700">High</p>
        </div>

        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600">Verified Farm</p>
          <p className="font-semibold text-purple-700">Yes</p>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="mt-8 text-right">
        <button
          className="bg-green-600 hover:bg-green-700
                     text-white px-6 py-2 rounded-xl
                     text-sm shadow"
        >
          Save Profile
        </button>
      </div>
    </div>
  );


      default:
        return <p className="text-gray-600">Coming Soon…</p>;
    }
  };

  /* ================= FINAL UI ================= */
  return (
    <div className="min-h-screen flex relative
                    bg-gradient-to-br from-green-50 via-white to-green-100">

      {/* Soft background glow */}
      <div className="absolute inset-0 pointer-events-none
  bg-[radial-gradient(ellipse_at_top,_rgba(34,197,94,0.18),_transparent_55%)]
" />


      {/* MOBILE TOP BAR */}
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

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
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
        <div className="p-6 border-b flex justify-between items-center">
          <img src={logo} className="h-8" />
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
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

        <div className="p-4 border-t">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-2
                       bg-green-600 text-white py-2 rounded-xl text-sm"
          >
            <ArrowLeft size={16} /> Home
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 pt-16 md:pt-0 p-4 md:p-8 relative z-10">
        {renderContent()}
      </main>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50
                        flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-96">
            <h3 className="font-semibold mb-4">
              {editingId ? "Edit Product" : "Add Product"}
            </h3>

            <input
              className="w-full border p-2 rounded mb-2"
              placeholder="Product Name"
              value={productForm.name}
              onChange={(e) =>
                setProductForm({ ...productForm, name: e.target.value })
              }
            />
            <input
              className="w-full border p-2 rounded mb-2"
              placeholder="Quantity"
              value={productForm.quantity}
              onChange={(e) =>
                setProductForm({ ...productForm, quantity: e.target.value })
              }
            />
            <input
              className="w-full border p-2 rounded mb-2"
              placeholder="Price"
              value={productForm.price}
              onChange={(e) =>
                setProductForm({ ...productForm, price: e.target.value })
              }
            />
            <input
              type="file"
              className="mb-4"
              onChange={(e) =>
                setProductForm({ ...productForm, image: e.target.files[0] })
              }
            />

            <button
              onClick={saveProduct}
              className="w-full bg-green-600 text-white py-2 rounded-xl"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
