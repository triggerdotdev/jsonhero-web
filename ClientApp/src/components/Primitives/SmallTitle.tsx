import { FunctionComponent } from "react";

export const SmallTitle: FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <h3 className={`font-sans font-bold text-lg ${className}`}>{children}</h3>
  );
};
