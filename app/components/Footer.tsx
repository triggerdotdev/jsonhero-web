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
import TriggerDevLogoTriangleImage from "~/assets/images/td-triangle.png";

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
      className="group md:text-base lg:text-lg whitespace-nowrap flex group hover:cursor-pointer transition items-center justify-center px-2 h-full rounded-full"
    >
      <div className="dark:hidden pt-0.5">
        <TriggerDevLogoDark className="lg:flex hidden w-24 mr-2 mt-0.5" />
      </div>
      <div className="dark:block hidden">
        <TriggerDevLogo className="lg:flex hidden w-24 mr-2 mt-0.5" />
      </div>
      <TriggerDevLogoTriangle className="lg:hidden w-4 h-4 flex mr-2 mt-0.5 " />

      <span className="items-center lg:flex sm:flex hidden underline underline-offset-2 text-slate-700 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-100 transition">
        <span className="lg:block hidden">the&nbsp;</span>background jobs
        <span className="lg:block hidden">&nbsp;framework&nbsp;</span> for
        Typescript
        <ArrowRightIcon className="ml-1 h-3 w-3  text-base text-green-900 dark:text-green-500 whitespace-nowrap group-hover:text-green-900 dark:group-hover:text-green-400 transition" />
      </span>
    </a>
  );
}

function TriggerDevLogoDark({ className }: { className: string }) {
  return <img src={TriggerDevLogoImageDark} className={className} />;
}

function TriggerDevLogo({ className }: { className: string }) {
  return <img src={TriggerDevLogoImage} className={className} />;
}

function TriggerDevLogoTriangle({ className }: { className: string }) {
  return <img src={TriggerDevLogoTriangleImage} className={className} />;
}
