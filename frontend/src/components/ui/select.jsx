import React from 'react';
export function Select({ value, onValueChange, children }) {
  return <select value={value} onChange={e => onValueChange(e.target.value)} className="border rounded px-3 py-2">{children}</select>;
}
export function SelectTrigger({ children, ...props }) {
  return <div {...props}>{children}</div>;
}
export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}
export function SelectContent({ children }) {
  return <>{children}</>;
}
export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
