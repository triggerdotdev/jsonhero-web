import { FunctionComponent } from "react";

export const LargeMono: FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  return <p className={`font-mono text-md ${className}`}>{children}</p>;
};
