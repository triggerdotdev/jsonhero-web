import { ShareIcon, PlusIcon } from "@heroicons/react/outline";
import { DocumentTitle } from "./DocumentTitle";
import { DiscordIcon } from "./Icons/DiscordIcon";
import { GithubIcon } from "./Icons/GithubIcon";
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
    <header className="flex items-center justify-between w-screen h-[40px] bg-indigo-700">
      <Logo className="pl-1 pr-2" width={"130"} />
      <DocumentTitle />
      <div className="flex px-4">
        <Popover>
          <PopoverTrigger>
            <button className="flex items-center justify-center mr-2 bg-slate-200 text-indigo-700 bg-opacity-80 text-base font-bold pl-1 pr-2 rounded-sm uppercase hover:cursor-pointer hover:bg-opacity-100 transition">
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

        <Popover>
          <PopoverTrigger>
            <button className="flex items-center justify-center bg-lime-500 text-slate-700 bg-opacity-80 text-base font-bold pl-1 pr-2 rounded-sm uppercase hover:cursor-pointer hover:bg-opacity-100 transition">
              <PlusIcon className="w-4 h-4 mr-1"></PlusIcon>
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
        <ol className="flex ml-4">
          <li className="ml-0 opacity-80 transition hover:cursor-pointer hover:opacity-100">
            <a href="https://discord.gg/ZQq6Had5nP" target="_blank">
              <DiscordIcon />
            </a>
          </li>
          <li className="ml-2 opacity-80 transition hover:cursor-pointer hover:opacity-100">
            <GithubIcon />
          </li>
        </ol>
      </div>
    </header>
  );
}
