import { DiscordIcon } from "../Icons/DiscordIcon";
import { GithubIcon } from "../Icons/GithubIcon";
import { Logo } from "../Icons/Logo";
import { NewDocument } from "../NewDocument";
import { GithubStar } from "../UI/GithubStar";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "../UI/Popover";

export function HomeHeader() {
  return (
    <header className="fixed z-20 flex items-center justify-between w-screen h-[82px] px-4 bg-indigo-700">
      <div className="flex flex-grow items-start ">
        <Logo />
      </div>
      <ol className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger>
            <button className="bg-lime-500 text-white text-lg font-bold px-2 py-0.5 rounded-sm uppercase cursor-pointer">
              Try now
            </button>
          </PopoverTrigger>
          <PopoverContent side="bottom" sideOffset={30}>
            <NewDocument />
            <PopoverArrow
              className="fill-current text-indigo-700"
              offset={20}
            />
          </PopoverContent>
        </Popover>

        <li className="hover:cursor-pointer">
          <a href="https://github.com/jsonhero-io" target="_blank">
            <GithubStar />
          </a>
        </li>
        <li className="hover:cursor-pointer">
          <a href="https://discord.gg/ZQq6Had5nP" target="_blank">
            <DiscordIcon />
          </a>
        </li>
      </ol>
    </header>
  );
}
