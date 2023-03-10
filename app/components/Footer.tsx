import { useJsonDoc } from "~/hooks/useJsonDoc";
import { ArrowKeysIcon } from "./Icons/ArrowKeysIcon";
import { CopyShortcutIcon } from "./Icons/CopyShortcutIcon";
import { EscapeKeyIcon } from "./Icons/EscapeKeyIcon";
import { SquareBracketsIcon } from "./Icons/SquareBracketsIcon";
import { Body } from "./Primitives/Body";
import { ThemeModeToggler } from "./ThemeModeToggle";
import { GithubStarSmall } from "./UI/GithubStarSmall";
import { IndentPreference } from "~/components/IndentPreference";
import { ArrowRightIcon } from "@heroicons/react/outline";
import TriggerDevLogoImageDark from "~/assets/images/trigger-dev-logo-dark.png";
import TriggerDevLogoImage from "~/assets/images/trigger-dev-logo.png";

export function Footer() {
  const { minimal } = useJsonDoc();

  return (
    <footer className="flex items-center justify-between w-screen h-[32px] flex-shrink-0 bg-slate-200 dark:bg-slate-800 border-t-[1px] border-slate-400 transition dark:border-slate-600">
      <ol className="flex pl-3">
        <li className="flex items-center">
          <ArrowKeysIcon className="transition text-slate-300 dark:text-slate-500" />
          <Body className="pl-2 pr-4 text-slate-800 transition dark:text-white">
            Navigate
          </Body>
        </li>
        <li className="flex items-center">
          <SquareBracketsIcon className="transition text-slate-300 dark:text-slate-500" />
          <Body className="pl-2 pr-4 text-slate-800 transition dark:text-white">
            History
          </Body>
        </li>
        <li className="flex items-center">
          <EscapeKeyIcon className="transition text-slate-300 dark:text-slate-500" />
          <Body className="pl-2 pr-4 text-slate-800 transition dark:text-white whitespace-nowrap">
            Reset path
          </Body>
        </li>
        <li className="flex items-center">
          <CopyShortcutIcon className="transition text-slate-300 dark:text-slate-500" />
          <Body className="flex pl-2 pr-4 text-slate-800 transition dark:text-white">
            Copy&nbsp;
            <span className="hidden lg:flex whitespace-nowrap">
              selected&nbsp;
            </span>
            node
          </Body>
        </li>
      </ol>
      <WorkflowFooterBanner />
      <ol className="flex gap-2 items-center h-full invisible md:visible">
        {minimal && (
          <li>
            <GithubStarSmall />
          </li>
        )}
        <li>
          <IndentPreference />
        </li>
        <li>
          <ThemeModeToggler />
        </li>
      </ol>
    </footer>
  );
}

function WorkflowFooterBanner() {
  return (
    <a
      href="https://trigger.dev"
      target="_blank"
      className="group  text-md  lg:text-md whitespace-nowrap flex group hover:cursor-pointer transition items-center"
    >
      <div className="dark:hidden">
        <TriggerDevLogoDark className="flex w-24 mr-2 mt-0.5 pr-1" />
      </div>
      <div className="dark:block hidden">
        <TriggerDevLogo className="flex w-24 mr-2 mt-0.5" />
      </div>
      <span className="lg:block hidden  text-slate-700 group-hover:text-slate-900 dark:text-slate-200 dark:group-hover:text-slate-100 transition">
        Create reliable workflows in code:
      </span>
      <span className="flex  items-center underline underline-offset-2 pl-1 font-extrabold text-purple-500 whitespace-nowrap transition group-hover:text-purple-600 dark:group-hover:text-purple-400">
        Check it out
      </span>
      <ArrowRightIcon className="ml-1 h-3 w-3 text-base text-purple-500 whitespace-nowrap group-hover:text-purple-600 dark:group-hover:text-purple-400 transition" />
    </a>
  );
}

function TriggerDevLogoDark({ className }: { className: string }) {
  return <img src={TriggerDevLogoImageDark} className={className} />;
}

function TriggerDevLogo({ className }: { className: string }) {
  return <img src={TriggerDevLogoImage} className={className} />;
}
