import React, { forwardRef } from 'react';

// Slot
const Slot = forwardRef(({ children, ...props }, ref) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      ref: ref ? (node) => [ref(node), children.ref && children.ref(node)].filter(Boolean) : children.ref,
    });
  }
  return null;
});
Slot.displayName = "Slot";

export { Slot };