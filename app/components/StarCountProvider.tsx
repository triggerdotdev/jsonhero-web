import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export type StarCountType = number | undefined;

const StarCountContext = createContext<StarCountType>(undefined);

export function StarCountProvider({
  children,
  starCount,
}: {
  children: ReactNode;
  starCount: StarCountType;
}) {
  return (
    <StarCountContext.Provider value={starCount}>
      {children}
    </StarCountContext.Provider>
  );
}

export function useStarCount(): StarCountType {
  const context = useContext(StarCountContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a StarCountProvider");
  }
  return context;
}
