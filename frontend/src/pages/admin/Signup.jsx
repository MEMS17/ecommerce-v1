import React from 'react';
import { Link } from 'react-router-dom';
const Signup = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <span className="text-blue-600">🛍</span>
            <span>E-commerce</span>
          </div>
          <h2 className="text-lg font-medium mt-2">Sign up to get started</h2>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              placeholder="••••••••"
            />
          </div>

          {/* Remember me & Forgot password on same line */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <Link to="/admin/ForgotPassword">Forgot password?</Link>


          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-black rounded-md cursor-not-allowed bg-gray-200"
            disabled
          >
            Log in
          </button>
          <p className="text-sm text-center text-gray-500 mt-2">
  Don't have an account?{' '}
  <a href="/admin/register" className="text-blue-600 font-medium hover:underline">
  Sign up
  </a>
</p> </form>
      </div>
    </div>
  );
};

export default Signup;
