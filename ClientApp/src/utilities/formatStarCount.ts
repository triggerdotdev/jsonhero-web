// Should truncate the number to not show the exact number of stars
// If over 1000, show 1k
// Round up to the nearest hundred, so for example, 1150 becomes 1.2k, 1101 becomes 1.1k, etc.
export function formatStarCount(count: number | undefined): string {
  if (count === undefined) {
    return "⭐️";
  }

  if (count < 1000) {
    return count.toString();
  }

  return `${roundWithPrecision(count / 1000, 1)}k`;
}

function roundWithPrecision(value: number, precision: number): number {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}
