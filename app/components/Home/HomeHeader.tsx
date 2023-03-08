import { DiscordIconTransparent } from "../Icons/DiscordIconTransparent";
import { EmailIconTransparent } from "../Icons/EmailIconTransparent";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { Logo } from "../Icons/Logo";
import { NewDocument } from "../NewDocument";
import { GithubStar } from "../UI/GithubStar";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "../UI/Popover";

export function HomeHeader({ fixed }: { fixed?: boolean }) {
  return (
    <header
      className={`${
        fixed ? "fixed" : ""
      } z-20 flex items-center justify-between w-screen h-[52px] sm:h-[82px] px-4 bg-indigo-700`}
    >
      <div className="flex w-28 sm:w-44 mr-3">
        <Logo />
      </div>
      <ol className="flex items-center gap-2">
        <Popover>
          <PopoverTrigger>
            <button className="hidden md:block bg-lime-500 text-slate-900 text-lg font-bold px-2 py-0.5 rounded-sm uppercase whitespace-nowrap cursor-pointer opacity-90 hover:opacity-100 transition">
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
          <GithubStar />
        </li>
        <li className="hover:cursor-pointer opacity-90 hover:opacity-100 transition">
          <a href="mailto:hello@jsonhero.io">
            <EmailIconTransparent />
          </a>
        </li>
        <li className="hover:cursor-pointer opacity-90 hover:opacity-100 transition">
          <a href="https://discord.gg/JtBAxBr2m3" target="_blank">
            <DiscordIconTransparent />
          </a>
        </li>
        <li className="hover:cursor-pointer opacity-90 hover:opacity-100 transition">
          <a href="https://twitter.com/triggerdotdev" target="_blank">
            <TwitterIcon />
          </a>
        </li>
      </ol>
    </header>
  );
}
