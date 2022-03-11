import { JSONHeroPath } from "@jsonhero/path";
import { useState } from "react";
import { useJsonSchema } from "~/hooks/useJsonSchema";
import { CodeViewer } from "./CodeViewer";
import { CopyTextButton } from "./CopyTextButton";

export function JsonSchemaViewer({ path }: { path: string }) {
  const schema = useJsonSchema();
  const schemaPath = schemaPathFromPath(path);
  const schemaJson = schemaPath.first(schema);
  const [hovering, setHovering] = useState(false);
  const code = JSON.stringify(schemaJson, null, 2);

  return (
    <div
      className="relative w-full h-full"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <CodeViewer code={code} lang="json" />
      <div
        className={`absolute top-1 right-0 flex justify-end w-full transition ${
          hovering ? "opacity-100" : "opacity-0"
        }`}
      >
        <CopyTextButton
          value={code}
          className="bg-slate-200 hover:bg-slate-300 h-fit mr-1 px-2 py-0.5 rounded-sm transition hover:cursor-pointer dark:text-white dark:bg-slate-700 dark:hover:bg-slate-600"
        ></CopyTextButton>
      </div>
    </div>
  );
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
