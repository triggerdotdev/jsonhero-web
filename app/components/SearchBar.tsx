import { SearchIcon } from "@heroicons/react/outline";
import { ShortcutIcon } from "./Icons/ShortcutIcon";
import { Body } from "./Primitives/Body";
import { Dialog, DialogTrigger, DialogContent } from "./UI/Dialog";

export type SearchBarProps = {
  className?: string;
};

import classnames from "~/utilities/classnames";

export function SearchBar({ className }: SearchBarProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex justify-between items-center group w-44 rounded-sm bg-slate-300 transition hover:bg-slate-400 hover:bg-opacity-50 dark:bg-slate-800 dark:text-slate-400 hover:cursor-pointer hover:dark:bg-slate-700 hover:dark:bg-opacity-70">
          <div className="flex items-center pl-2">
            <SearchIcon className="w-4 h-4 mr-1" />
            <Body>Search…</Body>
          </div>
          <div className="flex items-center gap-1 pr-2">
            <ShortcutIcon className="w-4 h-4 text-sm bg-slate-200 transition group-hover:bg-slate-100 dark:bg-slate-700 dark:group-hover:bg-slate-600">
              ⌘
            </ShortcutIcon>
            <ShortcutIcon className="w-4 h-4 text-sm bg-slate-200 transition group-hover:bg-slate-100 dark:bg-slate-700 dark:group-hover:bg-slate-600">
              K
            </ShortcutIcon>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent
        className={classnames(
          "fixed z-50",
          "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
          "top-[30%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
          "bg-white dark:bg-gray-800",
          "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        )}
      >
        <SearchCommandPalette />
      </DialogContent>
    </Dialog>
  );
}

export default function SearchCommandPalette() {
  return <div className="text-center">Search Command Palette</div>;
}
