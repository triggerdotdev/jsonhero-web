import * as fs from "fs";
import { join } from "path";
import isXML from "../isXML";

const xmlString = fs.readFileSync(join(__dirname, "./xml.txt"), "utf8");

describe("isXML", () => {
  test("returns true for valid XML", () => {
    expect(isXML("<xml></xml>")).toBe(true);
    expect(isXML("<whatever>Content</whatever>")).toBe(true);
    expect(isXML(xmlString)).toBe(true);
  });
  test("returns false for invalid XML", () => {
    expect(isXML("<xml></xml")).toBe(false);
    expect(isXML("lol")).toBe(false);
    expect(isXML("")).toBe(false);
  });
});
