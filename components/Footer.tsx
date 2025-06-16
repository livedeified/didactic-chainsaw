
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800/30 text-center py-6 mt-auto">
      <div className="container mx-auto px-4">
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Nursing Home LSC Educator. For educational purposes only.
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Always consult official NFPA codes and local authorities for compliance. AI-generated content may require verification.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
