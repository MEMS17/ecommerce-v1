import React from 'react';

const Register = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <span className="text-blue-600">🛍</span>
            <span>E-commerce</span>
          </div>
          <h2 className="text-lg font-medium mt-2">Create your account</h2>
        </div>
        <form className="">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              placeholder="John Doe"
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <select className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black">
              <option>Canada</option>
              <option>France</option>
              <option>USA</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="emails"
              className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
            />
            <label htmlFor="emails" className="ml-2 block text-sm text-gray-600">
              Get emails about product updates and news.
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-black rounded-md cursor-not-allowed"
            disabled
          >
            Create account
          </button>
          <div>
</div>

          <p className="text-sm text-center text-gray-500 mt-2">
            Already have an account?{' '}
            <a href="/admin/Signup" className="text-blue-600 font-medium hover:underline">
 Login
</a>

          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
