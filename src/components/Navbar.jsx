// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, handleLogout }) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="font-semibold text-gray-800">
              Cauliflower Disease Detection
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-800 hover:text-gray-600">Home</Link>
              <Link to="/technologies" className="text-gray-800 hover:text-gray-600">Technologies Used</Link>
              <Link to="/model-summary" className="text-gray-800 hover:text-gray-600">Model Summary</Link>

              {user ? (
                <>
                  <Link to="/upload" className="text-gray-800 hover:text-gray-600">Predict</Link>
                  <Link to="/profile" className="text-gray-800 hover:text-gray-600">Profile</Link>
                  <button onClick={handleLogout} className="text-gray-800 hover:text-gray-600">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-800 hover:text-gray-600">Login</Link>
                  <Link to="/register" className="text-gray-800 hover:text-gray-600">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
