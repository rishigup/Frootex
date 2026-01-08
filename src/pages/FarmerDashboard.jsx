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
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { auth, db, storage } from "../firebase/firebase";
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

  /* ================= AUTH + FETCH ================= */
  useEffect(() => {
    const fetchProducts = async (uid) => {
      const q = query(
        collection(db, "products"),
        where("farmerId", "==", uid)
      );

      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setProducts(list);
    };

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return navigate("/login");

      const userSnap = await getDoc(doc(db, "users", user.uid));
      if (!userSnap.exists() || userSnap.data().role !== "Farmer") {
        navigate("/");
        return;
      }

      await fetchProducts(user.uid);
      setLoading(false);
    });

    return () => unsub();
  }, [navigate]);

  /* ================= CRUD ================= */
  const saveProduct = async () => {
    if (!productForm.name) return;

    let imageUrl = "";

    if (productForm.image) {
      const imageRef = ref(
        storage,
        `products/${auth.currentUser.uid}/${Date.now()}`
      );
      await uploadBytes(imageRef, productForm.image);
      imageUrl = await getDownloadURL(imageRef);
    }

    if (editingId) {
      await updateDoc(doc(db, "products", editingId), {
        name: productForm.name,
        quantity: productForm.quantity,
        price: productForm.price,
        ...(imageUrl && { imageUrl }),
      });

      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingId
            ? { ...p, ...productForm, imageUrl: imageUrl || p.imageUrl }
            : p
        )
      );
    } else {
      const docRef = await addDoc(collection(db, "products"), {
        farmerId: auth.currentUser.uid,
        name: productForm.name,
        quantity: productForm.quantity,
        price: productForm.price,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      setProducts((prev) => [
        ...prev,
        { id: docRef.id, ...productForm, imageUrl },
      ]);
    }

    setProductForm({ name: "", quantity: "", price: "", image: null });
    setEditingId(null);
    setShowModal(false);
  };

  const editProduct = (p) => {
    setProductForm({
      name: p.name,
      quantity: p.quantity,
      price: p.price,
      image: null,
    });
    setEditingId(p.id);
    setShowModal(true);
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

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
    if (active !== "My Products") {
      return <p className="text-gray-600">Coming Soon…</p>;
    }

    return (
      <>
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-semibold">My Products</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500">No products added yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow p-5"
              >
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    className="h-32 w-full object-cover rounded-xl mb-3"
                  />
                )}

                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm">Qty: {p.quantity}</p>
                <p className="text-sm">Price: {p.price}</p>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => editProduct(p)}
                    className="text-blue-600 flex items-center gap-1"
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="text-red-600 flex items-center gap-1"
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
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading Farmer Dashboard...
      </div>
    );
  }

  /* ================= FINAL UI ================= */
  return (
    <div className="min-h-screen flex bg-green-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-4 hidden md:block">
        <img src={logo} className="h-8 mb-6" />
        {menu.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setActive(name)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl mb-1 ${
              active === name
                ? "bg-green-100 text-green-700"
                : "text-gray-600"
            }`}
          >
            <Icon size={16} /> {name}
          </button>
        ))}
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6">{renderContent()}</main>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
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
              onChange={(e) =>
                setProductForm({
                  ...productForm,
                  image: e.target.files[0],
                })
              }
            />

            <button
              onClick={saveProduct}
              className="w-full bg-green-600 text-white py-2 rounded-xl mt-4"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
