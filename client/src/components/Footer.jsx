import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-orange-400 text-gray-300 py-4 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* About Section */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-semibold">Go Land</h2>
          <p className="text-sm">
            Your trusted real estate agency for buying, selling, and renting properties.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="/about" className="text-sm hover:text-white">About Us</a>
          <a href="/contact" className="text-sm hover:text-white">Contact Us</a>
          <a href="/home" className="text-sm hover:text-white">Listings</a>
          <a href="/faq" className="text-sm hover:text-white">FAQ</a>
        </div>

        {/* Social Media */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaFacebook size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaInstagram size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Go Land. All rights reserved.</p>
      </div>
    </footer>
  );
}
