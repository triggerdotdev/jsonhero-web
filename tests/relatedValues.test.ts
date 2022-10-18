import { calculateRelatedValuesGroups } from "../app/utilities/relatedValues";

const json = {
  data: [
    {
      stream_key: "831b5bde-cd8a-5bc4-115d-4ba34b19f481",
      status: "idle",
      reconnect_window: 60,
      playback_ids: [
        {
          policy: "public",
          id: "HNRDuwff3K2VjTZZAPuvd2Kx6D01XUQFv02GFBHPUka018",
        },
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
    {
      stream_key: "d273c65e-1fc8-27dc-e9ef-56144cbceb3a",
      status: "idle",
      reconnect_window: 60,
      recent_asset_ids: [
        "SZs02xxHgYdkHp00OSCjJiHUHqzVQZNU332XPXRxe341o",
        "e4J9cwb5tjVxMeeV8201dC00i800ThPKKGT2SEN002dHH2s",
      ],
      playback_ids: [
        {
          policy: "public",
          id: "00zOcribkUmXqXHzBTpflk2771BRTcKATqPjWf7JHpuM",
        },
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
    {
      stream_key: "6a46c87d-00db-42a9-bad0-aad2872983bf",
      status: "playing",
      reconnect_window: 60,
      recent_asset_ids: [
        "SZs02xxHgYdkHp00OSCjJiHUHqzVQZNU332XPXRxe341o",
        "e4J9cwb5tjVxMeeV8201dC00i800ThPKKGT2SEN002dHH2s",
      ],
      playback_ids: [
        {
          policy: "private",
          id: "00zOcribkUmXqXHzBTpflk2771BRTcKATqPjWf7JHpuM",
        },
        {
          policy: "internal",
          id: "4b2aceab-f61d-499d-97d7-3f407cbcfbb6",
        },
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

describe("calculateRelatedValuesGroups", () => {
  test("it should return the correct values when path is an object", () => {
    const path = "$.data.1.another_field";

    const result = calculateRelatedValuesGroups(path, json);

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

  test("it should return the correct values when path is an array", () => {
    const path = "$.data.1.recent_asset_ids";

    const result = calculateRelatedValuesGroups(path, json);

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

  test("it should return the correct related values grouped by value", () => {
    const path = "$.data.1.playback_ids.0.policy";

    const result = calculateRelatedValuesGroups(path, json);

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

  test("it should group undefined separately from null", () => {
    const path = "$.data.1.modifiedAt";

    const result = calculateRelatedValuesGroups(path, json);

    console.log(result);

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
