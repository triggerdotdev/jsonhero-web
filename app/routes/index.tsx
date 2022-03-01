import { HomeCollaborateSection } from "~/components/Home/HomeCollaborateSection";
import { HomeEdgeCasesSection } from "~/components/Home/HomeEdgeCasesSection";
import { HomeFeatureGridSection } from "~/components/Home/HomeFeatureGridSection";
import { HomeHeader } from "~/components/Home/HomeHeader";
import { HomeHeroSection } from "~/components/Home/HomeHeroSection";
import { HomeInfoBoxSection } from "~/components/Home/HomeInfoBoxSection";
import { HomeFooter } from "~/components/Home/HomeFooter";

export default function Index() {
  return (
    <div className="overflow-x-hidden">
      <HomeHeader />
      <HomeHeroSection />
      <HomeInfoBoxSection />
      <HomeEdgeCasesSection />
      <HomeCollaborateSection />
      <HomeFeatureGridSection />
      <HomeFooter />
    </div>
  );
}
