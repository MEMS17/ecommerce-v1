import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminRegister from "./pages/admin/Register";
import Signup from './pages/admin/Signup';
import ForgotPassword from './pages/admin/ForgotPassword';
import "./App.css";
import Dashboard from "./pages/admin/Dashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/signup" element={<Signup />} />
        <Route path="/admin/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/admin/Dashboard" element={<Dashboard/>} />

      </Routes>
    </Router>
  );
}

export default App;
