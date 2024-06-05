// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import DiseaseDetails from './components/DiseaseDetails';
import Upload from './Upload';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { auth } from './firebase';
import Footer from './components/Footer';
import TechnologiesPage from './components/TechnologiesPage';
import ModelSummary from './components/ModelSummary';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return storedUser || null;
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    });
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    auth.signOut();
    localStorage.removeItem('user');
    setUser(null); // Clear user state
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/disease/:id" element={<DiseaseDetails />} />
          <Route path="/technologies" element={<TechnologiesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<ProtectedRoute element={Upload} />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
          <Route path="/model-summary" element={<ModelSummary />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
