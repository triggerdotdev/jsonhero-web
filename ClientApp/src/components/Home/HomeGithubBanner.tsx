import { Body } from "../Primitives/Body";
import { GithubStar } from "../UI/GithubStar";

export function GithubBanner() {
  return (
    <div className="flex items-center justify-center w-full h-14 bg-indigo-600">
      <div className="flex items-center">
        <Body className="mr-3 text-xl text-white">Star us on GitHub 👉</Body>
        <GithubStar />
      </div>
    </div>
  );
}
