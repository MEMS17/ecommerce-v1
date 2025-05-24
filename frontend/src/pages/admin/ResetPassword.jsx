import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Pas d'API, juste un message et redirection
    alert('Password successfully changed!');
    navigate('/admin/Login');
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-800">New Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              placeholder="New Password"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-800">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
              placeholder="Confirm Password"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 text-black bg-white rounded-md hover:bg-gray-800 transition duration-200"
          >
            Change my password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
