import { SearchIcon } from "@heroicons/react/outline";
import { ShortcutIcon } from "./Icons/ShortcutIcon";
import { Body } from "./Primitives/Body";

export type SearchBarProps = {
  className?: string;
};

export function SearchBar({ className }: SearchBarProps) {
  return (
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
  );
}
