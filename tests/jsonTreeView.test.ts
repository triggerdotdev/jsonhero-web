import { generateTreeViewNodes } from "../app/utilities/jsonTreeView";

describe("generateTreeViewNodes", () => {
  test("it creates the correct tree structure for the passed in JSON", () => {
    const json = {
      name: "Eric Allam",
      address: { city: "London", country: "UK" },
      emailAddresses: [
        {
          primary: "eric@stackhero.run",
        },
      ],
    };

    expect(generateTreeViewNodes(json)).toMatchInlineSnapshot(`
Array [
  Object {
    "collapsable": true,
    "icon": [Function],
    "id": "$",
    "name": "root",
    "title": "root",
  },
  Object {
    "collapsable": false,
    "icon": [Function],
    "id": "$.name",
    "name": "name",
    "subtitle": "Eric Allam",
    "title": "name",
  },
  Object {
    "collapsable": true,
    "icon": [Function],
    "id": "$.address",
    "name": "address",
    "subtitle": undefined,
    "title": "address",
  },
  Object {
    "collapsable": false,
    "icon": [Function],
    "id": "$.address.city",
    "name": "city",
    "subtitle": "London",
    "title": "city",
  },
  Object {
    "collapsable": false,
    "icon": [Function],
    "id": "$.address.country",
    "name": "country",
    "subtitle": "UK",
    "title": "country",
  },
  Object {
    "collapsable": true,
    "icon": [Function],
    "id": "$.emailAddresses",
    "name": "emailAddresses",
    "subtitle": undefined,
    "title": "emailAddresses",
  },
  Object {
    "collapsable": true,
    "icon": [Function],
    "id": "$.emailAddresses.0",
    "longTitle": "Index 0",
    "name": "0",
    "subtitle": undefined,
    "title": "0",
  },
  Object {
    "collapsable": false,
    "icon": [Function],
    "id": "$.emailAddresses.0.primary",
    "name": "primary",
    "subtitle": "eric@stackhero.run",
    "title": "primary",
  },
]
`);
  });
});
