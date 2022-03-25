import { ChevronRightIcon } from "@heroicons/react/outline";
import { ArrayIcon } from "./Icons/ArrayIcon";
import { Body } from "./Primitives/Body";
import { Mono } from "./Primitives/Mono";

export type SearchItemProps = {
  className?: string;
};
export function SearchItem(className: SearchItemProps) {
  return (
    <li className="w-full rounded-sm mb-2 last:mb-10 group dark:bg-slate-900 transition hover:cursor-pointer hover:dark:bg-indigo-700">
      <div className="main-container flex items-center w-full p-2 pl-4 pr-3">
        <ArrayIcon className="h-6 w-6 text-slate-400 transition group-hover:text-white"></ArrayIcon>
        <div className="flex flex-col w-full ml-3">
          <div className="path flex items-center gap-1 mb-1 text-white">
            <Body className="text-xl">item</Body>
            <ChevronRightIcon className="w-4 h-4"></ChevronRightIcon>
            <Body className="text-xl">includes</Body>
            <ChevronRightIcon className="w-4 h-4"></ChevronRightIcon>
            <Body className="text-xl">tweets</Body>
            <ChevronRightIcon className="w-4 h-4"></ChevronRightIcon>
            <Body className="text-xl">…</Body>
            <ChevronRightIcon className="w-4 h-4"></ChevronRightIcon>
            <Body className="text-xl">0</Body>
            <ChevronRightIcon className="w-4 h-4"></ChevronRightIcon>
            <Body className="text-xl">size</Body>
            <ChevronRightIcon className="w-4 h-4"></ChevronRightIcon>
            <Body className="text-xl">date</Body>
          </div>
          <div className="key-value flex justify-between">
            <Mono className="text-slate-500 transition group-hover:text-white">
              <span className="text-indigo-500 transition group-hover:text-white group-hover:underline group-hover:underline-offset-1">
                2019
              </span>
              -12-31T19:26:16.000Z
            </Mono>
            <Mono className="text-slate-500 transition group-hover:text-white">
              Tue, Dec 31,
              <span className="text-indigo-500 transition group-hover:text-white group-hover:underline group-hover:underline-offset-1">
                2019
              </span>
              , 7:26:16 PM GMT
            </Mono>
          </div>
        </div>
      </div>
    </li>
  );
}
