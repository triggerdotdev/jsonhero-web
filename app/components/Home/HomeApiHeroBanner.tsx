import { Body } from "../Primitives/Body";
import { GithubStar } from "../UI/GithubStar";

export function HomeApiHeroBanner() {
  return (
    <div className="flex items-center justify-center w-full h-40 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:backdrop-filter hover:backdrop-brightness-75 transition">
      <div className="flex items-center">
        <Body className="mr-3 text-xl text-white">Star us on GitHub 👉</Body>
        <GithubStar />
      </div>
    </div>
  );
}
