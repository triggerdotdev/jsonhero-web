import { LoaderFunction } from "@remix-run/server-runtime";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import type { MetaFunction } from "@remix-run/react";
import clsx from "clsx";
import {
  NonFlashOfWrongThemeEls,
  Theme,
  ThemeProvider,
  useTheme,
} from "~/components/ThemeProvider";

import openGraphImage from "~/assets/images/opengraph.png";

export const meta: MetaFunction = ({ location }) => {
  const description =
    "JSON Hero makes reading and understand JSON files easy by giving you a clean and beautiful UI packed with extra features.";
  return [
    { title: "JSON Hero - a beautiful JSON viewer for the web" },
    { viewport: "width=device-width,initial-scale=1" },
    { name: "description", content: description },
    { property: "og:image", content: `https://jsonhero.io${openGraphImage}` },
    { property: "og:url", content: `https://jsonhero.io${location.pathname}` },
    { property: "og:title", content: "JSON Hero - A beautiful JSON viewer" },
    { property: "og:description", content: description },
    {
      property: "twitter:image",
      content: `https://jsonhero.io${openGraphImage}`,
    },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:creator", content: "@json_hero" },
    { property: "twitter:site", content: "@json_hero" },
    { property: "twitter:title", content: "JSON Hero" },
    { property: "twitter:description", content: description },
  ];
};

import styles from "./tailwind.css?url";
import { getThemeSession } from "./theme.server";
import { getStarCount } from "./services/github.server";
import { StarCountProvider } from "./components/StarCountProvider";
import { PreferencesProvider } from "~/components/PreferencesProvider";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export type LoaderData = {
  theme?: Theme;
  starCount?: number;
  themeOverride?: Theme;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const starCount = await getStarCount();
  const themeOverride = getThemeFromRequest(request);

  const data: LoaderData = {
    theme: themeSession.getTheme(),
    starCount,
    themeOverride,
  };

  return data;
};

function getThemeFromRequest(request: Request): Theme | undefined {
  const url = new URL(request.url);
  const theme = url.searchParams.get("theme");
  if (theme) {
    return theme as Theme;
  }
  return undefined;
}

function App() {
  const [theme] = useTheme();

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(theme)} />
      </head>
      <body className="overscroll-none">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const { theme, starCount, themeOverride } = useLoaderData<LoaderData>();

  const location = useLocation();

  // Force dark mode on the homepage
  const forceDarkMode = location.pathname === "/";

  return (
    <ThemeProvider
      specifiedTheme={theme}
      themeOverride={forceDarkMode ? "dark" : themeOverride}
    >
      <PreferencesProvider>
        <StarCountProvider starCount={starCount}>
          <App />
        </StarCountProvider>
      </PreferencesProvider>
    </ThemeProvider>
  );
}
