import React from 'react';
export function Button({ children, variant = 'default', size = 'md', ...props }) {
  const base = 'px-4 py-2 rounded font-medium transition';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 bg-white hover:bg-blue-50',
    ghost: 'bg-transparent text-blue-600 hover:bg-blue-50',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    secondary: 'bg-gray-200 text-gray-700',
  };
  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: '',
    lg: 'text-lg px-6 py-3',
  };
  return (
    <button className={`${base} ${variants[variant] || ''} ${sizes[size] || ''}`} {...props}>
      {children}
    </button>
  );
}
