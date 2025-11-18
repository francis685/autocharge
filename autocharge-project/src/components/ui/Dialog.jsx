import React, { forwardRef, createContext, useContext } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dialog (Modal)
const DialogContext = createContext(null);
const Dialog = ({ open, onOpenChange, ...props }) => (
  <DialogContext.Provider value={{ open, onOpenChange }}>
    <div {...props} />
  </DialogContext.Provider>
);

const DialogTrigger = ({ children }) => {
  const { onOpenChange } = useContext(DialogContext);
  return React.cloneElement(children, {
    onClick: () => onOpenChange(true),
  });
};

const DialogContent = forwardRef(({ className, children, ...props }, ref) => {
  const { open, onOpenChange } = useContext(DialogContext);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0">
      <div 
        ref={ref}
        className={cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          className
        )}
        data-state={open ? 'open' : 'closed'}
        {...props}
      >
        {children}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
});
DialogContent.displayName = "DialogContent";

const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogTitle = forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle };