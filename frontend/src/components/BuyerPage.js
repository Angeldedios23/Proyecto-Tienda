import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';

const BuyerPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddressFormVisible, setIsAddressFormVisible] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    loadProducts();
    loadAddresses();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadAddresses = async () => {
    try {
      const response = await fetch('http://localhost:3001/addresses');
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error('Error loading addresses:', error);
    }
  };

  const addAddress = async () => {
    try {
      const response = await fetch('http://localhost:3001/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAddress),
      });
      const data = await response.json();
      setAddresses([...addresses, data]);
      setNewAddress({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      });
      setSelectedAddress(data);
      handleAddressConfirmation(data); // Pasar la dirección directamente
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  const handleFinalizePurchase = () => {
    setIsAddressFormVisible(true);
    setIsCartOpen(false);
  };

  const handleAddressConfirmation = (address = selectedAddress) => {
    if (!address) {
      alert('Por favor, selecciona o agrega una dirección antes de finalizar la compra.');
      return;
    }

    // Aquí puedes agregar la lógica para procesar la orden con la dirección seleccionada
    console.log('Procesando orden con dirección:', address);

    setIsAddressFormVisible(false);
    setIsOrderPlaced(true);
    setCart([]);

    setTimeout(() => {
      setIsOrderPlaced(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 relative">
      {/* Botón Cerrar Sesión */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }}
          className="px-4 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* Ícono de carrito */}
      <div
        className="fixed top-4 right-4 z-40 cursor-pointer hover:scale-110 transition-transform"
        onClick={() => setIsCartOpen(!isCartOpen)}
      >
        <div className="relative">
          <ShoppingCart size={36} className="text-blue-600" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cart.length}
            </span>
          )}
        </div>
      </div>

      {/* Carrito desplegable */}
      {isCartOpen && (
        <div className="fixed top-20 right-4 w-80 bg-white shadow-lg rounded-lg p-4 z-50 border">
          <h2 className="text-xl font-semibold mb-4">Carrito de Compras</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">Tu carrito está vacío</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b py-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                  <button
                    onClick={() => {
                      setCart(cart.filter((_, idx) => idx !== index));
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
              <div className="mt-4">
                <p className="font-semibold text-right">
                  Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                </p>
                <button
                  className="w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  onClick={handleFinalizePurchase}
                >
                  Finalizar Compra
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Formulario de dirección */}
      {isAddressFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Selecciona o agrega una dirección</h2>
            
            {/* Selección de dirección existente */}
            {addresses.length > 0 && (
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Direcciones guardadas</label>
                <select
                  className="w-full p-2 border rounded mb-2"
                  value={selectedAddress ? selectedAddress.id : ''}
                  onChange={(e) => {
                    const selected = addresses.find(addr => addr.id.toString() === e.target.value);
                    setSelectedAddress(selected);
                  }}
                >
                  <option value="">Selecciona una dirección</option>
                  {addresses.map((address) => (
                    <option key={address.id} value={address.id.toString()}>
                      {address.street}, {address.city}, {address.state}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleAddressConfirmation()}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  disabled={!selectedAddress}
                >
                  Usar esta dirección
                </button>
              </div>
            )}

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-4">Agregar nueva dirección</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addAddress();
                }}
              >
                <input
                  type="text"
                  placeholder="Calle"
                  value={newAddress.street}
                  onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                  className="w-full p-2 mb-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Ciudad"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  className="w-full p-2 mb-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Estado"
                  value={newAddress.state}
                  onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  className="w-full p-2 mb-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Código Postal"
                  value={newAddress.postalCode}
                  onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                  className="w-full p-2 mb-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="País"
                  value={newAddress.country}
                  onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                  className="w-full p-2 mb-2 border rounded"
                  required
                />
                <button
                  type="submit"
                  className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Agregar y usar esta dirección
                </button>
              </form>
            </div>

            <button
              onClick={() => setIsAddressFormVisible(false)}
              className="w-full mt-4 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Mensaje de confirmación */}
      {isOrderPlaced && (
        <div className="fixed bottom-4 right-4 w-72 p-4 bg-green-600 text-white rounded-lg shadow-lg z-50">
          ¡Tu pedido está en camino!
        </div>
      )}

      {/* Lista de productos */}
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Productos Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mt-2">{product.description}</p>
              <p className="text-xl font-bold text-blue-600 mt-4">${product.price}</p>
              <button
                onClick={() => setCart([...cart, product])}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Agregar al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerPage;