import { useJsonDoc } from "~/hooks/useJsonDoc";
import { ArrowKeysIcon } from "./Icons/ArrowKeysIcon";
import { CopyShortcutIcon } from "./Icons/CopyShortcutIcon";
import { EscapeKeyIcon } from "./Icons/EscapeKeyIcon";
import { SquareBracketsIcon } from "./Icons/SquareBracketsIcon";
import { Body } from "./Primitives/Body";
import { ThemeModeToggler } from "./ThemeModeToggle";
import { GithubStarSmall } from "./UI/GithubStarSmall";
import {IndentPreference} from '~/components/IndentPreference'

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
          <Body className="pl-2 pr-4 text-slate-800 transition dark:text-white">
            Reset path
          </Body>
        </li>
        <li className="flex items-center">
          <CopyShortcutIcon className="transition text-slate-300 dark:text-slate-500" />
          <Body className="pl-2 pr-4 text-slate-800 transition dark:text-white">
            Copy selected node
          </Body>
        </li>
      </ol>

      <ol className="flex items-center h-full invisible md:visible">
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

        <a
          href="https://apihero.run"
          target="new"
          className="flex h-full justify-right  w-full bg-gradient-to-r from-purple-600 to-blue-600"
        >
          <div className="relative flex justify-center items-center w-1/2 md:w-full">
            <p className=" text-white text-md px-4">
              <span className="font-bold inline"> ⚡️ API HERO</span>
              <span className="hidden lg:inline">
                &nbsp;- integrate popular APIs in seconds
              </span>
            </p>
            <a
              href="https://apihero.run"
              target="new"
              className="flex justify-center items-center h-8 px-5  text-center text-md text-slate-800 font-bold bg-lime-500 shadow-md hover:bg-lime-400 transition"
            >
              <span className="hidden lg:inline">Private beta&nbsp; </span>
              &rarr;
            </a>
          </div>
        </a>
      </ol>
    </footer>
  );
}
