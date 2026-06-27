import { FunctionComponent } from "react";

export const Mono: FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  return <p className={`font-mono text-sm ${className}`}>{children}</p>;
};
