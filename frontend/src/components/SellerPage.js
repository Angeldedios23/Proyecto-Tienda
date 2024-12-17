import React from 'react';
import { useNavigate } from 'react-router-dom';

const SellerPage = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleBack = () => {
    navigate('/'); // Navegar a la página de inicio de sesión
  };

  return (
    <div>
      <h1>Welcome Seller</h1>
      {/* Aquí puedes agregar la lógica específica para la página del vendedor */}
      <button onClick={handleBack} className="mt-4 px-4 py-2 bg-gray-600 text-white">
        Volver
      </button>
    </div>
  );
};

export default SellerPage;
