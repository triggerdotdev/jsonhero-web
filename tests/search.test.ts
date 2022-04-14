import { getComponentSlices, getStringSlices } from "../app/utilities/search";

describe("Timezones", () => {
  it("should always be UTC", () => {
    expect(new Date().getTimezoneOffset()).toBe(0);
  });
});

describe("getComponentSlices", () => {
  it("returns the correct slices for a path that DOES go above the maxWeight even without any matches", () => {
    const slices = getComponentSlices(
      "records.0.users.9.addresses.0.street_address.street_name",
      [],
      60
    );

    expect(slices).toMatchInlineSnapshot(`
Array [
  Object {
    "componentIndex": 0,
    "slice": Object {
      "isMatch": false,
      "slice": "records",
    },
    "type": "component",
  },
  Object {
    "type": "join",
  },
  Object {
    "componentIndex": 1,
    "slice": Object {
      "isMatch": false,
      "slice": "0",
    },
    "type": "component",
  },
  Object {
    "type": "join",
  },
  Object {
    "componentIndex": 2,
    "slice": Object {
      "isMatch": false,
      "slice": "users",
    },
    "type": "component",
  },
  Object {
    "type": "join",
  },
  Object {
    "type": "ellipsis",
  },
  Object {
    "type": "join",
  },
  Object {
    "componentIndex": 7,
    "slice": Object {
      "isMatch": false,
      "slice": "street_name",
    },
    "type": "component",
  },
]
`);
  });

  it("returns the correct slices for a path that DOES go above the maxWeight", () => {
    const slices = getComponentSlices(
      "records.0.users.9.addresses.0.street_address.street_name",
      [
        { start: 0, end: 2 },
        { start: 11, end: 15 },
        { start: 30, end: 36 },
        { start: 45, end: 51 },
      ],
      60
    );

    expect(slices).toMatchInlineSnapshot(`
Array [
  Object {
    "componentIndex": 0,
    "slice": Object {
      "isMatch": true,
      "slice": "re",
    },
    "type": "component",
  },
  Object {
    "componentIndex": 0,
    "slice": Object {
      "isMatch": false,
      "slice": "cords",
    },
    "type": "component",
  },
  Object {
    "type": "join",
  },
  Object {
    "type": "ellipsis",
  },
  Object {
    "type": "join",
  },
  Object {
    "componentIndex": 6,
    "slice": Object {
      "isMatch": true,
      "slice": "street",
    },
    "type": "component",
  },
  Object {
    "componentIndex": 6,
    "slice": Object {
      "isMatch": false,
      "slice": "_address",
    },
    "type": "component",
  },
  Object {
    "type": "join",
  },
  Object {
    "componentIndex": 7,
    "slice": Object {
      "isMatch": true,
      "slice": "street",
    },
    "type": "component",
  },
  Object {
    "componentIndex": 7,
    "slice": Object {
      "isMatch": false,
      "slice": "_name",
    },
    "type": "component",
  },
]
`);
  });

  it("returns the correct slices for a path that does not go above the maxWeight", () => {
    const slices = getComponentSlices(
      "records.0.users",
      [{ start: 0, end: 4 }],
      70
    );

    expect(slices).toMatchInlineSnapshot(`
Array [
  Object {
    "componentIndex": 0,
    "slice": Object {
      "isMatch": true,
      "slice": "reco",
    },
    "type": "component",
  },
  Object {
    "componentIndex": 0,
    "slice": Object {
      "isMatch": false,
      "slice": "rds",
    },
    "type": "component",
  },
  Object {
    "type": "join",
  },
  Object {
    "componentIndex": 1,
    "slice": Object {
      "isMatch": false,
      "slice": "0",
    },
    "type": "component",
  },
  Object {
    "type": "join",
  },
  Object {
    "componentIndex": 2,
    "slice": Object {
      "isMatch": false,
      "slice": "users",
    },
    "type": "component",
  },
]
`);
  });
});

describe("getStringSlices", () => {
  it("returns a slice for each part of the string based on the matches", () => {
    const slices = getStringSlices(
      "This is a really great (short) string",
      [{ start: 10, end: 16 }],
      60
    );

    expect(slices).toMatchInlineSnapshot(`
Array [
  Object {
    "isMatch": false,
    "slice": "This is a ",
  },
  Object {
    "isMatch": true,
    "slice": "really",
  },
  Object {
    "isMatch": false,
    "slice": " great (short) string",
  },
]
`);
  });

  it("returns a subset of the string when the matched ranges are outside the window", () => {
    const slices = getStringSlices(
      "This is a very long string and the largest matched range is outside of the window, so we should try and get only slices of the string that focus on the largest match",
      [
        { start: 10, end: 16 },
        { start: 80, end: 91 },
        { start: 100, end: 106 },
      ],
      60
    );

    expect(slices).toMatchInlineSnapshot(`
Array [
  Object {
    "isMatch": false,
    "slice": "…",
  },
  Object {
    "isMatch": false,
    "slice": " is outside of the windo",
  },
  Object {
    "isMatch": true,
    "slice": "w, so we sh",
  },
  Object {
    "isMatch": false,
    "slice": "ould try ",
  },
  Object {
    "isMatch": true,
    "slice": "and ge",
  },
  Object {
    "isMatch": false,
    "slice": "t only sl",
  },
  Object {
    "isMatch": false,
    "slice": "…",
  },
]
`);

    const slices2 = getStringSlices(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      [
        { start: 0, end: 4 },
        { start: 12, end: 17 },
        { start: 103, end: 109 },
        { start: 302, end: 308 },
      ],
      56
    );

    expect(slices2).toMatchInlineSnapshot(`
Array [
  Object {
    "isMatch": false,
    "slice": "…",
  },
  Object {
    "isMatch": false,
    "slice": " incididunt ut labore et ",
  },
  Object {
    "isMatch": true,
    "slice": "dolore",
  },
  Object {
    "isMatch": false,
    "slice": " magna aliqua. Ut enim ad",
  },
  Object {
    "isMatch": false,
    "slice": "…",
  },
]
`);
  });
});
