import { useCallback } from "react";
import { Title } from "../Primitives/Title";

export type PreviewBoxProps = {
  link?: string;
  children: React.ReactNode;
  className?: string;
};

export function PreviewBox({ link, className, children }: PreviewBoxProps) {
  const onClick = useCallback(() => {
    if (!link) return;
    window.open(link, "_blank");
  }, [link]);

  return (
    <div className={className}>
      <Title className="text-slate-700 transition dark:text-slate-400 mb-2">
        Preview
      </Title>
      <div
        onClick={onClick}
        className="block rounded-sm p-2 text-slate-700 bg-slate-100 transition dark:text-slate-300 dark:bg-white dark:bg-opacity-5 hover:cursor-pointer"
      >
        <div>{children}</div>
      </div>
    </div>
  );
}
