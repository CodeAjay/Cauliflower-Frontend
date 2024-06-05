import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModelSummary = () => {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    // Fetch the model summary when the component mounts
    axios.get('http://localhost:5000/model_summary')
      .then(response => {
        setSummary(response.data.summary);
      })
      .catch(error => {
        console.error('Error fetching model summary:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Model Summary</h2>
      <p className="mb-4">The model summary provides an overview of the layers in the neural network model, including their types, output shapes, and number of parameters. This information can help understand how data flows through the model and how it is transformed at each layer.</p>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Layer (type)</th>
              <th className="px-4 py-2">Output Shape</th>
              <th className="px-4 py-2">Param #</th>
            </tr>
          </thead>
          <tbody>
            {summary.map((layer, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="border px-4 py-2">{layer}</td>
                {/* Add more columns as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModelSummary;
