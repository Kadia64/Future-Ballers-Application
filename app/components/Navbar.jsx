'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-black text-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/future-ballers-logo-2.png" 
              alt="FBA Logo" 
              width={60}
              height={30}
              className="object-contain"
              priority
            />
            <span className="text-white text-lg ml-2 hidden sm:inline hover:text-fba-gold transition-colors">Future Ballers Association</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`${isActive('/') ? 'text-fba-gold' : 'text-white'} hover:text-fba-gold transition-colors`}
            >
              Home
            </Link>
            <Link 
              href="/teams" 
              className={`${isActive('/teams') ? 'text-fba-gold' : 'text-white'} hover:text-fba-gold transition-colors`}
            >
              Teams
            </Link>
            <Link 
              href="/events" 
              className={`${isActive('/events') ? 'text-fba-gold' : 'text-white'} hover:text-fba-gold transition-colors`}
            >
              Events
            </Link>
            <Link 
              href="/rankings" 
              className={`${isActive('/rankings') ? 'text-fba-gold' : 'text-white'} hover:text-fba-gold transition-colors`}
            >
              Rankings
            </Link>
            <Link 
              href="/about" 
              className={`${isActive('/about') ? 'text-fba-gold' : 'text-white'} hover:text-fba-gold transition-colors`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className={`${isActive('/contact') ? 'text-fba-gold' : 'text-white'} hover:text-fba-gold transition-colors`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-6 h-6 text-white hover:text-fba-gold focus:outline-none"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="absolute inset-0 flex flex-col justify-center">
              <span
                className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? 'rotate-45' : '-translate-y-2'
                }`}
              />
              <span
                className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${
                  mobileMenuOpen ? '-rotate-45' : 'translate-y-2'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-black border-t border-gray-800 overflow-hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-96' : 'max-h-0'
      }`}>
        <nav className="px-4 py-2 space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2 ${isActive('/') ? 'text-fba-gold' : 'text-white'} hover:text-fba-gold`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/teams"
              className={`block px-3 py-2 ${isActive('/teams') ? 'text-fba-gold' : 'text-white'} hover:text-fba-gold`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Teams
            </Link>
            <Link
              href="/events"
              className={`block px-3 py-2 ${isActive('/events') ? 'text-fba-gold' : 'text-white'} hover:text-fba-gold`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/rankings"
              className={`block px-3 py-2 ${isActive('/rankings') ? 'text-fba-gold' : 'text-white'} hover:text-fba-gold`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Rankings
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 ${isActive('/about') ? 'text-fba-gold' : 'text-white'} hover:text-fba-gold`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2 ${isActive('/contact') ? 'text-fba-gold' : 'text-white'} hover:text-fba-gold`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
    </nav>
  );
};

export default Navbar;