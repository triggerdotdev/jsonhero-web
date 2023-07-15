import { hydrate } from "react-dom";
import { RemixBrowser } from "@remix-run/react";
import { load } from "fathom-client";

hydrate(<RemixBrowser />, document);

load("ROBFNTET", {
  spa: "history",
  excludedDomains: ["localhost"],
  includedDomains: ["jsonhero.io"],
});
