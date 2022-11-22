import { createFetchProxy } from "@apihero/fetch";

export const fetchProxy =
  typeof APIHERO_PROJECT_KEY === "string"
    ? createFetchProxy({
        projectKey: APIHERO_PROJECT_KEY,
        env: process.env.NODE_ENV,
      })
    : fetch;
