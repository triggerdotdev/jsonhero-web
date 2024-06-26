import { FunctionComponent, ReactNode } from "react";

export const Body: FunctionComponent<{ className?: string, children?: ReactNode }> = ({
  className,
  children,
}) => {
  return <p className={`font-sans text-base ${className}`}>{children}</p>;
};
