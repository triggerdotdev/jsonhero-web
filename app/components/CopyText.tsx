import React, { useCallback, useEffect, useState } from "react";

export type CopyTextProps = {
  children: React.ReactNode;
  value: string;
  className?: string;
};

export function CopyText({ children, value, className }: CopyTextProps) {
  const onClick = useCallback(() => {
    navigator.clipboard.writeText(value);
  }, [value]);

  return (
    <div
      onClick={onClick}
      className={`${className} relative rounded-sm hover:cursor-pointer transition ease-out after:transition hover:bg-slate-100 hover:dark:bg-slate-700 active:bg-slate-200 after:active:bg-slate-200 dark:active:bg-opacity-70 dark:after:active:bg-opacity-70 after:absolute after:opacity-0 hover:after:opacity-100 after:content-[''] after:bg-[url('/svgs/CopyIcon.svg')] active:after:bg-[url('/svgs/TickIcon.svg')] after:bg-slate-100 after:dark:bg-slate-700 after:bg-no-repeat`}
    >
      {children}
    </div>
  );
}
