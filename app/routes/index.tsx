import { HomeCollaborateSection } from "~/components/Home/HomeCollaborateSection";
import { HomeEdgeCasesSection } from "~/components/Home/HomeEdgeCasesSection";
import { HomeFeatureGridSection } from "~/components/Home/HomeFeatureGridSection";
import { HomeHeader } from "~/components/Home/HomeHeader";
import { HomeHeroSection } from "~/components/Home/HomeHeroSection";
import { HomeInfoBoxSection } from "~/components/Home/HomeInfoBoxSection";
import { HomeSearchSection } from "~/components/Home/HomeSearchSection";
import { HomeFooter } from "~/components/Home/HomeFooter";
import { GithubBanner } from "~/components/Home/HomeGithubBanner";
import { HomeProductHuntBanner } from "~/components/Home/HomeProductHuntBanner";
import { HomeChromeExtensionPrompt } from "~/components/Home/HomeChromeExtensionPrompt";
import { LoaderFunction, useLoaderData } from "remix";
import userAgentParser from "ua-parser-js";

type LoaderData = {
  userAgent: ReturnType<typeof userAgentParser>;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderData> => {
  const rawUserAgent = request.headers.get("user-agent") || "";
  const userAgent = userAgentParser(rawUserAgent);

  return {
    userAgent,
  };
};

export default function Index() {
  const { userAgent } = useLoaderData<LoaderData>();

  return (
    <div className="overflow-x-hidden">
      <HomeHeader fixed={true} />
      <HomeHeroSection />
      {userAgent.browser.name === "Chrome" ? (
        <HomeChromeExtensionPrompt />
      ) : (
        <GithubBanner />
      )}
      {/* <HomeProductHuntBanner /> */}
      <HomeInfoBoxSection />
      <HomeEdgeCasesSection />
      <HomeSearchSection />
      <HomeCollaborateSection />
      <HomeFeatureGridSection />
      <HomeFooter />
    </div>
  );
}
