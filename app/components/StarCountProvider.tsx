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
  return useContext(StarCountContext);
}
