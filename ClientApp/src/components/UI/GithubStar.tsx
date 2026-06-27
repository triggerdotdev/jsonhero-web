import { formatStarCount } from "~/utilities/formatStarCount";
import { GithubIconSimple } from "../Icons/GithubIconSimple";
import { Body } from "../Primitives/Body";
import { useStarCount } from "../StarCountProvider";

export type GithubStarProps = {
  className?: string;
};

export function GithubStar({ className }: GithubStarProps) {
  const starCount = useStarCount();

  return (
    <a
      href="https://github.com/triggerdotdev/jsonhero-web"
      target="_blank"
      className="flex text-slate-700 opacity-90 transition hover:cursor-pointer hover:opacity-100"
    >
      <div className="flex items-center gap-1 pr-2 pl-1 py-1 bg-slate-300 rounded-l">
        <GithubIconSimple className="w-4 h-4 ml-1"></GithubIconSimple>
        <Body className="font-semibold text-slate-800 hidden md:block">
          Star
        </Body>
      </div>
      {starCount && (
        <div className="px-2 py-1 border-l border-slate-400 bg-slate-100 rounded-r">
          <Body className="font-bold">{formatStarCount(starCount)}</Body>
        </div>
      )}
    </a>
  );
}
