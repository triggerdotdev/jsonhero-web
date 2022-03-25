import { ExclamationIcon, SearchIcon } from "@heroicons/react/outline";
import { ShortcutIcon } from "./Icons/ShortcutIcon";
import { Body } from "./Primitives/Body";
import { Dialog, DialogTrigger, DialogContent } from "./UI/Dialog";
import { EscapeKeyIcon } from "./Icons/EscapeKeyIcon";
import { ArrowKeysUpDownIcon } from "./Icons/ArrowKeysUpDownIcon";
import { LoadingIcon } from "./Icons/LoadingIcon";
import { SearchItem } from "./SearchItem";
import classnames from "~/utilities/classnames";

export type SearchBarProps = {
  className?: string;
};

export function SearchBar({ className }: SearchBarProps) {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex justify-between items-center group w-44 rounded-sm bg-slate-300 transition hover:bg-slate-400 hover:bg-opacity-50 dark:bg-slate-800 dark:text-slate-400 hover:cursor-pointer hover:dark:bg-slate-700 hover:dark:bg-opacity-70">
          <div className="flex items-center pl-1">
            <SearchIcon className="w-4 h-4 mr-1" />
            <Body>Search…</Body>
          </div>
          <div className="flex items-center gap-1 pr-1">
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
          "w-[95vw] max-w-xl rounded-lg",
          "top-0 left-[50%] -translate-x-[50%]",
          "mt-[60px]",
          "bg-white border-[1px] dark:border-slate-700 dark:bg-slate-800"
        )}
      >
        <JamesCommandPalette />
      </DialogContent>
    </Dialog>
  );
}

function JamesCommandPalette() {
  return (
    <>
      <div className="search-container max-h-[60vh] px-4 pt-4 overflow-hidden">
        <label className="relative text-gray-400 focus-within:text-gray-600 block">
          <SearchIcon className="absolute w-7 h-7 top-1/2 transform -translate-y-1/2 left-3 text-white pointer-events-none" />
          <input
            type="text"
            placeholder="Search the JSON…"
            className="search-field w-full pl-12 pr-4 py-4 rounded-sm text-white text-2xl caret-indigo-700 bg-slate-900 border-indigo-700 focus:outline-none focus:ring focus:ring-indigo-700"
          />
        </label>
        <div className="search-content flex flex-col mt-4 mb-2">
          <div className="results flex">
            <div className="results-loading flex">
              <LoadingIcon className="animate-spin h-5 w-5 mr-1"></LoadingIcon>
              <Body className="text-slate-400">Loading…</Body>
            </div>
            <div className="results-returned">
              <Body className="text-slate-400">35 results</Body>
            </div>
            <div className="results-none flex">
              <ExclamationIcon className="h-5 w-5 mr-1 text-white"></ExclamationIcon>
              <Body className="text-slate-400">
                No results for "sdgiuhnkjdfg"
              </Body>
            </div>
          </div>
        </div>
        <ul className="search-items w-full max-h-[inherit] pb-24 overflow-y-auto">
          <SearchItem></SearchItem>
          <SearchItem></SearchItem>
          <SearchItem></SearchItem>
          <SearchItem></SearchItem>
          <SearchItem></SearchItem>
          <SearchItem></SearchItem>
          <SearchItem></SearchItem>
          <SearchItem></SearchItem>
          <SearchItem></SearchItem>
          <SearchItem></SearchItem>
          <SearchItem></SearchItem>
          <SearchItem></SearchItem>
          <SearchItem></SearchItem>
        </ul>
      </div>
      <div className="footer flex items-center w-full gap-4 px-3 py-2 border-t-[1px] border-slate-700 rounded-br-lg rounded-bl-lg bg-slate-900">
        <div className="flex items-center gap-1">
          <ShortcutIcon className="w-4 h-4 text-sm text-slate-900 bg-slate-300 transition duration-75 group-hover:bg-slate-100 dark:bg-slate-500 dark:group-hover:bg-slate-600">
            ⏎
          </ShortcutIcon>
          <Body className="text-slate-500">to select</Body>
        </div>
        <div className="flex items-center gap-1">
          <ArrowKeysUpDownIcon className="transition text-slate-300 dark:text-slate-500" />
          <Body className="text-slate-500">to navigate</Body>
        </div>
        <div className="flex items-center gap-1">
          <EscapeKeyIcon className="transition text-slate-300 dark:text-slate-500" />
          <Body className="text-slate-500">to close</Body>
        </div>
      </div>
    </>
  );
}
