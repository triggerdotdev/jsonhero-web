import { Link } from "remix";
import { DiscordIcon } from "../Icons/DiscordIcon";
import { EmailIcon } from "../Icons/EmailIcon";
import { GithubIcon } from "../Icons/GithubIcon";
import { Logo } from "../Icons/Logo";
import { TwitterIcon } from "../Icons/TwitterIcon";

export type HomeFooterProps = {
  maxWidth?: string;
};

export function HomeFooter({ maxWidth = "1150px" }: HomeFooterProps) {
  return (
    <footer className="flex flex-col items-center w-full px-4 py-6 bg-black md:py-10">
      <div
        className="flex items-center justify-between w-full border-t-[1px] pt-9 border-slate-800"
        style={{ maxWidth: maxWidth }}
      >
        <div className="flex flex-grow items-start">
          <Logo />
        </div>
        <ol className="flex ml-2">
          <li className="mr-2 hover:cursor-pointer text-white/70 hover:text-white transition">
            <Link to="/privacy">Privacy</Link>
          </li>
          <li className="hover:cursor-pointer">
            <a
              href="https://github.com/triggerdotdev/jsonhero-web"
              target="_blank"
            >
              <GithubIcon />
            </a>
          </li>
          <li className="ml-2 hover:cursor-pointer">
            <a href="mailto:hello@jsonhero.io">
              <EmailIcon />
            </a>
          </li>
          <li className="ml-2 hover:cursor-pointer">
            <a href="https://discord.gg/JtBAxBr2m3" target="_blank">
              <DiscordIcon />
            </a>
          </li>
          <li className="ml-2 hover:cursor-pointer">
            <a href="https://twitter.com/triggerdotdev" target="_blank">
              <TwitterIcon />
            </a>
          </li>
        </ol>
      </div>
    </footer>
  );
}
