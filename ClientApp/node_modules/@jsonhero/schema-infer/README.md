# JSON Schema Infer

> Infers JSON Schemas from example JSON. Powers the schema inference of [jsonhero.io](https://jsonhero.io)

![Coverage lines](./badges/badge-lines.svg)
![Tests](https://github.com/jsonhero-io/schema-infer/actions/workflows/test.yml/badge.svg?branch=main)
[![Downloads](https://img.shields.io/npm/dm/%40jsonhero%2Fschema-infer.svg)](https://npmjs.com/@jsonhero/schema-infer)
[![Install size](https://packagephobia.com/badge?p=%40jsonhero%2Fschema-infer)](https://packagephobia.com/result?p=@jsonhero/schema-infer)

## Features

- Written in typescript
- Inspired by [jtd-infer](https://jsontypedef.com/docs/jtd-infer/)
- Generates valid 2020-12 JSON schema documents from example data
- Supports most string formats through [json-infer-types](https://github.com/jsonhero-io/json-infer-types)
  - Date and times
  - URIs
  - Email Addresses
  - Hostnames
  - IP Addresses
  - uuids
- Supports snapshotting and restoring inference sessions
- Handles nullable values and required/optional properties

## Usage

Install `schema-infer`:

```bash
npm install --save @jsonhero/schema-infer
```

To produce a JSON Schema document, pass in the example JSON to `inferSchema` and call `toJSONSchema` on the result:

```ts
import { inferSchema } from "@jsonhero/schema-infer";

inferSchema({
  id: "abeb8b52-e960-44dc-9e09-57bb00d6b441",
  name: "Eric",
  emailAddress: "eric@jsonhero.io",
  website: "https://github.com/ericallam",
  joined: "2022-01-01",
}).toJSONSchema();
```

Infers the following JSON schema:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "id": { "type": "string", "format": "uuid" },
    "name": { "type": "string" },
    "emailAddress": { "type": "string", "format": "email" },
    "website": { "type": "string", "format": "uri" },
    "joined": { "type": "string", "format": "date" }
  },
  "required": ["id", "name", "emailAddress", "website", "joined"]
}
```

Inferring an array of objects, with some properties being optional:

```ts
inferSchema([
  { rank: 1, name: "Eric", winner: true },
  { rank: 2, name: "Matt" },
]).toJSONSchema();
```

Produces the following schema:

```json
{
  "items": {
    "properties": {
      "name": {
        "type": "string"
      },
      "rank": {
        "type": "integer"
      },
      "winner": {
        "type": "boolean"
      }
    },
    "required": ["rank", "name"],
    "type": "object"
  },
  "type": "array"
}
```

You can produce better results by inferring from more than 1 example JSON, like so:

```ts
let inference = inferSchema({ name: "Eric" });
inference = inferSchema({ name: "James", age: 87 });

inference.toJSONSchema();
```

Produces:

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer" }
  },
  "required": ["name"]
}
```

If you need to save the inference session for later use you can use the `toSnapshot` and `restoreSnapshot` functions:

```ts
let inference = inferSchema({ name: "Eric" });
let snapshot = inference.toSnapshot();

await writeFile("./inference.json", JSON.stringify(snapshot));

// Later:
let snapshot = JSON.parse(await readFile("./inference.json"));
inferSchema({ email: "eric@jsonhero.io" }, restoreSnapshot(snapshot));
```

This library makes use of `anyOf` to handle a value that can be multiple conflicting types:

```ts
inferSchema([1, "three"]).toJSONSchema();
```

Will produce

```json
{
  "type": "array",
  "items": {
    "anyOf": [{ "type": "integer" }, { "type": "string" }]
  }
}
```

## Examples

### Airtable API

<details>
 <summary>JSON</summary>
 
 ```json
 [
  {
    "id": "rec3SDRbI5izJ0ENy",
    "fields": {
      "Link": "www.examplelink.com",
      "Name": "Ikrore chair",
      "Settings": [
        "Office",
        "Bedroom",
        "Living room"
      ],
      "Vendor": [
        "reczC9ifQTdJpMZcx"
      ],
      "Color": [
        "Grey",
        "Green",
        "Red",
        "White",
        "Blue purple"
      ],
      "Designer": [
        "recJ76rS7fEJi03wW"
      ],
      "Type": "Chairs",
      "Images": [
        {
          "id": "atten0ycxONEmeKfu",
          "width": 501,
          "height": 750,
          "url": "https://dl.airtable.com/.attachments/e13d90aafb01450314538eee5398abb3/ea5e6e6f/pexels-photo-1166406.jpegautocompresscstinysrgbh750w1260",
          "filename": "pexels-photo-1166406.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
          "size": 33496,
          "type": "image/jpeg",
          "thumbnails": {
            "small": {
              "url": "https://dl.airtable.com/.attachmentThumbnails/ff3db1021522f6100afa7e09ab42b187/9bc0dc81",
              "width": 24,
              "height": 36
            },
            "large": {
              "url": "https://dl.airtable.com/.attachmentThumbnails/15421f668579a7d75c506253b61668d6/f7c14834",
              "width": 501,
              "height": 750
            },
            "full": {
              "url": "https://dl.airtable.com/.attachmentThumbnails/bd297cad0f2acb7da5d63e0692934def/3053bea3",
              "width": 3000,
              "height": 3000
            }
          }
        }
      ],
      "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Materials": [
        "Tech suede",
        "Light wood"
      ],
      "Size (WxLxH)": "40x32x19",
      "Unit cost": 1300.5,
      "Total units sold": 0,
      "Gross sales": 0
    },
    "createdTime": "2015-01-27T20:16:05.000Z"
  },
  {
    "id": "rec4gR4daG7FLbTss",
    "fields": {
      "Link": "www.examplelink.com",
      "Name": "Angular pendant",
      "Settings": [
        "Office"
      ],
      "Vendor": [
        "reczC9ifQTdJpMZcx"
      ],
      "Color": [
        "Silver",
        "Black",
        "White",
        "Gold"
      ],
      "Designer": [
        "recoh9S9UjHVUpcPy"
      ],
      "In stock": true,
      "Type": "Lighting",
      "Orders": [
        "recspa0dTuVfr5Tji"
      ],
      "Images": [
        {
          "id": "attViFaKwjE6WJ3iD",
          "width": 1000,
          "height": 1500,
          "url": "https://dl.airtable.com/.attachments/ce5d081b96ad1d4ef7aa3003c77fb761/4e9b68ae/photo-1546902172-146006dcd1e6ixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9autoformatfitcropw1000q80",
          "filename": "photo-1546902172-146006dcd1e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
          "size": 163784,
          "type": "image/jpeg",
          "thumbnails": {
            "small": {
              "url": "https://dl.airtable.com/.attachmentThumbnails/ffa7089696c170c6be567d5f34b4ed66/e1046fbc",
              "width": 24,
              "height": 36
            },
            "large": {
              "url": "https://dl.airtable.com/.attachmentThumbnails/e66162154bfa7eacd377d40266f57316/39fb0eac",
              "width": 512,
              "height": 768
            },
            "full": {
              "url": "https://dl.airtable.com/.attachmentThumbnails/7070d3cb16ad9d18e4fa5bbedb4e740b/460fd6c4",
              "width": 3000,
              "height": 3000
            }
          }
        }
      ],
      "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Materials": [
        "Steel"
      ],
      "Size (WxLxH)": "7.5 x 12.75, 10.5 x 17.5 ",
      "Unit cost": 295,
      "Total units sold": 2,
      "Gross sales": 590
    },
    "createdTime": "2015-01-27T19:14:59.000Z"
  },
  {
    "id": "rec4rIuzOPQA07c3M",
    "fields": {
      "Link": "www.examplelink.com",
      "Name": "Madrid chair",
      "Settings": [
        "Living room",
        "Office"
      ],
      "Vendor": [
        "reczC9ifQTdJpMZcx"
      ],
      "Color": [
        "White",
        "Brown",
        "Black"
      ],
      "Designer": [
        "recqx2njQY1QqkcaV"
      ],
      "In stock": true,
      "Type": "Chairs",
      "Orders": [
        "rec0jJArKIPxTddSX",
        "rec3mEIxLONBSab4Y"
      ],
      "Images": [
        {
          "id": "attYAf0fLp3H3OdGk",
          "width": 1000,
          "height": 477,
          "url": "https://dl.airtable.com/.attachments/c717b870174222c61991d81d32e6faa4/1ef6556a/photo-1505843490538-5133c6c7d0e1ixlibrb-1.2.1ixideyJhcHBfaWQiOjEyMDd9autoformatfitcropw1000q80",
          "filename": "photo-1505843490538-5133c6c7d0e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
          "size": 17498,
          "type": "image/jpeg",
          "thumbnails": {
            "small": {
              "url": "https://dl.airtable.com/.attachmentThumbnails/c3e8f6f2189b0d9eb14cb58b9c653f42/3b76d95a",
              "width": 75,
              "height": 36
            },
            "large": {
              "url": "https://dl.airtable.com/.attachmentThumbnails/e222fd421eddb24f9b5171a25adaa9ec/3cf86de6",
              "width": 1000,
              "height": 477
            },
            "full": {
              "url": "https://dl.airtable.com/.attachmentThumbnails/4cae754b4adc96820e98a79ca8ebdcbd/09040841",
              "width": 3000,
              "height": 3000
            }
          }
        }
      ],
      "Description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Materials": [
        "Light wood",
        "Metal"
      ],
      "Size (WxLxH)": "3x1x5",
      "Unit cost": 5429,
      "Total units sold": 36,
      "Gross sales": 195444
    },
    "createdTime": "2014-09-24T05:48:20.000Z"
  }
]
 ```
</details>

<details>
 <summary>Inferred Schema</summary>
 
 ```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "fields": {
      "type": "object",
      "properties": {
        "Link": {
          "type": "string",
          "format": "hostname"
        },
        "Name": {
          "type": "string"
        },
        "Settings": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "Vendor": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "Color": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "Designer": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "Type": {
          "type": "string"
        },
        "Images": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "id": {
                "type": "string"
              },
              "width": {
                "type": "integer"
              },
              "height": {
                "type": "integer"
              },
              "url": {
                "type": "string",
                "format": "uri"
              },
              "filename": {
                "type": "string"
              },
              "size": {
                "type": "integer"
              },
              "type": {
                "type": "string"
              },
              "thumbnails": {
                "type": "object",
                "properties": {
                  "small": {
                    "type": "object",
                    "properties": {
                      "url": {
                        "type": "string",
                        "format": "uri"
                      },
                      "width": {
                        "type": "integer"
                      },
                      "height": {
                        "type": "integer"
                      }
                    },
                    "required": [
                      "url",
                      "width",
                      "height"
                    ]
                  },
                  "large": {
                    "type": "object",
                    "properties": {
                      "url": {
                        "type": "string",
                        "format": "uri"
                      },
                      "width": {
                        "type": "integer"
                      },
                      "height": {
                        "type": "integer"
                      }
                    },
                    "required": [
                      "url",
                      "width",
                      "height"
                    ]
                  },
                  "full": {
                    "type": "object",
                    "properties": {
                      "url": {
                        "type": "string",
                        "format": "uri"
                      },
                      "width": {
                        "type": "integer"
                      },
                      "height": {
                        "type": "integer"
                      }
                    },
                    "required": [
                      "url",
                      "width",
                      "height"
                    ]
                  }
                },
                "required": [
                  "small",
                  "large",
                  "full"
                ]
              }
            },
            "required": [
              "id",
              "width",
              "height",
              "url",
              "filename",
              "size",
              "type",
              "thumbnails"
            ]
          }
        },
        "Description": {
          "type": "string"
        },
        "Materials": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "Size (WxLxH)": {
          "type": "string"
        },
        "Unit cost": {
          "type": "number"
        },
        "Total units sold": {
          "type": "integer"
        },
        "Gross sales": {
          "type": "integer"
        },
        "In stock": {
          "type": "boolean"
        },
        "Orders": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": [
        "Link",
        "Name",
        "Settings",
        "Vendor",
        "Color",
        "Designer",
        "Type",
        "Images",
        "Description",
        "Materials",
        "Size (WxLxH)",
        "Unit cost",
        "Total units sold",
        "Gross sales"
      ]
    },
    "createdTime": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": [
    "id",
    "fields",
    "createdTime"
  ]
}
 ```
</details>

## Roadmap

- Add support for hints for discriminators (tagged unions), value-only schemas, and enums
- Add support for [JSON Typedefs](https://jsontypedef.com)
- Add "verbose" mode to include `$id`, `examples`, etc.
