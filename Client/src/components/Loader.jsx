import React from 'react';
import { SpinnerInfinity } from 'spinners-react';

const Loader = ({ text = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center min-h-[120px]">
    <SpinnerInfinity size={48} thickness={140} speed={120} color="#2563eb" secondaryColor="#e0e7ff" />
    <div className="mt-3 text-base text-blue-600 font-semibold tracking-wide animate-pulse">{text}</div>
  </div>
);

export default Loader;
