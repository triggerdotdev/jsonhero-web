import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { PreferencesProvider } from "~/components/PreferencesProvider";
import { StarCountProvider } from "~/components/StarCountProvider";
import { Theme, ThemeProvider, useTheme } from "~/components/ThemeProvider";
import Home from "~/routes/Home";
import JsonDocumentRoute from "~/routes/JsonDocumentRoute";
import JsonEditorRoute from "~/routes/j/id/Editor";
import JsonIndexRoute from "~/routes/j/id/Index";
import JsonTerminalRoute from "~/routes/j/id/Terminal";
import JsonTreeRoute from "~/routes/j/id/Tree";
import Privacy from "~/routes/Privacy";
import { getStarCount } from "~/services/api";

function AppChrome() {
  const [theme] = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  return (
    <div className={clsx(theme, "min-h-screen overscroll-none")}>
      <Outlet />
    </div>
  );
}

function RootProviders() {
  const location = useLocation();
  const [starCount, setStarCount] = useState<number>();
  const initialTheme = useMemo(() => getCookieTheme(), []);
  const queryTheme = useMemo(
    () => getQueryTheme(location.search),
    [location.search]
  );

  useEffect(() => {
    let cancelled = false;

    getStarCount()
      .then((count) => {
        if (!cancelled) {
          setStarCount(count);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setStarCount(undefined);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const forceDarkMode = location.pathname === "/";

  return (
    <ThemeProvider
      specifiedTheme={initialTheme}
      themeOverride={forceDarkMode ? "dark" : queryTheme}
    >
      <PreferencesProvider>
        <StarCountProvider starCount={starCount}>
          <AppChrome />
        </StarCountProvider>
      </PreferencesProvider>
    </ThemeProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <RootProviders />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/privacy", element: <Privacy /> },
      {
        path: "/j/:id",
        element: <JsonDocumentRoute />,
        children: [
          { index: true, element: <JsonIndexRoute /> },
          { path: "tree", element: <JsonTreeRoute /> },
          { path: "editor", element: <JsonEditorRoute /> },
          { path: "terminal", element: <JsonTerminalRoute /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function getCookieTheme(): Theme | undefined {
  if (typeof document === "undefined") {
    return undefined;
  }

  const theme = document.cookie
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith("theme="))
    ?.split("=")[1];

  return isTheme(theme) ? theme : undefined;
}

function getQueryTheme(search: string): Theme | undefined {
  const theme = new URLSearchParams(search).get("theme");
  return isTheme(theme) ? theme : undefined;
}

function isTheme(value: unknown): value is Theme {
  return value === "dark" || value === "light";
}
