import { Title } from "../Primitives/Title";

export type PreviewBoxProps = {
  link?: string;
  children: React.ReactNode;
  className?: string;
};

export function PreviewBox({ link, className, children }: PreviewBoxProps) {
  return (
    <div className={className}>
      <Title className="text-slate-700 transition dark:text-slate-400 mb-2">
        Preview
      </Title>
      <a
        className="block rounded-sm p-2 text-slate-700 bg-slate-100 transition dark:text-slate-300 dark:bg-white dark:bg-opacity-5 hover:bg-slate-200 hover:cursor-pointer"
        href={link}
        target="_blank"
      >
        <div>{children}</div>
      </a>
    </div>
  );
}
