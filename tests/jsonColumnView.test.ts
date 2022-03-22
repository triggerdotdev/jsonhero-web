import { generateColumnViewNode } from "../app/utilities/jsonColumnView";

describe("generateColumnViewNode", () => {
  test("it creates the correct tree structure for the passed in JSON", () => {
    const json = {
      string: "foo bar",
      data: { foo: "bar" },
      array: [
        {
          string: "foo bar",
        },
      ],
    };

    expect(generateColumnViewNode(json)).toMatchInlineSnapshot(`
Object {
  "children": Array [
    Object {
      "children": Array [],
      "icon": [Function],
      "id": "$.string",
      "name": "string",
      "subtitle": "foo bar",
      "title": "string",
    },
    Object {
      "children": Array [
        Object {
          "children": Array [],
          "icon": [Function],
          "id": "$.data.foo",
          "name": "foo",
          "subtitle": "bar",
          "title": "foo",
        },
      ],
      "icon": [Function],
      "id": "$.data",
      "name": "data",
      "subtitle": "1 field",
      "title": "data",
    },
    Object {
      "children": Array [
        Object {
          "children": Array [
            Object {
              "children": Array [],
              "icon": [Function],
              "id": "$.array.0.string",
              "name": "string",
              "subtitle": "foo bar",
              "title": "string",
            },
          ],
          "icon": [Function],
          "id": "$.array.0",
          "longTitle": "Index 0",
          "name": "0",
          "subtitle": "1 field",
          "title": "0",
        },
      ],
      "icon": [Function],
      "id": "$.array",
      "name": "array",
      "subtitle": "1 item",
      "title": "array",
    },
  ],
  "icon": [Function],
  "id": "$",
  "name": "root",
  "title": "root",
}
`);
  });
});
