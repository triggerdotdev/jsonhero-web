# json-schema-fns

> Modern utility library and typescript typings for building JSON Schema documents dynamically

<!-- ![Coverage lines](./badges/badge-lines.svg) -->
<!-- ![Tests](https://github.com/jsonhero-io/json-schema-fns/actions/workflows/test.yml/badge.svg?branch=main) -->
<!-- [![Downloads](https://img.shields.io/npm/dm/%40jsonhero%2Fjson-schema-fns.svg)](https://npmjs.com/@jsonhero/json-schema-fns) -->
<!-- [![Install size](https://packagephobia.com/badge?p=%40jsonhero%2Fjson-schema-fns)](https://packagephobia.com/result?p=@jsonhero/json-schema-fns) -->

## Features

- Build JSON Schema documents for various drafts (currently only draft-2020-12 but more coming soon)
- Strongly typed documents using Typescript
- Allows you to build correct JSON Schema documents using dynamic data

## Usage

Create a simple draft-2020-12 document:

```ts
import { s } from "json-schema-fns";

const schema = s.object({
  properties: [s.requiredProperty("foo", s.string()), s.property("bar", s.int())],
});

schema.toSchemaDocument();
```

Will result in

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema#",
  "$id": "https://jsonhero.io/schemas/root.json",
  "type": "object",
  "properties": {
    "foo": { "type": "string" },
    "bar": { "type": "integer" }
  },
  "required": ["foo"]
}
```

You can also import the types for a specific draft to use, like so:

```typescript
import { s, Schema, IntSchema, StringSchema, StringFormat } from "json-schema-fns";

function buildIntSchema(maximum: number, minimum: number): IntSchema {
  return s.int({ minimum, maximum });
}

function buildStringFormat(format: JSONStriStringFormatgFormat): StringSchema {
  return s.string({ format });
}
```

`json-schema-fns` support all the features of JSON schema:

```typescript
import { s } from "json-schema-fns";

const phoneNumber = s.def("phoneNumber", s.string({ pattern: "^[0-9]{3}-[0-9]{3}-[0-9]{4}$" }));
const usAddress = s.def(
  "usAddress",
  s.object({
    properties: [s.requiredProperty("zipCode", s.string())],
  }),
);

const ukAddress = s.def(
  "ukAddress",
  s.object({
    properties: [s.requiredProperty("postCode", s.string())],
  }),
);

s.object({
  $id: "/schemas/person",
  title: "Person Profile",
  description: "Attributes of a person object",
  examples: [
    {
      name: "Eric",
      email: "eric@stackhero.dev",
    },
  ],
  $comment: "This is just a preview",
  default: {},
  properties: [
    s.requiredProperty("name", s.string()),
    s.property("email", s.string({ format: "email" })),
    s.property("phoneNumber", s.ref("phoneNumber")),
    s.property("billingAddress", s.oneOf(s.ref("ukAddress"), s.ref("usAddress"))),
    s.patternProperty("^[A-Za-z]$", s.string()),
  ],
  additionalProperties: s.array({
    items: s.number({ minimum: 0, maximum: 5000 }),
  }),
  propertyNames: "^[A-Za-z_][A-Za-z0-9_]*$",
  minProperties: 3,
  maxProperties: 20,
  unevaluatedProperties: false,
  defs: [phoneNumber, usAddress, ukAddress],
}).toSchemaDocument();
```

Will result in

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "$id": "/schemas/person",
  "title": "Person Profile",
  "description": "Attributes of a person object",
  "examples": [
    {
      "name": "Eric",
      "email": "eric@stackhero.dev"
    }
  ],
  "$comment": "This is just a preview",
  "default": {},
  "minProperties": 3,
  "maxProperties": 20,
  "unevaluatedProperties": false,
  "properties": {
    "name": {
      "type": "string"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "phoneNumber": {
      "$ref": "#/$defs/phoneNumber"
    },
    "billingAddress": {
      "oneOf": [
        {
          "$ref": "#/$defs/ukAddress"
        },
        {
          "$ref": "#/$defs/usAddress"
        }
      ]
    }
  },
  "required": ["name"],
  "patternProperties": {
    "^[A-Za-z]$": {
      "type": "string"
    }
  },
  "propertyNames": {
    "pattern": "^[A-Za-z_][A-Za-z0-9_]*$"
  },
  "additionalProperties": {
    "type": "array",
    "items": {
      "type": "number",
      "minimum": 0,
      "maximum": 5000
    }
  },
  "$defs": {
    "phoneNumber": {
      "type": "string",
      "pattern": "^[0-9]{3}-[0-9]{3}-[0-9]{4}$"
    },
    "usAddress": {
      "type": "object",
      "properties": {
        "zipCode": {
          "type": "string"
        }
      },
      "required": ["zipCode"]
    },
    "ukAddress": {
      "type": "object",
      "properties": {
        "postCode": {
          "type": "string"
        }
      },
      "required": ["postCode"]
    }
  }
}
```

# API

## `s`

All the builder methods for creating subschemas are available on the `s` object

```typescript
import { s } from "json-schema-fns";
```

Or if you want to import a specific dialect:

```typescript
import { s } from "json-schema-fns/2020";
```

All builder methods return a `SchemaBuilder`, and you can generate the JSON schema created by the builder using `toSchemaDocument` like so

```typescript
s.object().toSchemaDocument();
```

Which will result in the following document

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object"
}
```

If you don't want the `$schema` property, use `toSchema` instead:

```typescript
s.object().toSchema(); // { "type": "object" }
```

All builder methods also support the options in `AnnotationSchema`:

```typescript
s.object({
  $id: "#/foobar",
  $comment: "This is a comment",
  default: {},
  title: "FooBar Object Schema",
  description: "This is the FooBar schema description",
  examples: [{ foo: "bar" }],
  deprecated: true,
  readOnly: true,
  writeOnly: false,
}).toSchema();
```

Produces the schema

```json
{
  "type": "object",
  "$id": "#/foobar",
  "$comment": "This is a comment",
  "default": {},
  "title": "FooBar Object Schema",
  "description": "This is the FooBar schema description",
  "examples": [{ "foo": "bar" }],
  "deprecated": true,
  "readOnly": true,
  "writeOnly": false
}
```

### `s.object(options: ObjectOptions)`

Builds a schema of type `object`, accepting a single argument of type `ObjectOptions`

#### `ObjectOptions.properties`

An array of optional and required properties

```typescript
s.object({
  properties: [
    s.property("name", s.string()),
    s.requiredProperty("email", s.string({ format: "email" })),
  ],
}).toSchema();
```

Produces the schema

```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "email": { "type": "string", "format": "email" }
  },
  "required": ["email"]
}
```

You can also add [patternProperties](https://json-schema.org/understanding-json-schema/reference/object.html#pattern-properties)

```typescript
s.object({ properties: [s.patternProperty("^S_", s.string())] }).toSchema();
```

which produces the schema

```json
{
  "type": "object",
  "patternProperties": {
    "^S_": { "type": "string" }
  }
}
```

#### `ObjectOptions.additonalProperties`

Add an [additonalProperties](https://json-schema.org/understanding-json-schema/reference/object.html#additional-properties) schema:

```typescript
s.object({ additionalProperties: s.number() }).toSchema();
```

Produces the schema

```json
{
  "type": "object",
  "additionalProperties": {
    "type": "number"
  }
}
```

#### `ObjectOptions.propertyNames`

Add a [propertyNames](https://json-schema.org/understanding-json-schema/reference/object.html#property-names) pattern:

```typescript
s.object({ propertyNames: "^[A-Za-z_][A-Za-z0-9_]*$" }).toSchema();
```

Produces the schema

```json
{
  "type": "object",
  "propertyNames": {
    "pattern": "^[A-Za-z_][A-Za-z0-9_]*$"
  }
}
```

#### `ObjectOptions.minProperties` and `ObjectOptions.maxProperties`

Validate the number of properties in an object using [min/maxProperties](https://json-schema.org/understanding-json-schema/reference/object.html#size)

```typescript
s.object({ minProperties: 4, maxProperties: 10 }).toSchema();
```

Produces the schema

```json
{
  "type": "object",
  "minProperties": 4,
  "maxProperties": 10
}
```

#### `ObjectOptions.unevaluatedProperties`

Specify the handling of [unevaluatedProperties](https://json-schema.org/understanding-json-schema/reference/object.html#unevaluated-properties)

```typescript
s.object({ unevaluatedProperties: false }).toSchema();
```

Produces the schema

```json
{
  "type": "object",
  "unevaluatedProperties": false
}
```

### `s.array(options: ArrayOptions)`

Builds a schema of type `array`, accepting a single argument of type `ArrayOptions`

#### `ArrayOptions.items`

Define the [items](https://json-schema.org/understanding-json-schema/reference/array.html#items) schema for an array:

```typescript
s.array({ items: s.string() }).toSchema();
```

Produces the schema

```json
{
  "type": "array",
  "items": { "type": "string" }
}
```

#### `ArrayOptions.minItems` and `ArrayOptions.maxItems`

Define the array [length](https://json-schema.org/understanding-json-schema/reference/array.html#length)

```typescript
s.array({ contains: { schema: s.number(), min: 1, max: 3 }).toSchema();
```

Produces the schema

```json
{
  "type": "array",
  "contains": { "type": "number" },
  "minContains": 1,
  "maxContains": 3
}
```

#### `ArrayOptions.prefixItems`

Allows you to perform [tuple validation](https://json-schema.org/understanding-json-schema/reference/array.html#tuple-validation):

```typescript
s.array({ prefixItems: [s.string(), s.number()] }).toSchema();
```

Produces the schema

```json
{
  "type": "array",
  "prefixItems": [{ "type": "string" }, { "type": "number" }]
}
```

#### `ArrayOptions.unevaluatedItems`

Define the schema for [unevaluatedItems](https://json-schema.org/understanding-json-schema/reference/array.html#unevaluated-items)

```typescript
s.array({ unevaluatedItems: s.object() }).toSchema();
```

Produces the schema

```json
{
  "type": "array",
  "unevaluatedItems": { "type": "object" }
}
```

#### `ArrayOptions.contains`

Define the schema [contains](https://json-schema.org/understanding-json-schema/reference/array.html#contains)

```typescript
s.array({ contains: { schema: s.number(), min: 1, max: 3 }).toSchema();
```

Produces the schema

```json
{
  "type": "array",
  "contains": { "type": "number" },
  "minContains": 1,
  "maxContains": 3
}
```

### `string`

### `integer` and `number`

### `boolean`

### `nil`

### `nullable`

### `anyOf` | `allOf` | `oneOf`

### `ifThenElse` and `ifThen`

### `not`

### `def` and `ref`

### `$const`

### `$enumerator`

### `$true` and `$false`

## Roadmap

- Support draft-04
- Support draft-06
- Support draft-07
- Support draft/2019-09
