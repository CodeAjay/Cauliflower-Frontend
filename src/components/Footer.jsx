import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 text-white text-center">
      <div className="container mx-auto">
        <p className="text-3xl">
          Made with <span className="text-red-500">&hearts;</span> by Ajay  
          <a
            href="https://github.com/codeajay"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-sm my-3 text-gray-400 hover:text-white flex items-center justify-center"
          >
            Follow me on: <GitHubIcon sx={{ mr: 1, ml:1 }} /> GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
