import React, { useState } from 'react';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'buyer'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const result = await response.json();
    alert(`Registered: ${JSON.stringify(result)}`);
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="registerUsername" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="registerUsername"
            name="username"
            type="text"
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="registerPassword"
            name="password"
            type="password"
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="registerRole" className="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="registerRole"
            name="role"
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Register
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => window.location.href = "/login"} // Redirige a la página de login
            className="w-full px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Volver al Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
