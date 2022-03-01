import { FunctionComponent } from "react";

export const SmallSubtitle: FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <h3 className={`font-sans text-xl text-slate-300 ${className}`}>{children}</h3>
  );
};
