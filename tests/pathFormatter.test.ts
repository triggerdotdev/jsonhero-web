import { formatPath } from "../app/utilities/pathFormatter";

describe("formatPath", () => {
  describe("jsonpath", () => {
    it("returns $ for the root path", () => {
      expect(formatPath("$", "jsonpath")).toBe("$");
    });

    it("formats a single simple key with a dot", () => {
      expect(formatPath("$.name", "jsonpath")).toBe("$.name");
    });

    it("formats array indices with bracket notation", () => {
      expect(formatPath("$.data.0.name", "jsonpath")).toBe("$.data[0].name");
    });

    it("brackets and quotes keys that are not safe identifiers", () => {
      expect(formatPath("$.user-name", "jsonpath")).toBe('$["user-name"]');
    });

    it("handles consecutive array indices", () => {
      expect(formatPath("$.a.b.0.1", "jsonpath")).toBe("$.a.b[0][1]");
    });

    it("escapes embedded quotes and backslashes in bracketed keys", () => {
      // a key literally containing a double-quote
      expect(formatPath('$.a."b', "jsonpath")).toBe('$.a["\\"b"]');
    });
  });

  describe("js accessor", () => {
    it("returns an empty string for the root path", () => {
      expect(formatPath("$", "js")).toBe("");
    });

    it("drops the leading $ and uses no leading dot for the first key", () => {
      expect(formatPath("$.name", "js")).toBe("name");
    });

    it("formats nested keys and array indices", () => {
      expect(formatPath("$.data.0.name", "js")).toBe("data[0].name");
    });

    it("uses bracket notation for unsafe keys, even when first", () => {
      expect(formatPath("$.user-name", "js")).toBe('["user-name"]');
    });

    it("uses bracket notation for an unsafe key after a simple key", () => {
      expect(formatPath("$.data.user-name", "js")).toBe('data["user-name"]');
    });

    it("treats a leading array index as bracket notation", () => {
      expect(formatPath("$.0.name", "js")).toBe("[0].name");
    });
  });
});
