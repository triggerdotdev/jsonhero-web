import { createCookieSessionStorage } from "remix";

import { Theme, isTheme } from "~/components/ThemeProvider";

const DEV_SECRET = "abc123";
const sessionSecret =
  typeof process !== "undefined"
    ? process.env.SESSION_SECRET ?? DEV_SECRET
    : DEV_SECRET;

// const sessionSecret = SESSION_SECRET;

// if (!sessionSecret) {
//   throw new Error("SESSION_SECRET must be set");
// }

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "theme-cookie",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      const themeValue = session.get("theme");
      return isTheme(themeValue) ? themeValue : "light";
    },
    setTheme: (theme: Theme) => session.set("theme", theme),
    commit: () => themeStorage.commitSession(session),
  };
}

export { getThemeSession };
