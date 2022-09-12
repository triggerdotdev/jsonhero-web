export default function isXML(possibleXml: string): boolean {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(possibleXml, "application/xml");
  // As per this latest documentation
  // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString
  // DOMParser.parseFromString() will not throw an error if the XML is invalid
  // there for this code below and not try/catch
  const errorNode = xmlDoc.querySelector("parsererror");
  if (errorNode) {
    console.error(`XML parsing error, ${errorNode.textContent}`);
    return false;
  }
  return true;
}
