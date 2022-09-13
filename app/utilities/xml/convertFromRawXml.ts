const getCleanXmlString = (xmlString: any): string => {
  const cleanXmlString = xmlString
    .replace(/(\r\n|\n|\r)/gm, "") // remove line breaks
    .replace(/>\s+</g, "><"); // remove all whitespaces between tags
  return cleanXmlString;
};

const serializeXml = (node: any): any => {
  const children = [...node.childNodes].map((child) => serializeXml(child));
  const { nodeName, nodeType, nodeValue } = node;
  const attributes =
    node.attributes &&
    Array.from(node.attributes).reduce(
      (acc: any, attr: any) => ({ ...acc, [attr.name]: attr.value }),
      {}
    );

  // isText
  if (nodeType === 3) {
    return nodeValue;
  }

  let childObject: { [key: string]: any } = {};

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
        (acc: any, child: any) => ({ ...acc, ...child }),
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
  const parser = new DOMParser();
  const cleanXmlString = getCleanXmlString(xmlString);
  const xmlDoc = parser.parseFromString(cleanXmlString, "application/xml");

  const errorNode = xmlDoc.querySelector("parsererror");
  if (errorNode) {
    console.error(`XML parsing error, ${errorNode.textContent}`);
    throw errorNode.textContent;
  }

  const nodes = [...xmlDoc.childNodes];
  const serialized = nodes.map((node) => {
    return serializeXml(node);
  });

  return JSON.stringify(serialized);
}
