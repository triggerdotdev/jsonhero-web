import { useRef, useEffect } from "react";
import invariant from "tiny-invariant";

export function ScrollingColumnView({
  children,
  selectedPath,
}: {
  children: React.ReactNode;
  selectedPath: string[];
}) {
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    invariant(columnsRef.current, "columnsRef.current is null");

    //get the selected column
    const scrollToColumnIndex = Math.max(0, selectedPath.length - 1);
    const scrollNode = columnsRef.current.children[scrollToColumnIndex];
    if (scrollNode == null) return;
    const scrollHTMLElement = scrollNode as HTMLElement;

    //try center the selected column in the viewport
    const columnCenter =
      scrollHTMLElement.offsetLeft - scrollHTMLElement.clientWidth / 2;
    const containerWidth = columnsRef.current.clientWidth;
    const scrollPosition = Math.max(0, columnCenter - containerWidth / 2);

    columnsRef.current.scrollLeft = scrollPosition;
  }, [selectedPath, columnsRef, children]);

  return (
    <div
      className="columns flex flex-grow overflow-x-auto no-scrollbar focus:outline-none"
      ref={columnsRef}
    >
      {children}
    </div>
  );
}
