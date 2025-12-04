import React from 'react';
export function Card({ children, ...props }) {
  return <div className="bg-white rounded shadow p-4" {...props}>{children}</div>;
}
export function CardHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}
export function CardContent({ children }) {
  return <div>{children}</div>;
}
export function CardTitle({ children, className }) {
  return <h2 className={`font-bold text-lg ${className||''}`}>{children}</h2>;
}
export function CardDescription({ children }) {
  return <p className="text-gray-500 text-sm mb-2">{children}</p>;
}
