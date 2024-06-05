import React from 'react';
import image2 from "../assets/cauliflower.webp"
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="bg-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center">
          <div className="max-w-lg">
            <h1 className="text-4xl font-bold text-green-900 mb-4">Unveiling the Future of Cauliflower Farming</h1>
            <h2 className="text-2xl text-green-800 mb-4">Empowering Farmers with Precision Technology</h2>
            <p className="text-lg text-green-700 mb-8">
              Welcome to CauliCare, where innovation meets agriculture to revolutionize cauliflower farming.
              At CauliCare, we are committed to empowering farmers with cutting-edge disease detection technology,
              ensuring healthier crops and higher yields. Say goodbye to uncertainties and hello to a new era of sustainable cauliflower cultivation.
            </p>
            <Link to="/upload" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Get Started
            </Link>
          </div>
          <div className="flex-shrink-0 w-2/5">
            <img src={image2} alt="Cauliflower" className="w-full transform -rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
