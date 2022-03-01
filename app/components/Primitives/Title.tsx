import { FunctionComponent } from "react";

export const Title: FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <h2 className={`font-sans font-bold text-xl ${className}`}>{children}</h2>
  );
};
