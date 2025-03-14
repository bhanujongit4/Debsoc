'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Open_Sans } from 'next/font/google';

// Initialize Open Sans font
const openSans = Open_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-open-sans',
});

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '/blogs', label: 'B L O G S' },
  ];

  return (
    <header className={`bg-white shadow-md ${openSans.variable}`}>
      <div className="container mx-auto px-4 py-1">
        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Left - Home */}
          <div className="flex items-center space-x-8" >
            <Link href="/home" className="flex items-center">
              <img
                src="images/debsoc logo 2.png"
                alt="Home"
                className="w-16 h-auto mr-4"
              />
              <span className="text-gray-800 hover:text-blue-500">
                
              </span>
            </Link>
           
          </div>

          {/* Right - Navigation Links */}
          <nav className="flex items-center space-x-10">
            <Link href="/nsmpd" className="text-gray-800 hover:text-blue-500">
              N S M P D 
            </Link>
            <Link href="/nsutmun" className="text-gray-800 hover:text-blue-500">
              N S U T M U N
            </Link>
            <Link href="/pd" className="text-gray-800 hover:text-blue-500">
              P  D 
            </Link>
            <Link href="/mun" className="text-gray-800 hover:text-blue-500">
              M U N
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-800 hover:text-blue-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex justify-between items-center">
            <Link href="/home" className="flex items-center">
              <img
                src="images/debsoc logo 2.png"
                alt="Home"
                className="w-12 h-auto mr-2"
              />
              <span className="text-gray-800">Home</span>
            </Link>
            <button
              className="text-gray-800"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Menu - Updated to match desktop */}
          {isMenuOpen && (
            <nav className="mt-4 space-y-4">
              <Link 
                href="/nsmpd" 
                className="block py-2 px-4 text-gray-800 hover:text-blue-500 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                N S M P D
              </Link>
              <Link 
                href="/nsutmun" 
                className="block py-2 px-4 text-gray-800 hover:text-blue-500 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                N S U T M U N
              </Link>
              <Link 
                href="/pd" 
                className="block py-2 px-4 text-gray-800 hover:text-blue-500 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                P  D
              </Link>
              <Link 
                href="/mun" 
                className="block py-2 px-4 text-gray-800 hover:text-blue-500 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                M U N
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 px-4 text-gray-800 hover:text-blue-500 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
