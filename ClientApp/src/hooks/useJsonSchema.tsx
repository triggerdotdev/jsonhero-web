import { Schema } from "@jsonhero/json-schema-fns";
import { inferSchema } from "@jsonhero/schema-infer";
import { createContext, ReactNode, useContext, useMemo } from "react";
import invariant from "tiny-invariant";
import { useJson } from "./useJson";

const JsonSchemaContext = createContext<Schema | undefined>(undefined);

export function JsonSchemaProvider({ children }: { children: ReactNode }) {
  const [json] = useJson();

  const jsonSchema = useMemo(
    () => inferSchema(json).toJSONSchema({ includeSchema: true }),
    [json]
  );

  return (
    <JsonSchemaContext.Provider value={jsonSchema}>
      {children}
    </JsonSchemaContext.Provider>
  );
}

export function useJsonSchema(): Schema {
  const context = useContext(JsonSchemaContext);

  invariant(context, "useJsonSchema must be used within a JsonSchemaProvider");

  return context;
}
