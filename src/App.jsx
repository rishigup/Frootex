import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import FarmerDashboard from "./pages/FarmerDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
