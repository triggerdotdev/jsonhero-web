import * as pkg from "@apihero/fetch";
// const { createFetchProxy } = pkg;

export const fetchProxy =
  typeof APIHERO_PROJECT_KEY === "string"
    ? pkg.createFetchProxy({
        projectKey: APIHERO_PROJECT_KEY,
        env: process.env.NODE_ENV,
      })
    : fetch;
