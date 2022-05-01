import { FunctionComponent } from "react";

export const PageNotFoundTitle: FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <h1 className={`font-sans font-bold text-8xl ${className}`}>{children}</h1>
  );
};
