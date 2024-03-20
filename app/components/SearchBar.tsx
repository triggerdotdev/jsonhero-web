import { SearchIcon } from "@heroicons/react/outline";
import { ShortcutIcon } from "./Icons/ShortcutIcon";
import { Body } from "./Primitives/Body";
import { Dialog, DialogTrigger, DialogContent } from "./UI/Dialog";

import classnames from "~/utilities/classnames";
import { SearchPalette } from "./SearchPalette";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useJsonColumnViewAPI } from "~/hooks/useJsonColumnView";
import { useJsonSearchApi } from "~/hooks/useJsonSearch";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { goToNodeId } = useJsonColumnViewAPI();
  const searchApi = useJsonSearchApi();

  useHotkeys(
    "cmd+k,ctrl+k",
    (e) => {
      e.preventDefault();
      setIsOpen(true);
    },
    [setIsOpen]
  );

  return (
    <Dialog open={isOpen} onOpenChange={() => !isOpen && searchApi.reset()}>
      <DialogTrigger
        className="focus:outline-none focus-visible:outline-none"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex justify-between items-center group w-44 py-[3px] rounded bg-slate-300 transition hover:bg-slate-400 hover:bg-opacity-50 dark:bg-slate-800 dark:text-slate-400 hover:cursor-pointer hover:dark:bg-slate-700 hover:dark:bg-opacity-70">
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
        onOverlayClick={() => setIsOpen(false)}
        className={classnames(
          "fixed z-50",
          "w-[95vw] max-w-2xl rounded-lg",
          "top-0 left-[50%] -translate-x-[50%]",
          "mt-[60px]",
          "bg-white border-[1px] border-slate-500 dark:border-slate-700 dark:bg-slate-800"
        )}
      >
        <SearchPalette
          onClose={() => setIsOpen(false)}
          onSelect={(entry) => {
            setIsOpen(false);
            goToNodeId(entry, "search");
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
