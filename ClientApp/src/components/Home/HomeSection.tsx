export type HomeSectionProps = {
  containerClassName?: string;
  maxWidth?: string;
  reversed?: boolean;
  flipped?: boolean;
  children: React.ReactNode;
};

export function HomeSection({
  containerClassName,
  maxWidth = "1150px",
  reversed = false,
  flipped = false,
  children,
}: HomeSectionProps) {
  return (
    <div className={`flex justify-center items-center ${containerClassName}`}>
      <div
        className={`flex flex-col md:flex-row w-full ${
          reversed ? "md:flex-row-reverse" : ""
        }${flipped ? "flex-col-reverse" : ""}`}
        style={{ maxWidth: maxWidth }}
      >
        {children}
      </div>
    </div>
  );
}
