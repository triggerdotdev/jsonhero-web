import { createContext, ReactNode, useContext } from "react";
import invariant from "tiny-invariant";
import { JSONDocument } from "~/jsonDoc.server";

type JsonDocType = {
  doc: JSONDocument;
  path?: string;
  minimal?: boolean;
};

const JsonDocContext = createContext<JsonDocType | undefined>(undefined);

export function JsonDocProvider({
  children,
  doc,
  path,
  minimal,
}: {
  children: ReactNode;
  doc: JSONDocument;
  path?: string;
  minimal?: boolean;
}) {
  return (
    <JsonDocContext.Provider value={{ doc, path, minimal }}>
      {children}
    </JsonDocContext.Provider>
  );
}

export function useJsonDoc(): JsonDocType {
  const context = useContext(JsonDocContext);

  invariant(context, "useJsonDoc must be used within a JsonDocProvider");

  return context;
}
