import React from 'react';
import react from "../assets/react.png"
import tensorflow from "../assets/tensorflow.png"
import firebase from "../assets/firebase.png"


const technologies = [
  {
    name: 'React',
    image: react,
    purpose: 'A JavaScript library for building user interfaces',
    link: 'https://react.dev/'
  },
  {
    name: 'TensorFlow',
    image: tensorflow,
    purpose: 'An open-source machine learning framework',
    link: 'https://www.tensorflow.org/'
  },
  {
    name: 'Firebase',
    image: firebase,
    purpose: 'A platform developed by Google for creating mobile and web applications',
    link: 'https://firebase.google.com/'
  }
  // Add more technologies as needed
];

function TechnologiesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Technologies Used</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {technologies.map((tech, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={tech.image} alt={tech.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{tech.name}</h2>
              <p className="text-gray-600">{tech.purpose}</p>
              <a href={tech.link} target='_blank'>Learn More</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TechnologiesPage;
