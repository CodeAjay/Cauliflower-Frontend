import React from 'react';
import { useParams } from 'react-router-dom';
import diseases from './Diseases';

function DiseaseDetails() {
  const { id } = useParams();
  const disease = diseases[parseInt(id)];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img src={disease.image} alt={disease.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{disease.name}</h2>
          <p className="text-lg text-gray-600 mb-4">{disease.description}</p>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Symptoms:</h3>
          <p className="text-gray-600 mb-4">{disease.symptoms}</p>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Causes:</h3>
          <p className="text-gray-600 mb-4">{disease.causes}</p>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Organic Solutions:</h3>
          <p className="text-gray-600 mb-4">{disease.organicSolutions}</p>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Non-Organic Solutions:</h3>
          <p className="text-gray-600">{disease.nonOrganicSolutions}</p>
        </div>
      </div>
    </div>
  );
}

export default DiseaseDetails;
