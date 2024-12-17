import React, { useEffect, useState } from 'react';

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const response = await fetch('http://localhost:3001/addresses');
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error('Error loading addresses:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleCreateAddress = async () => {
    try {
      const response = await fetch('http://localhost:3001/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAddress)
      });
      if (response.ok) {
        loadAddresses();
        setNewAddress({
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: ''
        });
      }
    } catch (error) {
      console.error('Error creating address:', error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await fetch(`http://localhost:3001/addresses/${id}`, {
        method: 'DELETE'
      });
      loadAddresses();
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Gestión de Direcciones</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {addresses.map((address) => (
          <div key={address.id} className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
            <p><strong>Calle:</strong> {address.street}</p>
            <p><strong>Ciudad:</strong> {address.city}</p>
            <p><strong>Estado:</strong> {address.state}</p>
            <p><strong>Código Postal:</strong> {address.postalCode}</p>
            <p><strong>País:</strong> {address.country}</p>
            <button 
              onClick={() => handleDeleteAddress(address.id)}
              className="mt-4 w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Agregar Nueva Dirección</h2>
        <form className="bg-white shadow-lg rounded-lg p-4">
          <div className="mb-4">
            <label className="block text-gray-700">Calle</label>
            <input 
              type="text" 
              name="street" 
              value={newAddress.street} 
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Ciudad</label>
            <input 
              type="text" 
              name="city" 
              value={newAddress.city} 
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Estado</label>
            <input 
              type="text" 
              name="state" 
              value={newAddress.state} 
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Código Postal</label>
            <input 
              type="text" 
              name="postalCode" 
              value={newAddress.postalCode} 
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">País</label>
            <input 
              type="text" 
              name="country" 
              value={newAddress.country} 
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button 
            type="button" 
            onClick={handleCreateAddress}
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow-md hover:bg-blue-700"
          >
            Agregar Dirección
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressPage;
