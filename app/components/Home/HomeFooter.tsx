import { DiscordIcon } from "../Icons/DiscordIcon";
import { GithubIcon } from "../Icons/GithubIcon";
import { Logo } from "../Icons/Logo";

export type HomeFooterProps = {
  maxWidth?: string;
};

export function HomeFooter({ maxWidth = "1150px" }: HomeFooterProps) {
  return (
    <footer className="flex flex-col items-center w-full px-4 py-6 bg-black md:py-10">
      <div
        className="flex items-center justify-between w-full pt-9 border-t-[1px] border-slate-800"
        style={{ maxWidth: maxWidth }}
      >
        <div className="flex flex-grow items-start ">
          <Logo />
        </div>
        <ol className="flex ml-2">
          <li className="ml-0 hover:cursor-pointer">
            <DiscordIcon />
          </li>
          <li className="ml-2 hover:cursor-pointer">
            <GithubIcon />
          </li>
        </ol>
      </div>
    </footer>
  );
}
