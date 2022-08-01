import { Body } from "../Primitives/Body";
import { HomeApiHeroLaptop } from "./HomeApiHeroLaptop";

export function HomeApiHeroBanner() {
  return (
    <a href="https://apihero.run" target="new">
      <div className="flex items-center justify-center w-full h-40 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:backdrop-filter hover:backdrop-brightness-75 transition">
        <div className="flex items-center px-6">
          <div className="flex flex-col">
            <Body className="text-white text-2xl md:text-4xl leading-tight font-bold">
              Integrate APIs in seconds!
            </Body>
            <Body className="mr-3 text-lg md:text-xl text-white underline md:no-underline">
              Check out our latest project…
            </Body>
          </div>
          <Body className="ml-1 md:ml-4 -mr-2 md:-mr-6 text-6xl text-white">
            👉
          </Body>
          <HomeApiHeroLaptop className="w-40 md:w-80 mb-2"></HomeApiHeroLaptop>
        </div>
      </div>
    </a>
  );
}
