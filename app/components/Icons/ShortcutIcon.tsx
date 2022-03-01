import { FunctionComponent } from "react";

export const ShortcutIcon: FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <span
      className={`flex items-center justify-center h-[26px] w-[26px] ml-1 text-slate-700 bg-slate-200 dark:text-slate-300 dark:bg-slate-800 rounded ${className}`}
    >
      {children}
    </span>
  );
};
