import { HomeCollaborateSection } from "~/components/Home/HomeCollaborateSection";
import { HomeEdgeCasesSection } from "~/components/Home/HomeEdgeCasesSection";
import { HomeFeatureGridSection } from "~/components/Home/HomeFeatureGridSection";
import { HomeHeader } from "~/components/Home/HomeHeader";
import { HomeHeroSection } from "~/components/Home/HomeHeroSection";
import { HomeInfoBoxSection } from "~/components/Home/HomeInfoBoxSection";
import { HomeSearchSection } from "~/components/Home/HomeSearchSection";
import { HomeFooter } from "~/components/Home/HomeFooter";
import { GithubBanner } from "~/components/Home/HomeGithubBanner";
import { commitSession, getSession } from "../services/toats.server";
import ToastPopover from "../components/UI/ToastPopover";
import { json, LoaderFunction, useLoaderData } from "remix";

type LoaderData = { errorMessage: string };

export async function loader({ request }: { request: Request }) {
  const cookie = request.headers.get("cookie");
  const session = await getSession(cookie);
  const errorMessage = session.get("errorMessage");
  if (!errorMessage) {
    return {};
  }

  return json(errorMessage.error, {
    headers: { "Set-Cookie": await commitSession(session) },
  });
}
export default function Index() {
  const data = useLoaderData<LoaderData>();

  return (
    <div className="overflow-x-hidden">
      {data.errorMessage && <ToastPopover message={data.errorMessage} />}
      <HomeHeader />
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
