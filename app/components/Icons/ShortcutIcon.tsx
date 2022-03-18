import { FunctionComponent } from "react";

export const ShortcutIcon: FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <span className={`flex items-center justify-center rounded ${className}`}>
      {children}
    </span>
  );
};
