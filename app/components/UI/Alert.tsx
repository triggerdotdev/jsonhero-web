import { XIcon as CloseIcon } from '@heroicons/react/outline';
import React from "react";

export type AlertProps = {
  children: React.ReactNode;
  onDismiss?: () => void;
}

export function Alert({children, onDismiss}: AlertProps) {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded relative" role="alert">
      {children}
      <span className="absolute top-0 bottom-0 right-0 px-3 flex items-center">
        <CloseIcon className="fill-current h-4 w-4 text-red-500" role="button" onClick={onDismiss}/>
      </span>
    </div>
  );
}