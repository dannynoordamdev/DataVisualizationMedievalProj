import React, { useEffect, useState } from "react";
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Visualizatie_pagina from "./Pages/Visualizatie_pagina.jsx";
import Home from "./Pages/Home_Pagina.jsx";

// Authenticatie check backend
const checkAuthentication = async () => {
  try {
    const response = await fetch('/api/auth/me', {
      credentials: 'include',
    });
    if (response.ok) {
      const data = await response.json();
      return data.isAuthenticated;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

// protected route that uses above checkAuth function
const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const result = await checkAuthentication();
      setIsAuthenticated(result);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
              path="/visualizatie"
              element={
                <PrivateRoute>
                  <Visualizatie_pagina />
                </PrivateRoute>
              }
          />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;
