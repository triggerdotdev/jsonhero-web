import { RemixBrowser } from "@remix-run/react";
import { load } from "fathom-client";
import { hydrateRoot } from "react-dom/client";


hydrateRoot(document, <RemixBrowser/>)

load("ROBFNTET", {
  spa: "history",
  excludedDomains: ["localhost"],
  includedDomains: ["jsonhero.io"],
});
