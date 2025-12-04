import React from 'react';
export function Badge({ children, className = '', style = {}, variant = 'default', ...props }) {
  const variants = {
    default: 'bg-blue-600 text-white',
    secondary: 'bg-gray-300 text-gray-700',
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${variants[variant] || ''} ${className}`} style={style} {...props}>
      {children}
    </span>
  );
}
