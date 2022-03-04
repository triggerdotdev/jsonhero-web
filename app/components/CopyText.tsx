import React, { useCallback } from "react";

export type CopyTextProps = {
  children?: React.ReactNode;
  value: string;
  className?: string;
};

export function CopyText({ children, value, className }: CopyTextProps) {
  const onClick = useCallback(() => {
    navigator.clipboard.writeText(value);
  }, [value]);

  return (
    <div onClick={onClick} className={`${className} relative`}>
      {children}
    </div>
  );
}
