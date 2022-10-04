import { HomeCollaborateSection } from "~/components/Home/HomeCollaborateSection";
import { HomeEdgeCasesSection } from "~/components/Home/HomeEdgeCasesSection";
import { HomeFeatureGridSection } from "~/components/Home/HomeFeatureGridSection";
import { HomeHeader } from "~/components/Home/HomeHeader";
import { HomeHeroSection } from "~/components/Home/HomeHeroSection";
import { HomeInfoBoxSection } from "~/components/Home/HomeInfoBoxSection";
import { HomeSearchSection } from "~/components/Home/HomeSearchSection";
import { HomeFooter } from "~/components/Home/HomeFooter";
import { HomeApiHeroBanner } from "~/components/Home/HomeApiHeroBanner";
import { json, LoaderFunction, useLoaderData } from "remix";
import { commitSession, getSession } from "~/session.server";
import { uuid } from "~/utilities/uuid";

export interface JsonFormResponse {
  key: string;
  malformedError?: boolean;
}

export const loader: LoaderFunction = async ({request}) => {
  const session = await getSession(request.headers.get("Cookie"));
  const response: JsonFormResponse = {key: uuid(), malformedError: session.get("malformedError") ?? false}
  return json(response, {headers: {"Set-Cookie": await commitSession(session)}});
};

export default function Index() {
  const formResponse = useLoaderData<JsonFormResponse>();
  return (
    <div className="overflow-x-hidden">
      <HomeHeader fixed={true}/>
      <HomeHeroSection formResponse={formResponse}/>
      <HomeApiHeroBanner/>
      <HomeInfoBoxSection/>
      <HomeEdgeCasesSection/>
      <HomeSearchSection/>
      <HomeCollaborateSection/>
      <HomeFeatureGridSection/>
      <HomeFooter/>
    </div>
  );
}
