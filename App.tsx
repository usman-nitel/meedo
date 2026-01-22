
import React, { useEffect, useState } from 'react';
import { AppProvider } from './AppContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { CartPage } from './pages/CartPage';
import { SellerDashboard } from './pages/Dashboard/SellerDashboard';
import { AuthPage } from './pages/AuthPage';

const Router: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderRoute = () => {
    if (route === '#/' || route === '') return <HomePage />;
    if (route === '#/cart') return <CartPage />;
    if (route === '#/seller') return <SellerDashboard />;
    if (route === '#/login' || route === '#/signup') return <AuthPage />;
    
    // Fallback
    return <HomePage />;
  };

  return <Layout>{renderRoute()}</Layout>;
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
};

export default App;
