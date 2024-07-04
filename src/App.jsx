import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/login/AuthContext';
import Home from './components/pages/Home';
import Login from './components/login/Login';


function AppContent() { 
  const { user, isLoading } = useAuth();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (user && !isLoading) {
      navigate('/home');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} /> {/* Redirección desde la raíz */}
      <Route path="/login" element={<Login />} /> 
      <Route
        path="/home"
        element={
          user ? ( 
            <Home />
          ) : (
            <Navigate to="/login" replace /> 
          )
        }
      />
    </Routes>
  );
}

function App() { 
  return (
    <AuthProvider>
      <Router>
        <AppContent /> 
      </Router>
    </AuthProvider>
  );
};

export default App;
