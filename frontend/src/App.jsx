import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/admin/Login';
import ForgotPassword from './pages/admin/ForgotPassword';
import "./App.css";
import Dashboard from "./pages/admin/Dashboard";
import ResetPassword from "./pages/admin/ResetPassword";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/Login" element={<Login />} />
        <Route path="/admin/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/admin/Dashboard" element={<Dashboard/>} />
        <Route path="/admin/ResetPassword" element={<ResetPassword/>} />

      </Routes>
    </Router>
  );
}

export default App;