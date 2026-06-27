import React from "react";

export type HomeSplitSectionProps = {
  className?: string;
  children: React.ReactNode;
};

export function HomeSplitSection({
  className,
  children,
}: HomeSplitSectionProps) {
  return (
    <div
      className={`grid lg:grid-cols-2 items-center justify-items-center py-12 ${className}`}
    >
      {children}
    </div>
  );
}

export function HomeSplitTextContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="justify-self-center lg:justify-self-end max-w-2xl px-20 flex flex-col justify-center">
      {children}
    </div>
  );
}

export function HomeSplitMediaContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center items-center px-10 py-5">
      {children}
    </div>
  );
}
