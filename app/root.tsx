import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "remix";
import type { MetaFunction } from "remix";
import clsx from "clsx";
import {
  NonFlashOfWrongThemeEls,
  Theme,
  ThemeProvider,
  useTheme,
} from "~/components/ThemeProvider";

export const meta: MetaFunction = ({ location }) => {
  const description =
    "JSON Hero makes reading and understand JSON files easy by giving you a clean and beautiful UI packed with extra features.";
  return {
    title: "JSON Hero - A beautiful JSON viewer",
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
    description,
    "og:image": `https://jsonhero.io/images/opengraph.png`,
    "og:url": `https://jsonhero.io${location.pathname}`,
    "og:title": "JSON Hero - A beautiful JSON viewer",
    "og:description": description,
    "twitter:image": "https://jsonhero.io/images/opengraph.png",
    "twitter:card": "summary_large_image",
    "twitter:creator": "@json_hero",
    "twitter:site": "@json_hero",
    "twitter:title": "JSON Hero",
    "twitter:description": description,
  };
};

import styles from "./tailwind.css";
import { getThemeSession } from "./theme.server";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export type LoaderData = {
  theme?: Theme;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  const data: LoaderData = {
    theme: themeSession.getTheme(),
  };

  return data;
};

function App() {
  const [theme] = useTheme();

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(theme)} />
      </head>
      <body className="overscroll-none">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const { theme } = useLoaderData<LoaderData>();

  const location = useLocation();

  // Force dark mode on the homepage
  const forceDarkMode = location.pathname === "/";

  return (
    <ThemeProvider
      specifiedTheme={theme}
      themeOverride={forceDarkMode ? "dark" : undefined}
    >
      <App />
    </ThemeProvider>
  );
}
