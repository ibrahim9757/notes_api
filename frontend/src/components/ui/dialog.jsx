import React, { useState } from 'react';
export function Dialog({ open, onOpenChange, children }) {
  const [isOpen, setIsOpen] = useState(open || false);
  React.useEffect(() => { setIsOpen(open); }, [open]);
  const handleClose = () => { setIsOpen(false); onOpenChange && onOpenChange(false); };
  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded shadow-lg p-6 min-w-[300px] relative">
        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-400">×</button>
        {children}
      </div>
    </div>
  ) : null;
}
export function DialogTrigger({ asChild, children, ...props }) {
  return React.cloneElement(children, {
    onClick: (e) => {
      if (children.props.onClick) children.props.onClick(e);
      if (props.onClick) props.onClick(e);
      if (props.onOpenChange) props.onOpenChange(true);
    },
  });
}
export function DialogContent({ children }) {
  return <div>{children}</div>;
}
export function DialogHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}
export function DialogTitle({ children }) {
  return <h3 className="font-bold text-lg mb-2">{children}</h3>;
}
export function DialogFooter({ children }) {
  return <div className="mt-4 flex justify-end gap-2">{children}</div>;
}
