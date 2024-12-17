import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PurchaseSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, totalAmount, totalItems } = location.state || { cart: [], totalAmount: 0, totalItems: 0 };

  const handleConfirmPurchase = async () => {
    const order = {
      total: totalAmount,
      address: 'Dirección del usuario', // Puedes obtener la dirección del usuario desde su perfil
      items: cart.map(item => ({
        productId: item.id,
        quantity: 1, // Puedes ajustar esta cantidad según sea necesario
        price: item.price
      }))
    };

    try {
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        alert('Compra confirmada');
        navigate('/orders'); // Redirigir a la página de órdenes después de confirmar la compra
      } else {
        alert('Error al confirmar la compra');
      }
    } catch (error) {
      console.error('Error confirming purchase:', error);
      alert('Error al confirmar la compra');
    }
  };

  return (
    <div className="container">
      <h1>Resumen de la Compra</h1>
      <div className="summary">
        <h2>Productos en el Carrito</h2>
        {cart.map((item, index) => (
          <div key={index} className="summary-item">
            <h4>{item.name}</h4>
            <p>Precio: ${item.price}</p>
          </div>
        ))}
        <div className="summary-total">
          <h3>Total de Artículos: {totalItems}</h3>
          <h3>Total a Pagar: ${totalAmount}</h3>
        </div>
        <button onClick={handleConfirmPurchase} className="confirm-purchase">
          Confirmar Compra
        </button>
      </div>
    </div>
  );
};

export default PurchaseSummary;
