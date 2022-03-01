/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverBuildTarget: "cloudflare-workers",
  serverBuildPath: "build/index.js",
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: [".*"],
};
