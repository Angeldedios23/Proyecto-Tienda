import React, { useState } from 'react';
import RegisterForm from './RegisterForm'; // Importa el formulario de registro

function LoginForm({ setUser }) {
  const [isRegisterView, setIsRegisterView] = useState(false); // Estado para alternar entre Login y Registro
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setUser(result.user);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('An error occurred while logging in.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      {isRegisterView ? (
        // Vista del formulario de registro
        <div>
          <RegisterForm setUser={setUser} />
        </div>
      ) : (
        // Vista del formulario de login
        <div>
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="loginUsername" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                id="loginUsername"
                name="username"
                type="text"
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="loginPassword"
                name="password"
                type="password"
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          </form>
          {/* Botón para ir a la vista de registro */}
          <div>
            <button
              type="button"
              onClick={() => setIsRegisterView(true)} // Alterna a la vista de registro
              className="mt-4 w-full px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600"
            >
              Registrarse
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
