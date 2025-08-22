'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  onWaitlistClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onWaitlistClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect for handling scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect for disabling body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const navLinks = ["Home", "Projects", "Groups", "How it Works", "Privacy Policy"];

  // Dynamic header classes for a modern, responsive feel
  const headerClasses = `
    w-full fixed top-0 left-0 z-50 transition-all duration-300
    bg-white shadow-md
    lg:bg-transparent lg:shadow-none
    ${isScrolled ? 'lg:bg-white/80 lg:backdrop-blur-xl lg:shadow-md' : ''}
  `;

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" aria-label="SoulDeeds Home">
          <Image 
            src="/images/logo.svg" // User must place their logo here
            alt="SoulDeeds Logo"
            width={140}
            height={40}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-gray-700 hover:text-[#87127C] transition-colors duration-300 font-medium"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button 
          onClick={onWaitlistClick}
          className="hidden lg:block bg-[#87127C] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-[#6c0e63] transition-all duration-300"
        >
          Get Started
        </button>

        {/* Mobile Menu Button (Hamburger) */}
        <button
          className="lg:hidden text-gray-800"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-[9999] transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
                 <Image 
                    src="/images/logo.svg" 
                    alt="SoulDeeds Logo"
                    width={140}
                    height={40}
                  />
            </Link>
            {/* Close button */}
            <button
              className="text-gray-700"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
        </div>

        <div className="flex flex-col h-full px-6 pt-16 pb-8">
          {/* Mobile Nav Links */}
          <nav className="flex flex-col items-center space-y-8 text-center">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-2xl text-gray-800 hover:text-[#87127C] transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="mt-16 flex justify-center">
            <button
              className="bg-[#87127C] text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-[#6c0e63] transition-all duration-300 w-full max-w-xs text-lg"
              onClick={() => {
                setIsMenuOpen(false);
                onWaitlistClick();
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;