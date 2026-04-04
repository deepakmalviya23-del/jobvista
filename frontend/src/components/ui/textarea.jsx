// src/components/ui/textarea.jsx
import * as React from "react";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`border p-2 rounded-md w-full ${className || ""}`}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };