import { DOMParser } from "@xmldom/xmldom";

export default function isXML(possibleXml: string): boolean {
  let isValid = true;

  // https://www.npmjs.com/package/xmldom
  // xmldom handles invalid XML gracefully, so we need to check for errors
  // in this way, rather than relying on the return value of parseFromString
  // as recommended in this documentation::
  // https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString#error_handling

  const xmlDoc = new DOMParser({
    errorHandler: {
      warning: () => {},
      error: () => {
        isValid = false;
      },
      fatalError: () => {
        isValid = false;
      },
    },
  }).parseFromString(possibleXml, "application/xml");

  // This line is necessary because xmldom does not throw an error
  // if we pass it a plain string.
  if (!xmlDoc?.documentElement) isValid = false;

  return isValid;
}
