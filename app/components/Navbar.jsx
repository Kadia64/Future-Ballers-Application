'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Main Navigation */}
      <div className="w-full bg-black">
        <div className="w-full bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <div className="relative w-20 h-10">
                  <Image 
                    src="/future-ballers-logo-2.png" 
                    alt="FBA Logo" 
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-white text-lg ml-2 hidden sm:inline">Future Ballers Association</span>
              </Link>

              {/* Desktop Menu */}
              <nav className="hidden md:flex space-x-8">
                <Link 
                  href="/" 
                  className={`transition-colors ${
                    isActive('/') ? 'text-fba-gold' : 'text-white hover:text-fba-gold'
                  }`}
                >
                  Home
                </Link>
                <Link 
                  href="/teams" 
                  className={`transition-colors ${
                    isActive('/teams') ? 'text-fba-gold' : 'text-white hover:text-fba-gold'
                  }`}
                >
                  Teams
                </Link>
                <Link 
                  href="/events" 
                  className={`transition-colors ${
                    isActive('/events') ? 'text-fba-gold' : 'text-white hover:text-fba-gold'
                  }`}
                >
                  Events
                </Link>
                <Link 
                  href="/rankings" 
                  className={`transition-colors ${
                    isActive('/rankings') ? 'text-fba-gold' : 'text-white hover:text-fba-gold'
                  }`}
                >
                  Rankings
                </Link>
                <Link 
                  href="/about" 
                  className={`transition-colors ${
                    isActive('/about') ? 'text-fba-gold' : 'text-white hover:text-fba-gold'
                  }`}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className={`transition-colors ${
                    isActive('/contact') ? 'text-fba-gold' : 'text-white hover:text-fba-gold'
                  }`}
                >
                  Contact
                </Link>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white hover:text-fba-gold"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full bg-black">
          <div className="px-4 py-2 space-y-1">
            <Link
              href="/"
              className={`block px-3 py-2 transition-colors ${
                isActive('/') ? 'text-fba-gold' : 'text-white hover:text-fba-gold'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/teams"
              className={`block px-3 py-2 transition-colors ${
                isActive('/teams') ? 'text-fba-gold' : 'text-white hover:text-fba-gold'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Teams
            </Link>
            <Link
              href="/events"
              className={`block px-3 py-2 transition-colors ${
                isActive('/events') ? 'text-fba-gold' : 'text-white hover:text-fba-gold'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link
              href="/rankings"
              className={`block px-3 py-2 transition-colors ${
                isActive('/rankings') ? 'text-fba-gold' : 'text-white hover:text-fba-gold'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Rankings
            </Link>
            <Link
              href="/about"
              className={`block px-3 py-2 transition-colors ${
                isActive('/about') ? 'text-fba-gold' : 'text-white hover:text-fba-gold'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`block px-3 py-2 transition-colors ${
                isActive('/contact') ? 'text-fba-gold' : 'text-white hover:text-fba-gold'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;