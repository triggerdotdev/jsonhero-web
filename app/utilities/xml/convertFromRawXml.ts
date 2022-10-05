import { DOMParser } from "@xmldom/xmldom";

export type SerializedXMLObject = {
  [key: string]: [] | string | {} | undefined;
  $attributes?: { [key: string]: any };
  $values?: [] | { [key: string]: any };
};

const getCleanXmlString = (xmlString: string): string => {
  const cleanXmlString = xmlString
    .replace(/(\r\n|\n|\r)/gm, "") // remove line breaks
    .replace(/>\s+</g, "><"); // remove all whitespaces between tags
  return cleanXmlString;
};

const serializeXml = (
  node: ChildNode & { attributes?: NamedNodeMap }
): SerializedXMLObject | string | undefined => {
  const { nodeName, nodeType, nodeValue } = node;

  // text
  if (nodeType === 3) {
    return nodeValue || undefined;
  }

  // comment, ignore
  if (nodeType === 8) {
    return undefined;
  }

  const children = Array.from(node.childNodes).map((child) =>
    serializeXml(child)
  );

  const attributes =
    node.attributes &&
    Array.from(node.attributes).reduce(
      (acc: {}, attr: any) => ({ ...acc, [attr.name]: attr.value }),
      {}
    );

  let childObject: any = {};

  if (children.length === 1 && typeof children[0] === "string") {
    childObject[nodeName] = children[0];
  } else {
    childObject[nodeName] = {};

    // childenUniqueKeys check if children should be processed as array
    // or should be added as properties of parent object.
    // e.g: In [{ name: 'foo' }, { name: 'bar' }],
    // children bear the same "name" key, so parent object will look like:
    //
    // parent: {
    //   $values: [
    //     { name: 'foo' },
    //     { name: 'bar' }
    //   ],
    //   $attributes: { ... }
    // }
    //
    // In [{ name: 'foo' }, { age: 10 }],
    // children have different keys and will be merged into parent object:
    // parent: { name: 'foo', age: 10 }
    const childenUniqueKeys = new Set(
      children.map((child: any) => Object.keys(child)[0])
    );

    if (childenUniqueKeys.size === children.length) {
      childObject[nodeName] = children.reduce(
        (acc: {}, child: any) => ({ ...acc, ...child }),
        {}
      );
    } else {
      childObject[nodeName].$values = children;
    }
  }

  if (attributes && Object.keys(attributes).length) {
    childObject[nodeName].$attributes = attributes;
  }

  return childObject;
};

export default function convertFromRawXml(xmlString: string): string {
  const cleanXmlString = getCleanXmlString(xmlString);

  // Read comment in isXML.ts for why we need to handle error this way
  const xmlDoc = new DOMParser({
    errorHandler: {
      warning: () => {},
      error: () => {
        throw new Error("Invalid XML");
      },
      fatalError: () => {
        throw new Error("Invalid XML");
      },
    },
  }).parseFromString(cleanXmlString, "application/xml");

  // This line is necessary because xmldom does not throw an error
  // if we pass it a plain string.
  if (!xmlDoc?.documentElement) throw new Error("Invalid XML");

  const nodes = Array.from(xmlDoc.childNodes);
  const serialized = nodes.map((node) => {
    return serializeXml(node);
  });

  return JSON.stringify(serialized);
}
