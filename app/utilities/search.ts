import { Array, Dict } from "@swan-io/boxed";
import { groupBy, uniq } from "lodash-es";

type StringSlice = {
  isMatch: boolean;
  slice: string;
};

// getStringSlices should scope to the largest match
// For example, if the windowSize is 56 and the stringValue is "This is a very long string and the largest matched range is outside of the window, so we should try and get only slices of the string that focus on the largest match"
// and the matches are [{ start: 10, end: 16 }, { start: 80, end: 91 }, { start: 100, end: 106 }]
// then we should return slices:
// [
//   { isMatch: false, slice: "…" }
//   { isMatch: false, slice: "the string," },
//   { isMatch: true, slice: ", we should" },
//   { isMatch: false, slice: "d only retu" },
//   { isMatch: true, slice: "urn sl" },
//   { isMatch: false, slice: "lices that are within" },
//   { isMatch: false, slice: "…" },
//
// If stringValue length is less than the windowSize, then we should return all the string slices of the string
export function getStringSlices(
  stringValue: string,
  matchingIndices: ReadonlyArray<{ start: number; end: number }>,
  windowSize: number
): Array<StringSlice> {
  const slices: StringSlice[] = [];

  const addSlice = (isMatch: boolean, slice: string) => {
    if (slice.length > 0) {
      slices.push({ isMatch, slice });
    }
  };

  const addEllipsis = () => {
    addSlice(false, "…");
  };

  const calculateWindow = (): { start: number; end: number } => {
    if (stringValue.length <= windowSize) {
      return { start: 0, end: stringValue.length };
    }

    const largestMatch = matchingIndices.reduce(
      (largestMatch, match) => {
        if (match.end - match.start > largestMatch.end - largestMatch.start) {
          return match;
        }

        return largestMatch;
      },
      { start: 0, end: 0 }
    );

    const largestMatchLength = largestMatch.end - largestMatch.start;

    const start =
      largestMatch.start - Math.floor(windowSize / 2 - largestMatchLength / 2);
    const end =
      largestMatch.end + Math.floor(windowSize / 2 - largestMatchLength / 2);

    return {
      start: Math.max(start, 0),
      end: Math.min(end, stringValue.length),
    };
  };

  const window = calculateWindow();

  let currentIndex = window.start;

  if (window.start > 0) {
    addEllipsis();
  }

  for (const { start, end } of matchingIndices) {
    if (start < window.start && end < window.start) {
      continue;
    } else if (start > window.end) {
      continue;
    } else if (start < window.start && end > window.start) {
      addSlice(true, stringValue.slice(window.start, end));

      currentIndex = end;
    } else if (start >= window.start && end <= window.end) {
      if (start > 0) {
        addSlice(false, stringValue.slice(currentIndex, start));
      }
      addSlice(true, stringValue.slice(start, end));
      currentIndex = end;
    }
  }

  addSlice(false, stringValue.slice(currentIndex, window.end).trimEnd());

  if (window.end < stringValue.length) {
    addEllipsis();
  }

  return slices;
}

type EllispisSlice = {
  type: "ellipsis";
};

type ComponentSlice = {
  type: "component";
  componentIndex: number;
  slice: StringSlice;
};

type JoinSlice = {
  type: "join";
};

export type PathSlice = EllispisSlice | ComponentSlice | JoinSlice;

// getComponentSlices returns slices that are either ellipsis or component
// and the component slices are the slices of the component string that, depending on the matchingIndices
//
// If the "weight" of the path is more than the window size, then we need to "hide" some of the component strings behind an ellipsis
// But the hidden components shouldn't be ones that are matched, sorted by the largest match first.
//
// The "weight" of the path is calculated by summing the length of the component strings + (8 * the number of components)
//
// Ellipsis is a special case where the weight is 2
//
// Example:
// path = records.0.users.9.addresses.0.street_address.street_name
// maxWeight = 60
// matchingIndices = [ { start: 0, end: 2 }, { start: 11, end: 15 }, { start: 30, end: 36 }, { start: 45, end: 51 } ]
//
// Weight Calculation:
//  records = 7
//  . = 8
//  0 = 1
//  . = 8
//  users = 5
//  . = 8
//  9 = 1
//  . = 8
//  addresses = 9
//  . = 8
//  0 = 1
//  . = 8
//  street_address = 14
//  . = 8
//  street_name = 11
//
// Total Weight: 7 + 8 + 1 + 8 + 5 + 8 + 1 + 8 + 9 + 8 + 1 + 8 + 14 + 8 + 11 = 105
//
//
// To get below the maxWeight, we need to hide the components that are not the largest match
//
// Using the example from above, the result should be:
// records = 7
// . = 8
// … = 2
// . = 8
//  street_address = 14
//  . = 8
//  street_name = 11
//
// Total Weight: 7 + 8 + 2 + 8 + 14 + 8 + 11 = 58
//
// So the result from getComponentSlices for the above example should be:
// [
//   { type: "component", slice: { isMatch: true, slice: "re" } },
//   { type: "component", slice: { isMatch: false, slice: "cords" } },
//   { type: "join" },
//   { type: "ellipsis" },
//   { type: "join" },
//   { type: "component", slice: { isMatch: true, slice: "street" } },
//   { type: "component", slice: { isMatch: false, slice: "_address" } },
//   { type: "join" },
//   { type: "component", slice: { isMatch: true, slice: "street" } },
//   { type: "component", slice: { isMatch: false, slice: "_name" } },
// ]
//
// Some rules:
// 1. We never have more than one ellipsis
// 2. We never hide the first component behind an ellipsis
// 3. We try to get the final weight to be as close to the maxWeight as possible
//
export function getComponentSlices(
  path: string,
  matchingIndices: ReadonlyArray<{ start: number; end: number }>,
  maxWeight: number
): Array<PathSlice> {
  const calculateWeight = (pathSlices: PathSlice[]): number => {
    let weight = 0;

    for (const slice of pathSlices) {
      weight += calculateSliceWeight(slice);
    }

    return weight;
  };

  const calculateSliceWeight = (slice: PathSlice): number => {
    if (slice.type === "component") {
      return slice.slice.slice.length;
    } else if (slice.type === "ellipsis") {
      return 2;
    } else {
      return 8;
    }
  };

  const calculateLongestMatch = (componentSlices: ComponentSlice[]): number => {
    return componentSlices.reduce(
      (longestMatch, slice) =>
        slice.slice.isMatch
          ? Math.max(longestMatch, slice.slice.slice.length)
          : longestMatch,
      0
    );
  };

  const addEllipsisToSlices = (
    slices: PathSlice[],
    mostImportantComponentIndex: number
  ): PathSlice[] => {
    // This should take an array of slices like this:
    // [
    //   { type: "component", slice: { isMatch: true, slice: "re" } },
    //   { type: "component", slice: { isMatch: false, slice: "cords" } },
    //   { type: "join" },
    //   { type: "ellipsis" },
    //   { type: "join" },
    //   { type: "ellipsis" },
    //   { type: "ellipsis" },
    //   { type: "join" },
    //   { type: "component", slice: { isMatch: true, slice: "street" } },
    //   { type: "component", slice: { isMatch: false, slice: "_address" } },
    // ]
    //
    //
    // And should return this:
    // [
    //   { type: "component", slice: { isMatch: true, slice: "re" } },
    //   { type: "component", slice: { isMatch: false, slice: "cords" } },
    //   { type: "join" },
    //   { type: "ellipsis" },
    //   { type: "join" },
    //   { type: "component", slice: { isMatch: true, slice: "street" } },
    //   { type: "component", slice: { isMatch: false, slice: "_address" } },
    // ]
    const combineAdjacentEllipsis = (toCombine: PathSlice[]): PathSlice[] => {
      const combined: PathSlice[] = [];
      let inEllipsis = false;

      for (let i = 0; i < toCombine.length; i++) {
        const slice = toCombine[i];

        if (slice.type === "ellipsis") {
          if (!inEllipsis) {
            inEllipsis = true;
            combined.push(slice);
          }
        }

        if (slice.type === "join") {
          if (!inEllipsis) {
            combined.push(slice);
          }
        }

        if (slice.type === "component") {
          if (inEllipsis) {
            combined.push({ type: "join" });
            inEllipsis = false;
          }
          combined.push(slice);
        }
      }

      return combined;
    };

    const replaceComponentIndexWithEllipsis = (
      ellipsisComponentIndex: number
    ): PathSlice[] => {
      const ellipsisSliceIndices = slices
        .map((slice, index) => [slice, index] as [PathSlice, number])
        .filter(
          ([slice, index]) =>
            slice.type === "component" &&
            slice.componentIndex === ellipsisComponentIndex
        )
        .map(([, index]) => index);

      const newEllipsis = slices.map((slice, index) => {
        if (ellipsisSliceIndices.includes(index)) {
          return {
            type: "ellipsis",
          };
        } else {
          return slice;
        }
      }) as PathSlice[];

      return combineAdjacentEllipsis(newEllipsis);
    };

    const componentSlices = Array.keepMap(slices, (slice) =>
      slice.type === "component" ? slice : null
    );

    const componentIndexes = uniq(
      componentSlices.map((slice) => slice.componentIndex)
    );

    const ellipsisIndex = slices.findIndex(
      (slice) => slice.type === "ellipsis"
    );

    if (ellipsisIndex === -1) {
      let ellipsisComponentIndex = 0;
      // There are no ellipsis yet, so we need to figure out where to put the first one
      if (mostImportantComponentIndex === 0) {
        ellipsisComponentIndex = componentIndexes[componentIndexes.length - 2];
      } else if (mostImportantComponentIndex === componentIndexes.length - 1) {
        ellipsisComponentIndex = componentIndexes[1];
      } else {
        const halfWay = Math.floor(componentIndexes.length / 2);

        if (mostImportantComponentIndex < halfWay) {
          ellipsisComponentIndex = componentIndexes[halfWay + 1];
        }

        if (mostImportantComponentIndex > halfWay) {
          ellipsisComponentIndex = componentIndexes[halfWay - 1];
        }

        if (mostImportantComponentIndex === halfWay) {
          ellipsisComponentIndex = componentIndexes[1];
        }
      }

      return replaceComponentIndexWithEllipsis(ellipsisComponentIndex);
    } else {
      // Add to the existing ellipsis
      // Get nearest component index to the ellipsis, before and after
      const nearestBefore = Array.keepMap(
        slices.slice(0, ellipsisIndex).reverse(),
        (slice) => (slice.type === "component" ? slice : null)
      )[0];

      const nearestAfter = Array.keepMap(
        slices.slice(ellipsisIndex + 1),
        (slice) => (slice.type === "component" ? slice : null)
      )[0];

      if (
        nearestBefore.componentIndex !== 0 &&
        nearestBefore.componentIndex !== mostImportantComponentIndex
      ) {
        return replaceComponentIndexWithEllipsis(nearestBefore.componentIndex);
      } else if (
        nearestAfter.componentIndex !== 0 &&
        nearestAfter.componentIndex !== mostImportantComponentIndex
      ) {
        return replaceComponentIndexWithEllipsis(nearestAfter.componentIndex);
      }
    }

    return slices;
  };

  let slices = createComponentSlices(path, matchingIndices);

  let weight = calculateWeight(slices);

  while (weight > maxWeight) {
    const componentSlices = Array.keepMap(slices, (slice) =>
      slice.type === "component" ? slice : null
    );

    const groupByComponentIndex = groupBy(
      componentSlices,
      (slice) => slice.componentIndex
    );

    const sortedByLongestMatch = Dict.entries(groupByComponentIndex).sort(
      ([, componentSlicesA], [, componentSlicesB]) => {
        if (
          calculateLongestMatch(componentSlicesA) >
          calculateLongestMatch(componentSlicesB)
        ) {
          return -1;
        }

        if (
          calculateLongestMatch(componentSlicesB) >
          calculateLongestMatch(componentSlicesA)
        ) {
          return 1;
        }

        return 0;
      }
    );

    const mostImportantComponentIndex = Number(sortedByLongestMatch[0][0]);

    slices = addEllipsisToSlices(slices, mostImportantComponentIndex);

    const newWeight = calculateWeight(slices);

    // Just in case we can't shrink the weight any further
    if (newWeight === weight) {
      break;
    }

    weight = newWeight;
  }

  return slices;
}

export function createComponentSlices(
  path: string,
  matchingIndices: ReadonlyArray<{ start: number; end: number }>
): Array<PathSlice> {
  const slices: PathSlice[] = [];

  const addComponent = (slice: StringSlice, componentIndex: number) => {
    slices.push({ type: "component", componentIndex, slice });
  };

  const addJoin = () => {
    slices.push({ type: "join" });
  };

  const addEllipsis = () => {
    slices.push({ type: "ellipsis" });
  };

  const components = path.split(".");

  let currentIndex = 0;
  let currentComponentIndex = 0;

  for (const component of components) {
    if (currentComponentIndex !== 0) {
      // Adds the "."
      currentIndex += 1;
    }

    const endIndex = currentIndex + component.length;

    // Example matchingIndices = [{ start: 0, end: 2 }, { start: 6, end: 11 }, { start: 12, end: 21 }]
    // currentIndex = 7
    // endIndex = 7 + 6 = 13
    const intersectingMatches = matchingIndices
      .filter(
        ({ start, end }) =>
          (currentIndex >= start && currentIndex <= end) ||
          (endIndex >= start && endIndex <= end) ||
          (start >= currentIndex && end <= endIndex)
      )
      .map(({ start, end }) => ({
        start: Math.max(start - currentIndex, 0),
        end: end - currentIndex,
      }));

    const stringSlices = getStringSlices(
      component,
      intersectingMatches,
      component.length + 1
    );

    for (const stringSlice of stringSlices) {
      addComponent(stringSlice, currentComponentIndex);
    }

    if (currentComponentIndex + 1 < components.length) {
      addJoin();
    }

    currentComponentIndex += 1;
    currentIndex = endIndex;
  }

  return slices;
}
