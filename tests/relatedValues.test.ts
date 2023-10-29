// Import the function for calculating related values groups
import { calculateRelatedValuesGroups } from "../app/utilities/relatedValues";

// Sample JSON data containing a list of objects
const json = {
  data: [
    // Object 1
    {
      stream_key: "831b5bde-cd8a-5bc4-115d-4ba34b19f481",
      status: "idle",
      reconnect_window: 60,
      playback_ids: [
        // Playback ID 1
        {
          policy: "public",
          id: "HNRDuwff3K2VjTZZAPuvd2Kx6D01XUQFv02GFBHPUka018",
        },
        // Playback ID 2
        {
          policy: "public",
          id: "8c836496-d923-4075-9974-3fd40dd74b03",
        },
      ],
      new_asset_settings: {
        playback_policies: ["public"],
      },
      id: "ZEBrNTpHC02iUah025KM3te6ylM7W4S4silsrFtUkn3Ag",
      created_at: "1609937654",
      modifiedAt: "1609937654",
    },
    // Object 2
    {
      stream_key: "d273c65e-1fc8-27dc-e9ef-56144cbceb3a",
      status: "idle",
      reconnect_window: 60,
      recent_asset_ids: [
        "SZs02xxHgYdkHp00OSCjJiHUHqzVQZNU332XPXRxe341o",
        "e4J9cwb5tjVxMeeV8201dC00i800ThPKKGT2SEN002dHH2s",
      ],
      playback_ids: [
        // Playback ID 1
        {
          policy: "public",
          id: "00zOcribkUmXqXHzBTpflk2771BRTcKATqPjWf7JHpuM",
        },
        // Playback ID 2
        {
          policy: "private",
          id: "00zOcribkUmXqXHzBTpflk2771BRTcKATqPjWf7JHpuM",
        },
      ],
      new_asset_settings: {
        playback_policies: ["public"],
      },
      id: "B65hEUWW01ErVKDDGImKcBquYhwEAkjW6Ic3lPY0299Cc",
      created_at: "1607587513",
      another_field: {
        nested: "value",
      },
      modifiedAt: null,
    },
    // Object 3
    {
      stream_key: "6a46c87d-00db-42a9-bad0-aad2872983bf",
      status: "playing",
      reconnect_window: 60,
      recent_asset_ids: [
        "SZs02xxHgYdkHp00OSCjJiHUHqzVQZNU332XPXRxe341o",
        "e4J9cwb5tjVxMeeV8201dC00i800ThPKKGT2SEN002dHH2s",
      ],
      playback_ids: [
        // Playback ID 1
        {
          policy: "private",
          id: "00zOcribkUmXqXHzBTpflk2771BRTcKATqPjWf7JHpuM",
        },
        // Playback ID 2
        {
          policy: "internal",
          id: "4b2aceab-f61d-499d-97d7-3f407cbcfbb6",
        },
        // Playback ID 3
        {
          policy: { name: "shared", url: "https://example.com" },
          id: "89952227-ee16-4e4e-b15f-65c127931bcc",
        },
      ],
      new_asset_settings: {
        playback_policies: ["private"],
      },
      id: "B65hEUWW01ErVKDDGImKcBquYhwEAkjW6Ic3lPY0299Cc",
      created_at: "1607587513",
      another_field: {
        nested: "value",
      },
    },
  ],
};

// Test suite for the calculateRelatedValuesGroups function
describe("calculateRelatedValuesGroups", () => {
  // Test case: It should return the correct values when the path is an object
  test("it should return the correct values when path is an object", () => {
    // Define the path to a specific object property
    const path = "$.data.1.another_field";

    // Calculate related values groups based on the specified path
    const result = calculateRelatedValuesGroups(path, json);

    // Verify the calculated related values groups match the expected snapshot
    expect(result).toMatchInlineSnapshot(`
Array [
  Object {
    "paths": Array [
      "$.data.1.another_field",
      "$.data.2.another_field",
    ],
    "value": "{...}",
  },
  Object {
    "paths": Array [
      "$.data.0.another_field",
    ],
    "value": "undefined",
  },
]
`);
  });

  // Test case: It should return the correct values when the path is an array
  test("it should return the correct values when path is an array", () => {
    // Define the path to a specific array property
    const path = "$.data.1.recent_asset_ids";

    // Calculate related values groups based on the specified path
    const result = calculateRelatedValuesGroups(path, json);

    // Verify the calculated related values groups match the expected snapshot
    expect(result).toMatchInlineSnapshot(`
Array [
  Object {
    "paths": Array [
      "$.data.1.recent_asset_ids",
      "$.data.2.recent_asset_ids",
    ],
    "value": "Array(2)",
  },
  Object {
    "paths": Array [
      "$.data.0.recent_asset_ids",
    ],
    "value": "undefined",
  },
]
`);
  });

  // Test case: It should return the correct related values grouped by value
  test("it should return the correct related values grouped by value", () => {
    // Define the path to a specific object property
    const path = "$.data.1.playback_ids.0.policy";

    // Calculate related values groups based on the specified path
    const result = calculateRelatedValuesGroups(path, json);

    // Verify the calculated related values groups match the expected values
    expect(result).toStrictEqual([
      {
        value: "public",
        paths: [
          "$.data.0.playback_ids.0.policy",
          "$.data.0.playback_ids.1.policy",
          "$.data.1.playback_ids.0.policy",
        ],
      },
      {
        value: "private",
        paths: [
          "$.data.1.playback_ids.1.policy",
          "$.data.2.playback_ids.0.policy",
        ],
      },
      {
        value: "internal",
        paths: ["$.data.2.playback_ids.1.policy"],
      },
      {
        value: "{...}",
        paths: ["$.data.2.playback_ids.2.policy"],
      },
    ]);
  });

  // Test case: It should group "undefined" separately from "null"
  test("it should group undefined separately from null", () => {
    // Define the path to a specific object property
    const path = "$.data.1.modifiedAt";

    // Calculate related values groups based on the specified path
    const result = calculateRelatedValuesGroups(path, json);

    // Verify the calculated related values groups match the expected values
    expect(result).toStrictEqual([
      {
        value: "1609937654",
        paths: ["$.data.0.modifiedAt"],
      },
      {
        value: "null",
        paths: ["$.data.1.modifiedAt"],
      },
      {
        value: "undefined",
        paths: ["$.data.2.modifiedAt"],
      },
    ]);
  });
});

