import { AutoplayVideo } from "../AutoplayVideo";
import { NewFile } from "../NewFile";
import { ExtraLargeTitle } from "../Primitives/ExtraLargeTitle";
import { SmallSubtitle } from "../Primitives/SmallSubtitle";
import { HomeSection } from "./HomeSection";

const jsonHeroTitle = "JSON sucks.";
const jsonHeroSlogan = "But we're making it better.";

export function HomeHeroSection() {
  return (
    <HomeSection containerClassName="md:h-[80vh] bg-black p-6 pb-16 pt-32 md:pt-48">
      <div className="mt-6 lg:w-1/2 md:pr-10">
        <AutoplayVideo src="/home/JsonHero2.mp4" />
      </div>
      <div className="lg:w-1/2">
        <ExtraLargeTitle className="text-lime-300">
          {jsonHeroTitle}
        </ExtraLargeTitle>
        <ExtraLargeTitle className="text-white mb-4">
          {jsonHeroSlogan}
        </ExtraLargeTitle>
        <SmallSubtitle className="text-slate-400 mb-8">
          Stop staring at thousand line JSON files in your editor and start
          staring at thousand line JSON files in your browser. With a few nice
          features to help make it not <em>the worst</em>.
        </SmallSubtitle>
        <NewFile />
      </div>
    </HomeSection>
  );
}
