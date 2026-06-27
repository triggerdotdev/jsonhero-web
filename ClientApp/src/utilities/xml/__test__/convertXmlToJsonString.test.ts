import * as fs from "fs";
import { join } from "path";
import convertFromRawXml from "../convertFromRawXml";

const xmlString = fs.readFileSync(join(__dirname, "./xml.txt"), "utf8");

describe("convertFromRawXml", () => {
  test("Returns a string", () => {
    expect(typeof convertFromRawXml("<xml></xml>")).toBe("string");
    expect(typeof convertFromRawXml(xmlString)).toBe("string");
  });

  test("Returns a string that is valid JSON string", () => {
    expect(() => JSON.parse(convertFromRawXml("<xml></xml>"))).not.toThrow();
    expect(() => JSON.parse(convertFromRawXml(xmlString))).not.toThrow();
  });

  test("Throw error if invalid XML", () => {
    expect(() => convertFromRawXml("<xml></xml")).toThrow();
    expect(() => convertFromRawXml("")).toThrow();
    expect(() => convertFromRawXml("lol")).toThrow();
  });
});
