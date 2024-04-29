import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import DiseaseDetails from './DiseaseDetails';
import Upload from './Upload';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="font-semibold text-gray-800">Cauliflower Disease Detection</Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/" className="text-gray-800 hover:text-gray-600">Home</Link>
                  <Link to="/upload" className="text-gray-800 hover:text-gray-600">Predict</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/upload" element={<Upload/>} />
          <Route path="/disease/:id" element={<DiseaseDetails/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
