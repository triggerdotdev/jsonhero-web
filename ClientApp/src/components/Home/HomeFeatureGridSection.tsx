import {
  FastForwardIcon,
  MoonIcon,
  ClockIcon,
  CodeIcon,
  LockOpenIcon,
  CubeTransparentIcon,
} from "@heroicons/react/outline";
import { Body } from "../Primitives/Body";
import { LargeTitle } from "../Primitives/LargeTitle";
import { HomeGridFeatureItem } from "./HomeGridFeatureItem";
import { HomeSection } from "./HomeSection";

export function HomeFeatureGridSection() {
  return (
    <HomeSection containerClassName="bg-black">
      <div className="flex flex-col px-4 pb-2 pt-6 md:py-12">
        <LargeTitle className="mb-4 text-slate-300">
          And lots more features…
        </LargeTitle>
        <div className="flex flex-col gap-4 md:flex-row md:flex-wrap">
          <HomeGridFeatureItem
            icon={FastForwardIcon}
            title="Keyboard shortcuts"
            titleClassName="text-white"
          >
            <Body className="text-slate-400">
              Move as fast as you can think… after 3 coffees
            </Body>
          </HomeGridFeatureItem>

          <HomeGridFeatureItem
            icon={MoonIcon}
            title="Dark mode"
            titleClassName="text-white"
          >
            <Body className="text-slate-400">
              Of course, we’re not animals.
            </Body>
          </HomeGridFeatureItem>

          <HomeGridFeatureItem
            icon={ClockIcon}
            title="Code view"
            titleClassName="text-white"
          >
            <Body className="text-slate-400">
              Easily switch to the code view, so you can appear hardcore.
            </Body>
          </HomeGridFeatureItem>
          <HomeGridFeatureItem
            icon={CubeTransparentIcon}
            title="Auto JSON Schema"
            titleClassName="text-white"
          >
            <Body className="text-slate-400">
              Automatically generates JSON Schema (draft 2020-12) from your
              JSON.
            </Body>
          </HomeGridFeatureItem>
          <HomeGridFeatureItem
            icon={CodeIcon}
            title="VS Code plugin"
            titleClassName="text-white"
          >
            <Body className="text-slate-400">
              Quickly view JSON files or selections in JSON Hero, right from VS
              Code.{" "}
              <a
                className="whitespace-nowrap text-lime-300 hover:text-lime-500"
                href="https://marketplace.visualstudio.com/items?itemName=JSONHero.jsonhero-vscode"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get it here
              </a>
              .
            </Body>
          </HomeGridFeatureItem>
          <HomeGridFeatureItem
            icon={LockOpenIcon}
            title="100% open source"
            titleClassName="text-white"
          >
            <Body className="text-slate-400">
              Use jsonhero.io or fork it on GitHub and run it yourself.
            </Body>
          </HomeGridFeatureItem>
        </div>
      </div>
    </HomeSection>
  );
}
