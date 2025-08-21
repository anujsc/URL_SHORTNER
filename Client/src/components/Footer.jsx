import React from "react";

const Footer = () => (
  <footer className="fixed bottom-0 left-0 w-full z-50">
    <div className="mx-auto max-w-7xl px-4">
      <div className="flex items-center justify-center py-3">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-blue-100 rounded-full px-6 py-2 shadow-lg">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-sm font-semibold text-blue-700 tracking-wide">
            Created by Anuj
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;