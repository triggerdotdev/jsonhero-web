import { ShareIcon, PlusIcon } from "@heroicons/react/outline";
import { DocumentTitle } from "./DocumentTitle";
import { DiscordIconTransparent } from "./Icons/DiscordIconTransparent";
import { GithubStar } from "./UI/GithubStar";
import { Logo } from "./Icons/Logo";
import { Share } from "./Share";
import { NewDocument } from "./NewDocument";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "./UI/Popover";

export function Header() {
  return (
    <header className="flex items-center justify-between w-screen h-[40px] bg-indigo-700 dark:bg-slate-800 border-b-[1px] border-slate-600">
      <Logo className="pl-1 pr-2" width={"130"} />
      <DocumentTitle />
      <ol className="flex items-center gap-2 px-4">
        <Popover>
          <PopoverTrigger>
            <button className="flex items-center justify-center bg-lime-500 text-slate-800 bg-opacity-90 text-base font-bold px-2 py-1 rounded-sm uppercase hover:cursor-pointer hover:bg-opacity-100 transition">
              <PlusIcon className="w-4 h-4 mr-0.5"></PlusIcon>
              New
            </button>
          </PopoverTrigger>
          <PopoverContent side="bottom" sideOffset={8}>
            <NewDocument />
            <PopoverArrow
              className="fill-current text-indigo-700"
              offset={20}
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger>
            <button className="flex items-center justify-center py-1 bg-slate-200 text-slate-800 bg-opacity-90 text-base font-bold px-2 rounded-sm uppercase hover:cursor-pointer hover:bg-opacity-100 transition">
              <ShareIcon className="w-4 h-4 mr-1"></ShareIcon>
              Share
            </button>
          </PopoverTrigger>
          <PopoverContent side="bottom" sideOffset={8}>
            <Share />
            <PopoverArrow
              className="fill-current text-indigo-700"
              offset={20}
            />
          </PopoverContent>
        </Popover>

        <li className="opacity-90 transition hover:cursor-pointer hover:opacity-100">
          <GithubStar />
        </li>
        <li className="opacity-90 transition hover:cursor-pointer hover:opacity-100">
          <a href="https://discord.gg/ZQq6Had5nP" target="_blank">
            <DiscordIconTransparent />
          </a>
        </li>
      </ol>
    </header>
  );
}
