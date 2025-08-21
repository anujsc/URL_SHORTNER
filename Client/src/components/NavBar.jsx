import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import img1 from "./../../public/url2.svg"

const Navbar = ({ isAuthenticated, userName, onLogout }) => {
  const [navOpen, setNavOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home', show: true },
    { to: '/dashboard', label: 'Dashboard', show: isAuthenticated },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-md shadow-xl border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <img src={img1} alt="Logo" className="h-9 w-9 drop-shadow" />
            <Link to="/" className="text-2xl font-extrabold text-blue-700 tracking-tight hover:text-blue-500 transition">
              Shortly
            </Link>
          </div>
          {/* Hamburger Icon */}
          <button
            className="sm:hidden flex items-center px-3 py-2 rounded text-blue-700 hover:bg-blue-100 focus:outline-none"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={navOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"}
              />
            </svg>
          </button>
          {/* Navigation Links */}
          <div className="hidden sm:flex items-center space-x-4">
            {navLinks.map(
              (link) =>
                link.show && (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-4 py-2 rounded-full font-medium text-blue-700 hover:bg-blue-100 transition border border-blue-100"
                  >
                    {link.label}
                  </Link>
                )
            )}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-blue-700 font-semibold hidden sm:inline">
                  Hi, {userName || 'User'}
                </span>
                <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 text-white font-bold shadow">
                  {userName ? userName[0].toUpperCase() : 'U'}
                </span>
                <button
                  onClick={onLogout}
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition"
                >
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                    </svg>
                    Sign Out
                  </span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition"
              >
                <span className="inline-flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  Sign In
                </span>
              </Link>
            )}
          </div>
        </div>
        {/* Mobile Dropdown */}
        <div
          className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            navOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } bg-white/90 backdrop-blur-md rounded-b-lg border-t border-blue-100`}
        >
          <div className="flex flex-col items-center py-2 space-y-2">
            {navLinks.map(
              (link) =>
                link.show && (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="w-full text-center px-4 py-2 rounded-full font-medium text-blue-700 hover:bg-blue-100 transition border border-blue-100"
                    onClick={() => setNavOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
            )}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setNavOpen(false);
                  onLogout();
                }}
                className="w-full px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition"
              >
                <span className="inline-flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                  </svg>
                  Sign Out
                </span>
              </button>
            ) : (
              <Link
                to="/auth"
                className="w-full text-center px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-indigo-700 transition"
                onClick={() => setNavOpen(false)}
              >
                <span className="inline-flex items-center gap-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  Sign In
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;