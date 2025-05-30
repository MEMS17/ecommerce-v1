import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminRegister from "./pages/admin/Register";
import Signup from './pages/admin/Signup';
import ForgotPassword from './pages/admin/ForgotPassword';
import "./App.css";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Profil from "./pages/Profil";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/admin/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/admin/Dashboard" element={<Dashboard/>} />
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Products />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
