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

export const meta: MetaFunction = () => {
  return { title: "JSON Hero - Browse, edit and share JSON" };
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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
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
