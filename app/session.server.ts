import { createCookieSessionStorage } from "remix";

export const {getSession, commitSession, destroySession} =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      sameSite: "lax",
    },
  });