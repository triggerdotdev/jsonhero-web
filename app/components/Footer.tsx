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

      <ApiHeroFooterBanner />

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

function ApiHeroFooterBanner() {
  return (
    <a
      href="https://apihero.run"
      target="_blank"
      className="hover:underline flex group hover:cursor-pointer text-slate-900 dark:text-white transition items-center dark:hover:text-transparent dark:hover:bg-clip-text dark:hover:bg-gradient-to-r dark:hover:from-purple-400 dark:hover:to-pink-600"
    >
      <p className="md:text-lg text-sm whitespace-nowrap">
        Try{" "}
        <span className=" font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          API Hero
        </span>{" "}
        – make every API you use faster and more reliable!
      </p>
      <ArrowRightIcon className="ml-1 h-4 w-4 text-base text-slate-900 dark:text-white dark:group-hover:text-purple-400 transition" />
    </a>
  );
}
