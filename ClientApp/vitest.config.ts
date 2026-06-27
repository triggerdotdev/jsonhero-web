import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "../app": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "src"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    snapshotFormat: {
      escapeString: true,
      printBasicPrototype: true,
    },
    snapshotSerializers: ["src/__tests__/snapshotSerializer.ts"],
    setupFiles: ["src/__tests__/setup.js"],
  },
});
