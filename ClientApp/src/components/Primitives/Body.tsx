import { FunctionComponent } from "react";

export const Body: FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  return <p className={`font-sans text-base ${className}`}>{children}</p>;
};
