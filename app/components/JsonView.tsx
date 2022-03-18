import React from "react";
import { PathBar, PathHistoryControls } from "./PathBar";
import { SearchBar } from "./SearchBar";

export function JsonView({ children }: { children: React.ReactNode }) {
  return (
    <div className="path-bar-and-column-wrapper flex flex-col flex-grow overflow-x-hidden border-l-[1px] border-slate-300 transition dark:border-slate-600">
      <div className="flex justify-between p-1 bg-slate-200 border-slate-300 border-b-[1px] transition dark:bg-slate-900 dark:border-slate-600">
        <div className="flex-shrink-0 flex-grow-0">
          <PathHistoryControls />
        </div>
        <div className="flex-1 pr-2 min-w-0">
          <PathBar />
        </div>
        <SearchBar />
      </div>

      {children}
    </div>
  );
}
