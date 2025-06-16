
import React from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800/50 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AcademicCapIcon className="h-10 w-10 text-sky-400" />
          <h1 className="text-2xl font-bold text-sky-400 tracking-tight">
            Nursing Home LSC Educator
          </h1>
        </div>
        {/* Navigation links can be added here if needed */}
      </div>
    </header>
  );
};

export default Header;
