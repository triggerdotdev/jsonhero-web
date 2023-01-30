import { AutoplayVideo } from "../AutoplayVideo";
import { NewFile } from "../NewFile";
import { ExtraLargeTitle } from "../Primitives/ExtraLargeTitle";
import { SmallSubtitle } from "../Primitives/SmallSubtitle";

import heroVideo from "~/assets/home/JsonHero2.mp4";

const jsonHeroTitle = "JSON sucks.";
const jsonHeroSlogan = "But we're making it better.";

export function HomeHeroSection() {
  return (
    <div
      className={`flex items-stretch flex-col md:flex-row bg-[rgb(56,52,139)] lg:p-6 lg:pb-16 pt-20 lg:pt-32`}
    >
      <div className="self-center md:w-1/2 md:pr-10 flex justify-end">
        <div className=" max-w-3xl">
          <AutoplayVideo src={heroVideo} />
        </div>
      </div>
      <div className="self-center flex align-center md:w-1/2 px-6 pb-8 mt-8 lg:mt-0">
        <div className="max-w-lg">
          <ExtraLargeTitle className="text-lime-300">
            {jsonHeroTitle}
          </ExtraLargeTitle>
          <ExtraLargeTitle className="text-white mb-4">
            {jsonHeroSlogan}
          </ExtraLargeTitle>
          <SmallSubtitle className="text-slate-200 mb-8">
            Stop staring at thousand line JSON files in your editor and start
            staring at thousand line JSON files in the world's best JSON viewer.
            With a few nice features to help make it not <em>the worst</em>.
          </SmallSubtitle>
          <NewFile />
        </div>
      </div>
    </div>
  );
}
