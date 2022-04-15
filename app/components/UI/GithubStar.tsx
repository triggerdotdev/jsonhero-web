import { GithubIcon } from "../Icons/GithubIcon";
import { Body } from "../Primitives/Body";

export function GithubStar() {
  return (
    <button className="flex text-slate-700">
      <div className="flex items-center gap-1 pr-2 pl-1 py-1 bg-slate-300 rounded-l-sm">
        <GithubIcon className="w-5 h-5 ml-1"></GithubIcon>
        <Body className="font-semibold">Star</Body>
      </div>
      <div className="px-2 py-1 border-l border-slate-400 bg-slate-100 rounded-r-sm">
        <Body className="font-bold">922</Body>
      </div>
    </button>
  );
}
