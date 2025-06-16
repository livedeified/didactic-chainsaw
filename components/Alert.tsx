
import React from 'react';
import { InformationCircleIcon, ExclamationTriangleIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

interface AlertProps {
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const baseClasses = "p-4 mb-4 border-l-4 rounded-md shadow-md flex items-start";
  let specificClasses = "";
  let IconComponent: React.ElementType | null = null;

  switch (type) {
    case 'info':
      specificClasses = "bg-sky-900/50 border-sky-500 text-sky-200";
      IconComponent = InformationCircleIcon;
      break;
    case 'success':
      specificClasses = "bg-green-900/50 border-green-500 text-green-200";
      IconComponent = CheckCircleIcon;
      break;
    case 'warning':
      specificClasses = "bg-yellow-900/50 border-yellow-500 text-yellow-200";
      IconComponent = ExclamationTriangleIcon;
      break;
    case 'error':
      specificClasses = "bg-red-900/50 border-red-500 text-red-200";
      IconComponent = XCircleIcon;
      break;
  }

  return (
    <div className={`${baseClasses} ${specificClasses}`} role="alert">
      {IconComponent && <IconComponent className="h-6 w-6 mr-3 flex-shrink-0" />}
      <div className="flex-grow">
        <p className="font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="-my-1.5 -mr-1.5 ml-3 p-1.5 rounded-md hover:bg-opacity-20 hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-current"
          aria-label="Dismiss"
        >
          <XCircleIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Alert;
