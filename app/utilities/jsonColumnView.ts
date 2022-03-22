import {
  CubeIcon,
  CollectionIcon,
  EyeOffIcon,
  CheckCircleIcon,
  AnnotationIcon,
  CalendarIcon,
  AtSymbolIcon,
  GlobeAltIcon,
  PhotographIcon,
  CodeIcon,
  PhoneIcon,
  DocumentIcon,
  ColorSwatchIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  ClockIcon,
  GlobeIcon,
  EmojiHappyIcon,
  ChatAlt2Icon,
  ArchiveIcon,
  IdentificationIcon,
  KeyIcon,
  DocumentTextIcon,
  HashtagIcon,
} from "@heroicons/react/outline";
import { inferType, JSONValueType } from "@jsonhero/json-infer-types";
import { JSONHeroPath, PathComponent } from "@jsonhero/path";
import { ArrayIcon } from "~/components/Icons/ArrayIcon";
import { ObjectIcon } from "~/components/Icons/ObjectIcon";
import { StringIcon } from "~/components/Icons/StringIcon";
import { ColumnViewNode, IconComponent } from "~/useColumnView";
import { formatValue } from "./formatter";

export function generateColumnViewNode(json: unknown): ColumnViewNode {
  const info = inferType(json);
  const path = new JSONHeroPath("$");
  const children = generateChildren(info, path);

  return {
    name: "root",
    title: "root",
    id: "$",
    icon: iconForType(info),
    children,
  };
}

function generateChildren(
  info: JSONValueType,
  path: JSONHeroPath
): Array<ColumnViewNode> {
  if (info.name === "array" && info.value) {
    return info.value.map((value, index) => {
      const childPath = path.child(index.toString());
      const childInfo = inferType(value);
      const children = generateChildren(childInfo, childPath);

      return {
        id: childPath.toString(),
        name: index.toString(),
        title: index.toString(),
        longTitle: `Index ${index.toString()}`,
        subtitle: formatValue(childInfo),
        icon: iconForType(childInfo),
        children,
      };
    });
  }

  if (info.name === "object" && info.value) {
    return Object.entries(info.value).map(([key, value]) => {
      const childPath = path.child(key);
      const childInfo = inferType(value);
      const children = generateChildren(childInfo, childPath);

      return {
        id: childPath.toString(),
        name: key,
        title: key,
        subtitle: formatValue(childInfo),
        icon: iconForType(childInfo),
        children,
      };
    });
  }

  return [];
}

export function generateNodesToPath(
  json: unknown,
  path: string
): Array<ColumnViewNode> {
  const heroPath = new JSONHeroPath(path);

  const currentPathComponents: Array<PathComponent> = [];

  const nodes: Array<ColumnViewNode> = [];

  for (const component of heroPath.components) {
    currentPathComponents.push(component);

    const currentPath = new JSONHeroPath(currentPathComponents);

    const info = inferType(currentPath.first(json));

    const componentName = component.toString();

    nodes.push({
      name: componentName,
      title: componentName === "$" ? "root" : componentName,
      id: currentPath.toString(),
      icon: iconForType(info),
      children: [],
    });
  }

  return nodes;
}

export function iconForType(type: JSONValueType): IconComponent {
  switch (type.name) {
    case "object": {
      return CubeIcon;
    }
    case "array": {
      return CollectionIcon;
    }
    case "null": {
      return EyeOffIcon;
    }
    case "bool": {
      return CheckCircleIcon;
    }
    case "int":
    case "float": {
      return HashtagIcon;
    }
    case "string": {
      if (type.format == null) {
        return StringIcon;
      }

      switch (type.format.name) {
        case "timestamp": {
          return CalendarIcon;
        }
        case "datetime": {
          switch (type.format.parts) {
            case "time":
              return ClockIcon;
          }
          return ClockIcon;
        }
        case "email": {
          return AtSymbolIcon;
        }
        case "hostname":
        case "tld":
        case "ip":
          return GlobeAltIcon;
        case "uri": {
          switch (type.format.contentType) {
            case "image/jpeg":
            case "image/png":
            case "image/gif":
            case "image/webm":
              return PhotographIcon;
            case "application/json":
              return CodeIcon;
            default:
              return GlobeAltIcon;
          }
        }
        case "phoneNumber": {
          return PhoneIcon;
        }
        case "currency": {
          return CurrencyDollarIcon;
        }
        case "country": {
          return GlobeIcon;
        }
        case "emoji": {
          return EmojiHappyIcon;
        }
        case "color": {
          return ColorSwatchIcon;
        }
        case "language": {
          return ChatAlt2Icon;
        }
        case "filesize": {
          return ArchiveIcon;
        }
        case "uuid": {
          return IdentificationIcon;
        }
        case "json":
        case "jsonPointer": {
          return CodeIcon;
        }
        case "jwt": {
          return KeyIcon;
        }
        case "semver": {
          return DocumentTextIcon;
        }
        case "creditcard": {
          switch (type.format.variant) {
            case "visa": {
              return CreditCardIcon;
            }
            case "mastercard": {
              return CreditCardIcon;
            }
            case "amex": {
              return CreditCardIcon;
            }
            case "discover": {
              return CreditCardIcon;
            }
            case "dinersclub": {
              return CreditCardIcon;
            }
            default: {
              return CreditCardIcon;
            }
          }
        }
        default: {
          return AnnotationIcon;
        }
      }
    }
    default: {
      return DocumentIcon;
    }
  }
}

export function firstChildToDescendant(
  ancestor: JSONHeroPath,
  descendant: JSONHeroPath
): string | undefined {
  const ancestorPathComponents = ancestor.components.map((component) =>
    component.toString()
  );
  const descendantPathComponents = descendant.components.map((component) =>
    component.toString()
  );

  const pathComponents = [];

  for (let index = 0; index < descendantPathComponents.length; index++) {
    const descendantPathComponent = descendantPathComponents[index];

    if (ancestorPathComponents.length >= index) {
      pathComponents.push(descendantPathComponent);
    }
  }

  return pathComponents.join(".");
}

export function pathToDescendant(
  ancestor: string,
  descendant: string
): string | undefined {
  const ancestorPath = new JSONHeroPath(ancestor);
  const descendantPath = new JSONHeroPath(descendant);

  const ancestorPathComponents = ancestorPath.components.map((component) =>
    component.toString()
  );
  const descendantPathComponents = descendantPath.components.map((component) =>
    component.toString()
  );

  const pathComponents = [];

  for (let index = 0; index < descendantPathComponents.length; index++) {
    const descendantPathComponent = descendantPathComponents[index];

    if (ancestorPathComponents.length <= index) {
      pathComponents.push(descendantPathComponent);
    }
  }

  return pathComponents.join(".");
}

//Given the previous path and where the selection is, we calculate the new path
//This allows us to keep the deepest item possible still visible whilst navigating around
export function calculateStablePath(
  previousPathString: string,
  selectionPathString: string,
  json: unknown
): string {
  const previousPath = new JSONHeroPath(previousPathString);
  const selectionPath = new JSONHeroPath(selectionPathString);

  //if we are selecting at the right edge then the selection determines the path
  if (selectionPath.components.length >= previousPath.components.length) {
    return selectionPathString;
  }

  //if the selection is the same as the path from the start up to selection end then we leave the path as is
  const previousPathWithSelectionLength = new JSONHeroPath(
    previousPath.components.slice(0, selectionPath.components.length)
  );
  if (selectionPathString === previousPathWithSelectionLength.toString()) {
    return previousPathString;
  }

  //from the start we add the selection components until they don't match the previous path (this should be until the last one)
  let newComponents: PathComponent[] = [];
  for (let index = 0; index < selectionPath.components.length; index++) {
    const selectionComponent = selectionPath.components[index];
    const previousComponent = previousPath.components[index];

    //if they're different we need to bail and try build an alternative path
    if (selectionComponent.toString() !== previousComponent.toString()) {
      break;
    }

    newComponents.push(selectionComponent);
  }

  //we substitute all the remaining elements from the selection into the previousPath
  const remainingSelectionComponents = selectionPath.components.slice(
    newComponents.length
  );
  const remainingPreviousPathComponents = previousPath.components.slice(
    selectionPath.components.length
  );
  const updatedPathComponents = [
    ...newComponents,
    ...remainingSelectionComponents,
    ...remainingPreviousPathComponents,
  ];
  const updatedPath = new JSONHeroPath(updatedPathComponents);

  const jsonAtUpdatedPath = updatedPath.first(json);

  //not a match then we return the selection path
  if (!jsonAtUpdatedPath) {
    return selectionPathString;
  } else {
    return updatedPath.toString();
  }
}
