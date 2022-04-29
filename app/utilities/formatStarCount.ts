// Should truncate the number to not show the exact number of stars
// If over 1000, show 1k
// If between 1100 and 1199, show 1.1k
// If between 1200 and 1299, show 1.2k
// If between 1300 and 1399, show 1.3k
// If over 10000, show 10k
// if between 10100 and 10199, show 10.1k
// if between 10200 and 10299, show 10.2k
// if between 10300 and 10399, show 10.3k
// if between 11000 and 11099, show 11k
// if between 11100 and 11199, show 11.1k
// if over 100000, show 100k
// if between 100100 and 100199, show 100.1k
// if between 100200 and 100299, show 100.2k
export function formatStarCount(count: number | undefined): string {
  if (count === undefined) {
    return "⭐️";
  }

  if (count < 1000) {
    return count.toString();
  }
  if (count < 10000) {
    return `${Math.floor(count / 100) / 10}k`;
  }
  if (count < 100000) {
    return `${Math.floor(count / 100) / 10}k`;
  }
  if (count < 1000000) {
    return `${Math.floor(count / 100) / 10}k`;
  }
  return `${Math.floor(count / 100000)}k`;
}
