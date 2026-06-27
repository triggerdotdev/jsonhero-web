import { FunctionComponent } from "react";

export const BodyBold: FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  return (
    <p className={`font-sans text-base font-bold ${className}`}>{children}</p>
  );
};
