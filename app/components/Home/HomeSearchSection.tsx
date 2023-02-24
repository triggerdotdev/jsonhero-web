import { AutoplayVideo } from "../AutoplayVideo";
import { ExtraLargeTitle } from "../Primitives/ExtraLargeTitle";
import { SmallSubtitle } from "../Primitives/SmallSubtitle";
import { HomeSection } from "./HomeSection";

export function HomeSearchSection() {
  return (
    <HomeSection containerClassName="py-10 px-6 bg-black md:py-36 lg:py-20">
      <div className="w-full md:pr-10 md:w-1/2">
        <ExtraLargeTitle className="text-white mb-4">
          Quickly search your whole JSON file
        </ExtraLargeTitle>
        <SmallSubtitle className="mb-6 md:mb-10">
          Search for absolutely anything in your JSON file with blistering
          speed. Use the fuzzy matching and keyboard shortcuts to make
          navigating your files even faster.
        </SmallSubtitle>
      </div>
      <div className="w-full md:w-1/2">
        <AutoplayVideo src="https://cdn.seclusion.work/public/video/jsonhero/JsonHeroSearch.mp4" />
      </div>
    </HomeSection>
  );
}
