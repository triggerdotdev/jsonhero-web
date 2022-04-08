import { memo } from "react";

function BlankColumnElement() {
  return (
    <div
      className={
        "column flex-none border-r-[1px] border-slate-300 w-80 transition dark:border-slate-600"
      }
    ></div>
  );
}

export const BlankColumn = memo(BlankColumnElement);
