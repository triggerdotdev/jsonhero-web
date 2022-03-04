import { Title } from "../Primitives/Title";

export type PreviewBoxProps = {
  children: React.ReactNode;
  className?: string;
};

export function PreviewBox({ children, className }: PreviewBoxProps) {
  return (
    <div className={className}>
      <Title className="text-slate-700 transition dark:text-slate-400 mb-2">
        Preview
      </Title>
      <div className="block rounded-sm p-2 text-slate-700 bg-slate-100 transition dark:text-slate-300 dark:bg-white dark:bg-opacity-5 hover:bg-slate-200 hover:cursor-pointer">
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
