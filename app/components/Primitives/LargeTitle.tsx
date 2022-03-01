import { FunctionComponent } from "react";

export const LargeTitle: FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <h1 className={`font-sans font-bold text-2xl ${className}`}>{children}</h1>
  );
};
