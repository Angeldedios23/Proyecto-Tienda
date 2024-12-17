import React, { useEffect, useState } from 'react';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/orders'); // Ajusta la URL según tu backend
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  return (
    <div className="container">
      <h1>Mis Órdenes</h1>
      {orders.length === 0 ? (
        <p>No hay órdenes disponibles.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order">
            <h2>Orden #{order.id}</h2>
            <p>Total: ${order.total}</p>
            <p>Dirección: {order.address}</p>
            <p>Fecha: {new Date(order.createdAt).toLocaleString()}</p>
            <h3>Items:</h3>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  Producto ID: {item.productId}, Cantidad: {item.quantity}, Precio: ${item.price}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderPage;
