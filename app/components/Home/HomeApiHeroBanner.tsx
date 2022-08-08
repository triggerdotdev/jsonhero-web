import { Body } from "../Primitives/Body";
import { HomeApiHeroLaptop } from "./HomeApiHeroLaptop";

export function HomeApiHeroBanner() {
  return (
    <div className="flex items-center justify-start md:justify-center w-full h-40 bg-gradient-to-r from-blue-600 via-pink-500 to-indigo-600 hover:backdrop-filter hover:backdrop-brightness-75 transition">
      <div className="relative flex justify-center items-center w-1/2 md:w-full pl-6 md:px-6">
        <div className="flex flex-col">
          <Body className="text-white text-2xl font-bold md:text-4xl leading-tight">
            Coming soon...
          </Body>
          <p className="mb-2 text-white">
            <span className="font-bold">API Hero</span> – integrate APIs in
            seconds!
          </p>
          <a
            href="https://apihero.run"
            target="new"
            className="flex items-center justify-center px-3 py-2 mt-2 text-center text-lg md:text-xl text-slate-800 font-bold bg-lime-500 rounded shadow-md hover:bg-lime-400 transition"
          >
            Sign up{" "}
            <span className="hidden md:block">&nbsp;for early access </span>
            <span className="md:hidden">&nbsp;now </span>
            &rarr;
          </a>
        </div>
        <a
          href="https://apihero.run"
          target="new"
          className="absolute md:relative -top-5 md:top-auto -right-[20rem] md:right-auto"
        >
          <HomeApiHeroLaptop className="w-50 md:w-80 mb-2"></HomeApiHeroLaptop>
        </a>
      </div>
    </div>
  );
}
