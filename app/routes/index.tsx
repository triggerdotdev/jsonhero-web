import { HomeCollaborateSection } from "~/components/Home/HomeCollaborateSection";
import { HomeEdgeCasesSection } from "~/components/Home/HomeEdgeCasesSection";
import { HomeFeatureGridSection } from "~/components/Home/HomeFeatureGridSection";
import { HomeHeader } from "~/components/Home/HomeHeader";
import { HomeHeroSection } from "~/components/Home/HomeHeroSection";
import { HomeInfoBoxSection } from "~/components/Home/HomeInfoBoxSection";
import { HomeSearchSection } from "~/components/Home/HomeSearchSection";
import { HomeFooter } from "~/components/Home/HomeFooter";
import { GithubBanner } from "~/components/Home/HomeGithubBanner";

export default function Index() {
  return (
    <div className="overflow-x-hidden">
      <HomeHeader fixed={true} />
      <HomeHeroSection />
      <GithubBanner />
      <HomeInfoBoxSection />
      <HomeEdgeCasesSection />
      <HomeSearchSection />
      <HomeCollaborateSection />
      <HomeFeatureGridSection />
      <HomeFooter />
    </div>
  );
}
