import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    navigate('/admin/Dashboard'); // Redirige vers le Dashboard
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <span className="text-blue-600">🛍</span>
            <span>E-commerce</span>
          </div>
          <h2 className="text-lg font-medium mt-2">Login to get started</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
  <div>
    <label className="block mb-1 text-sm font-semibold text-gray-800">Email</label>
    <input
      type="email"
      className="mt-1 block w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
      placeholder="you@example.com"
      required
    />
  </div>
  <div>
    <label className="block mb-1 text-sm font-semibold text-gray-800">Password</label>
    <input
      type="password"
      className="mt-1 block w-full px-4 py-2 bg-black text-white border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
      placeholder="••••••••"
      required
    />
  </div>

  <div className="flex justify-between items-center text-sm">
    <label className="flex items-center text-gray-700">
      <input
        type="checkbox"
        className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
      />
      <span className="ml-2">Remember me</span>
    </label>
    <Link to="/admin/ForgotPassword" className="text-blue-600 hover:underline">
      Forgot password?
    </Link>
  </div>

  <button
    type="submit"
    className="w-full py-2 px-4 text-black bg-black rounded-md  "
  >
    Log in
  </button>
</form>

      </div>
    </div>
  );
};

export default Login;
