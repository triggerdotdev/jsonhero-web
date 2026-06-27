import { formatStarCount } from "../app/utilities/formatStarCount";

describe("formatStarCount", () => {
  test("formats the star count correctly", () => {
    expect(formatStarCount(undefined)).toBe("⭐️");
    expect(formatStarCount(0)).toBe("0");
    expect(formatStarCount(999)).toBe("999");
    expect(formatStarCount(1000)).toBe("1k");
    expect(formatStarCount(1050)).toBe("1.1k");
    expect(formatStarCount(1100)).toBe("1.1k");
    expect(formatStarCount(1200)).toBe("1.2k");
    expect(formatStarCount(1300)).toBe("1.3k");
    expect(formatStarCount(10000)).toBe("10k");
    expect(formatStarCount(10050)).toBe("10.1k");
    expect(formatStarCount(10100)).toBe("10.1k");
    expect(formatStarCount(10101)).toBe("10.1k");
    expect(formatStarCount(10199)).toBe("10.2k");
    expect(formatStarCount(10200)).toBe("10.2k");
    expect(formatStarCount(52678)).toBe("52.7k");
    expect(formatStarCount(99949)).toBe("99.9k");
    expect(formatStarCount(100000)).toBe("100k");
    expect(formatStarCount(100100)).toBe("100.1k");
    expect(formatStarCount(101100)).toBe("101.1k");
  });
});
