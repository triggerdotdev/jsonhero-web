import { FunctionComponent } from "react";

export const SmallBody: FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  return <p className={`font-sans text-sm ${className}`}>{children}</p>;
};
