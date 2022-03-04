export type OpenInNewWindowProps = {
  children?: React.ReactNode;
  url?: string;
  className?: string;
};

export function OpenInNewWindow({
  url,
  className,
  children,
}: OpenInNewWindowProps) {
  return (
    <a href={url} target="_blank" className={`${className} relative`}>
      {children}
    </a>
  );
}
