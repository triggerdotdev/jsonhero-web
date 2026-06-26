import { hydrate } from "react-dom";
import { RemixBrowser } from "remix";
// Fathom analytics disabled for China deployment (cdn.usefathom.com is blocked/slow)
// Re-enable with self-hosted or China-region analytics when needed
// import { load } from "fathom-client";

hydrate(<RemixBrowser />, document);

// load("ROBFNTET", {
//   spa: "history",
//   excludedDomains: ["localhost"],
//   includedDomains: ["jsonhero.io"],
// });
