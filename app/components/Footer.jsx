import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-fba-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-white text-sm">
            © 2025 Future Ballers Association. All rights reserved.
          </p>
          <div className="mt-4 space-x-6">
            <a href="#" className="text-gray-400 hover:text-fba-gold text-sm transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-400">•</span>
            <a href="#" className="text-gray-400 hover:text-fba-gold text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;