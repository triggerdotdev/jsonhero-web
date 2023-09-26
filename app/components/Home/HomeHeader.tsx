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
import TriggerDevLogoImage from "~/assets/images/trigger-dev-logo.png";

export function HomeHeader({ fixed }: { fixed?: boolean }) {
  return (
    <header
      className={`${
        fixed ? "fixed" : ""
      } z-20 flex h-[82px]  bg-indigo-700 flex-col`}
    >
      <div className="flex h-8 bg-slate-900 w-full items-center justify-center text-base sm:text-lg ">
        <a
          href="https://trigger.dev"
          target="_blank"
          aria-label="Trigger.dev logo"
          className=" cursor-pointer "
        >
          <TriggerDevLogo className={"h-4 px-1 mt-0.5"} />
        </a>
        <p className="text-slate-200">
          <span className="hidden lg:inline-block ">
            - our background jobs framework for Typescript.
          </span>{" "}
          <a
            className="underline hover:opacity-90 cursor-pointer text-lime-400"
            target="_blank"
            href="https://cloud.trigger.dev"
          >
            Try for free
          </a>
          .
        </p>
      </div>
      <div className="flex items-center justify-between w-screen px-4">
        <div className="flex w-28 sm:w-44 mr-3">
          <Logo />
        </div>
        <ol className="flex items-center gap-2 sm:pr-4 pr-2">
          <Popover>
            <PopoverTrigger>
              <button className="hidden md:block bg-lime-400 text-slate-900 text-lg font-bold px-2 py-0.5 rounded-sm uppercase whitespace-nowrap cursor-pointer opacity-90 hover:opacity-100 transition">
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
      </div>
    </header>
  );
}

function TriggerDevLogo({ className }: { className: string }) {
  return <img src={TriggerDevLogoImage} className={className} />;
}
