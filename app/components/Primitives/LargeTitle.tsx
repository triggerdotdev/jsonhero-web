import { FunctionComponent, ReactNode } from "react";

export const LargeTitle: FunctionComponent<{ className?: string, children?: ReactNode }> = ({
  className,
  children,
}) => {
  return (
    <h1 className={`font-sans font-bold text-2xl ${className}`}>{children}</h1>
  );
};
