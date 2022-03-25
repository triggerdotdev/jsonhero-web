export type ShortcutIconProps = {
  children: React.ReactNode;
  className?: string;
};

export function ShortcutIcon({ className, children }: ShortcutIconProps) {
  return (
    <span
      className={`flex items-center justify-center rounded ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
