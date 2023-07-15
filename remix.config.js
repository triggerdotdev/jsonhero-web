/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  publicPath: "/build/", // default value, can be removed
  serverBuildPath: "build/index.js", // default value, can be removed
  serverConditions: ["worker"],
  serverDependenciesToBundle: "all",
  serverMainFields: ["browser", "module", "main"],
  serverMinify: true,
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
};
