'use client'; // LoginForm needs to be a client component for state and event handling

import { login } from '@/lib/actions/dashboard.actions';
import React, { useState } from 'react';

// --- Login Form Component ---
// This is a client component to handle form state and user interaction.

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Basic validation
    if (!email || !password) {
      setMessage('Please enter both email and password.');
      return;
    }
    const { data, message } = await login(email, password)
    console.log(data)
    if (!data) {
      return setMessage(message);
    }

    setMessage(`Login success.`);
    setEmail('');
    setPassword('');
    return
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
      <p className="text-center text-gray-500 mb-8">Please sign in to continue.</p>

      {message && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
          <span className="block sm:inline">{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="••••••••"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105 duration-300"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};



export default LoginForm