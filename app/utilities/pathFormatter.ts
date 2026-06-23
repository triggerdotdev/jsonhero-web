import { JSONHeroPath, PathComponent } from "@jsonhero/path";

export type PathFormat = "jsonpath" | "js";

// The public PathComponent interface doesn't expose `keyName`, but every
// concrete component (SimpleKeyPathComponent, StartPathComponent, ...) does.
function keyNameOf(component: PathComponent): string {
  return (component as PathComponent & { keyName: string }).keyName;
}

const SAFE_IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

function quoteKey(key: string): string {
  const escaped = key.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `["${escaped}"]`;
}

/**
 * Formats a JSONHeroPath string (e.g. `$.data.0.user-name`) as either a
 * JSONPath expression or a JavaScript accessor.
 *
 * - jsonpath: `$.data[0]["user-name"]` (root -> `$`)
 * - js:       `data[0]["user-name"]`   (root -> ``)
 */
export function formatPath(path: string, format: PathFormat): string {
  const heroPath = new JSONHeroPath(path);

  // Drop the leading StartPathComponent (`$`).
  const components = heroPath.components.slice(1);

  let result = format === "jsonpath" ? "$" : "";

  components.forEach((component, index) => {
    const key = keyNameOf(component);

    if (component.isArray) {
      result += `[${key}]`;
      return;
    }

    if (!SAFE_IDENTIFIER.test(key)) {
      result += quoteKey(key);
      return;
    }

    // A safe identifier: use dot notation, except for the very first
    // component of a JS accessor, which has no leading dot.
    if (format === "js" && index === 0) {
      result += key;
    } else {
      result += `.${key}`;
    }
  });

  return result;
}
