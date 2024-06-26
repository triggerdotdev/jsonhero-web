import mdx from "@mdx-js/rollup";
import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
// import { installGlobals } from "@remix-run/node";
import tsconfigPaths from "vite-tsconfig-paths";

// installGlobals();

/** @type {import('vite').UserConfig} */
export default defineConfig({
  build: {
    // target: "esnext",
    // rollupOptions: {
    //   external: ["~/components/Home/HomeHeader"],
    // },
  },
  server: {
    port: 8787,
  },
  plugins: [
    remixCloudflareDevProxy(),
    mdx(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
});
