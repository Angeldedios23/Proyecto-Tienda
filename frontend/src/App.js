import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import BuyerPage from './components/BuyerPage';
import ProductCategoryManagement from './components/ProductCategoryManagement';
import TicketSummary from './components/TicketSummary';
import OrderPage from './components/OrderPage'; // Importar OrderPage

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === 'seller') {
        navigate('/seller');
      } else if (user.role === 'buyer') {
        navigate('/buyer');
      }
    }
  }, [user, navigate]);

  return (
    <div className="App">
      {user ? (
        <Routes>
          <Route path="/seller" element={<ProductCategoryManagement />} />
          <Route path="/buyer" element={<BuyerPage />} />
          <Route path="/ticket-summary" element={<TicketSummary />} />
          <Route path="/orders" element={<OrderPage />} /> {/* Nueva ruta para OrderPage */}
          <Route path="*" element={<Navigate to={user.role === 'seller' ? "/seller" : "/buyer"} />} />
        </Routes>
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};
export default AppWrapper;
