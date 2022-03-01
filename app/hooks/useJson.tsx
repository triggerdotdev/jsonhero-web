import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import invariant from "tiny-invariant";
import { stableJson } from "~/utilities/stableJson";

type JsonContextType = [unknown, Dispatch<SetStateAction<unknown>>];

const JsonContext = createContext<JsonContextType | undefined>(undefined);

export function JsonProvider({
  children,
  initialJson,
}: {
  children: ReactNode;
  initialJson: unknown;
}) {
  const stablizedJson = useMemo(() => stableJson(initialJson), [initialJson]);

  const [json, setJson] = useState<unknown>(stablizedJson);

  return (
    <JsonContext.Provider value={[json, setJson]}>
      {children}
    </JsonContext.Provider>
  );
}

export function useJson(): JsonContextType {
  const context = useContext(JsonContext);

  invariant(context, "useJson must be used within a JsonProvider");

  return context;
}
