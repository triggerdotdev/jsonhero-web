import { JSONValueType } from "@jsonhero/json-infer-types";

export interface HierarchicalTypes {
  types: string[];
}

export function concatenated(types: HierarchicalTypes): string {
  return types.types.join("/");
}

export function getHierarchicalTypes(type: JSONValueType): HierarchicalTypes {
  let types: string[] = [];
  types.push(type.name);

  switch (type.name) {
    case "string": {
      if (type.format == null) {
        break;
      }

      types.push(type.format.name);

      switch (type.format.name) {
        case "uri": {
          if (type.format.contentType == null) {
            break;
          }

          types.push(type.format.contentType);
          break;
        }
        case "datetime": {
          types.push(type.format.variant);
          break;
        }
        case "ip": {
          types.push(type.format.variant);
          break;
        }
      }
      break;
    }
    case "int": {
      if (type.format == null) {
        break;
      }

      types.push(type.format.name);
    }
  }
  return {
    types: types,
  };
}
