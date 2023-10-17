import { stableJson } from "../app/utilities/stableJson";

test("It should order object keys in a similar order as the first object in an array", () => {
  const json = {
    data: [
      {
        id: "1",
        name: "A",
        title: "A Title",
        subtitle: "A Subtitle",
      },
      {
        title: "B Title",
        name: "B",
        uuid: "2",
        subtitle: "B Subtitle",
        id: "2",
      },
      {
        subtitle: "C Subtitle",
        name: "C",
        title: "C Title",
        id: "3",
        extra: 1,
      },
    ],
  };

  expect(JSON.stringify(stableJson(json), null, 2)).toMatchInlineSnapshot(`
"{
  \\"data\\": [
    {
      \\"id\\": \\"1\\",
      \\"name\\": \\"A\\",
      \\"title\\": \\"A Title\\",
      \\"subtitle\\": \\"A Subtitle\\"
    },
    {
      \\"name\\": \\"B\\",
      \\"title\\": \\"B Title\\",
      \\"uuid\\": \\"2\\",
      \\"id\\": \\"2\\",
      \\"subtitle\\": \\"B Subtitle\\"
    },
    {
      \\"id\\": \\"3\\",
      \\"name\\": \\"C\\",
      \\"title\\": \\"C Title\\",
      \\"subtitle\\": \\"C Subtitle\\",
      \\"extra\\": 1
    }
  ]
}"
`);
});

test("It should order object keys in a similar order as the first object in an array when nested", () => {
  const json = {
    data: [
      {
        foo: [1, 2, 3],
        bar: [
          { a: 1, b: 2 },
          { b: 3, a: 4 },
        ],
      },
      {
        objects: [
          {
            id: "1",
            name: "A",
            title: "A Title",
            subtitle: "A Subtitle",
          },
          {
            id: "2",
            name: "B",
            title: "B Title",
            subtitle: "B Subtitle",
            uuid: "2",
          },
          {
            id: "3",
            name: "C",
            title: "C Title",
            subtitle: "C Subtitle",
            extra: 1,
          },
        ],
        objects2: [
          {
            id: "1",
            name: "A",
            title: "A Title",
            subtitle: "A Subtitle",
          },
          {
            id: "2",
            name: "B",
            title: "B Title",
            subtitle: "B Subtitle",
            uuid: "2",
          },
          {
            id: "3",
            name: "C",
            title: "C Title",
            subtitle: "C Subtitle",
            extra: 1,
          },
        ],
      },
    ],
  };

  expect(JSON.stringify(stableJson(json), null, 2)).toMatchInlineSnapshot(`
"{
  \\"data\\": [
    {
      \\"foo\\": [
        1,
        2,
        3
      ],
      \\"bar\\": [
        {
          \\"a\\": 1,
          \\"b\\": 2
        },
        {
          \\"a\\": 4,
          \\"b\\": 3
        }
      ]
    },
    {
      \\"objects\\": [
        {
          \\"id\\": \\"1\\",
          \\"name\\": \\"A\\",
          \\"title\\": \\"A Title\\",
          \\"subtitle\\": \\"A Subtitle\\"
        },
        {
          \\"id\\": \\"2\\",
          \\"name\\": \\"B\\",
          \\"title\\": \\"B Title\\",
          \\"subtitle\\": \\"B Subtitle\\",
          \\"uuid\\": \\"2\\"
        },
        {
          \\"id\\": \\"3\\",
          \\"name\\": \\"C\\",
          \\"title\\": \\"C Title\\",
          \\"subtitle\\": \\"C Subtitle\\",
          \\"extra\\": 1
        }
      ],
      \\"objects2\\": [
        {
          \\"id\\": \\"1\\",
          \\"name\\": \\"A\\",
          \\"title\\": \\"A Title\\",
          \\"subtitle\\": \\"A Subtitle\\"
        },
        {
          \\"id\\": \\"2\\",
          \\"name\\": \\"B\\",
          \\"title\\": \\"B Title\\",
          \\"subtitle\\": \\"B Subtitle\\",
          \\"uuid\\": \\"2\\"
        },
        {
          \\"id\\": \\"3\\",
          \\"name\\": \\"C\\",
          \\"title\\": \\"C Title\\",
          \\"subtitle\\": \\"C Subtitle\\",
          \\"extra\\": 1
        }
      ]
    }
  ]
}"
`);
});

test("It should not convert an array to an object in nested arrays", () => {
  const json = {
    data: [
      [1],
      [2]
    ],
  };

  expect(JSON.stringify(stableJson(json), null, 2)).toMatchInlineSnapshot(`
"{
  \\"data\\": [
    [
      1
    ],
    [
      2
    ]
  ]
}"
`);
});
