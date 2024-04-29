// Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import diseases from './diseases';



function Home() {
  return (
    <>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to Cauliflower Disease Detection</h1>
        <p className="text-lg text-gray-600 mb-6">Select a disease below to view details:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diseases.map(disease => (
            <Link key={disease.id} to={`/disease/${disease.id}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <img src={disease.image} alt={disease.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{disease.name}</h3>
                <p className="text-gray-600">{disease.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
