import { JSONHeroPath } from "@jsonhero/path";
import { useJsonSchema } from "~/hooks/useJsonSchema";
import { CodeViewer } from "./CodeViewer";

export function JsonSchemaViewer({ path }: { path: string }) {
  const schema = useJsonSchema();
  const schemaPath = schemaPathFromPath(path);
  const schemaJson = schemaPath.first(schema);

  return <CodeViewer code={JSON.stringify(schemaJson, null, 2)} lang="json" />;
}

function schemaPathFromPath(path: JSONHeroPath | string): JSONHeroPath {
  const heroPath = typeof path === "string" ? new JSONHeroPath(path) : path;

  if (heroPath.isRoot) {
    return heroPath;
  }

  return heroPath.components.slice(1).reduce((acc, component) => {
    if (component.isArray) {
      return acc.child("items");
    } else {
      return acc.child("properties").child(component.toString());
    }
  }, new JSONHeroPath("$"));
}
