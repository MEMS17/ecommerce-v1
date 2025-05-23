import React from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <span className="text-blue-600">🔒</span>
            <span>Password Reset</span>
          </div>
          <h2 className="text-lg font-medium mt-2 text-center">Enter your email to reset your password</h2>
        </div>

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-black py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Send reset link
          </button>

          <p className="text-sm text-center text-black-500 mt-4">
            Remembered your password?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Go back to login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
