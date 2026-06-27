import React, { useState, useEffect, useRef } from "react";

type ResizableProps = {
  children: React.ReactNode;
  isHorizontal: boolean;
  initialSize: number;
  minimumSize: number;
  maximumSize: number;
};

export default function Resizable({
  children,
  isHorizontal = true,
  initialSize,
  minimumSize,
  maximumSize,
}: ResizableProps) {
  const [dimension, setDimension] = useState(initialSize);
  const previousDragPosition = useRef<{ x: number; y: number } | null>(null);

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>): void => {
    previousDragPosition.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handleDrag = (e: MouseEvent) => {
    if (previousDragPosition.current == null) {
      return;
    }

    e.preventDefault();

    let offset = 0;
    if (isHorizontal) {
      offset = e.clientX - previousDragPosition.current.x;
    } else {
      offset = e.clientY - previousDragPosition.current.y;
    }
    let newValue = dimension - offset;
    if (minimumSize != null) {
      newValue = Math.max(minimumSize, newValue);
    }
    if (maximumSize != null) {
      newValue = Math.min(maximumSize, newValue);
    }
    setDimension(newValue);
    previousDragPosition.current = {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handleDragEnd = () => {
    previousDragPosition.current = null;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleDragEnd);
    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [handleDrag, handleDragEnd]);

  const style = () => {
    let formatted = dimension + "px";

    if (isHorizontal) {
      return {
        width: formatted,
      };
    } else {
      return {
        height: formatted,
      };
    }
  };

  const classes = () => {
    if (isHorizontal) {
      return "flex flex-none relative";
    } else {
      return "flex flex-none relative";
    }
  };

  return (
    <div style={style()} className={classes()}>
      <div className={"flex-grow"} style={{ width: "inherit" }}>
        {children}
      </div>
      <div
        className={
          isHorizontal
            ? "w-1 h-full absolute my-0 -ml-[1px] transition-all cursor-col-resize hover:bg-indigo-700 hover:opacity-100"
            : "h-1 w-full transition-all cursor-row-resize hover:bg-indigo-700 hover:opacity-100"
        }
        onMouseDown={handleDragStart}
      ></div>
    </div>
  );
}
