# 🤔 JSON Infer Types

> Infer the types of JSON documents & values, with a large set of formats for strings

![Coverage lines](./badges/badge-lines.svg)
![Tests](https://github.com/jsonhero-io/json-infer-types/actions/workflows/test.yml/badge.svg?branch=main)
[![Downloads](https://img.shields.io/npm/dm/%40jsonhero%2Fjson-infer-types.svg)](https://npmjs.com/@jsonhero/json-infer-types)
[![Install size](https://packagephobia.com/badge?p=%40jsonhero%2Fjson-infer-types)](https://packagephobia.com/result?p=@jsonhero/json-infer-types)

- [🚀 Features](#-features)
- [💻 Usage](#-usage)
  - [Strings](#strings)
- [String Formats](#string-formats)
  - [Date/Time strings](#datetime-strings)
  - [URI strings](#uri-strings)
  - [Email address strings](#email-address-strings)
  - [JWT Strings](#jwt-strings)
  - [Credit Card Numbers](#credit-card-numbers)
  - [Other formats](#other-formats)
- [Object Formats](#object-formats)
  - [Firestore Timestamps](#firestore-timestamps)

## 🚀 Features

- Written in typescript
- Narrows type of the value when using with Typescript
- Lightweight with only a few third-party dependencies
- Includes a large set of formats for strings
  - Dates and times (and timestamps)
  - URIs
  - Email addresses
  - Currencies
  - Countries
  - Top-Level Domains
  - IP Addresses
  - Languages
  - Phone Numbers
  - UUIDs
  - Hostnames
  - File sizes
  - Stringified JSON

## 💻 Usage

Install JSON Infer Types

```bash
$ npm install --save @jsonhero/json-infer-types
```

`inferType` takes any JSON value and returns a `JSONValueType` object:

```js
const { inferType } = require("@jsonhero/json-infer-types");

inferType(123); // => { name: "int", value: 123 }
```

The following types are supported:

```js
inferType(null); // => { name: "null", value: null }
inferType(undefined); // => { name: "null", value: null }
inferType(true); // => { name: "bool", value: true }
inferType(123); // => { name: "int", value: 123 }
inferType(123.456); // => { name: "float", value: 123.456 }
inferType("hello world"); // => { name: "string", value: "hello world" }
inferType({ foo: "bar" }); // => { name: "object", value: { foo: "bar" } }
inferType([1, 2, 3]); // => { name: "array", value: [1, 2, 3] }
```

### Strings

JSON Infer Types will also recognize certain string formats and include that information in the result, for example if the string is a `URI`:

```js
inferType("https://www.example.com/foo#bar");
```

Will be

```json
{
  "name": "string",
  "value": "https://www.example.com/foo#bar",
  "format": {
    "name": "uri"
  }
}
```

Some formats have mutliple variants, like IP Address. `inferType("192.168.0.1")` will be interpreted as an IPV4 address

```json
{
  "name": "string",
  "value": "192.168.0.1",
  "format": {
    "name": "ip",
    "variant": "v4"
  }
}
```

And `inferType("2001:db8:1234::1")` will be interpreted as an IPV6 address

```json
{
  "name": "string",
  "value": "2001:db8:1234::1",
  "format": {
    "name": "ip",
    "variant": "v6"
  }
}
```

## String Formats

### Date/Time strings

JSON Infer Types supports `rfc3339/iso8601` and `rfc2822` string formats

```js
inferType("2019-01-01 00:00:00.000Z");
```

Will result in

```json
{
  "name": "string",
  "value": "2019-01-01 00:00:00.000Z",
  "format": {
    "name": "datetime",
    "parts": "datetime",
    "variant": "rfc3339"
  }
}
```

The `parts` field can be either `datetime`, `date` or `time`, depending on the contents of the string.

The following table illustrates the results of different Date/Time strings

| String                              | Variant | Parts    |
| ----------------------------------- | ------- | -------- |
| `"2019-01-01 00:00:00.000Z"`        | rfc3339 | datetime |
| `"2019-10-12T14:20:50.52+07:00"`    | rfc3339 | datetime |
| `"1983-10-14T13:30Z"`               | rfc3339 | datetime |
| `"2016-05-25"`                      | rfc3339 | date     |
| `"+002016-05-25"`                   | rfc3339 | date     |
| `"2016-W21-3"`                      | rfc3339 | date     |
| `"09:24:15.123Z"`                   | rfc3339 | time     |
| `"09:24:15.123Z"`                   | rfc3339 | time     |
| `"09:24:15"`                        | rfc3339 | time     |
| `"Mon, 02 Jan 2017 06:00:00 -0800"` | rfc2822 | datetime |
| `"Mon, 02 Jan 2017 06:00:00 PST"`   | rfc2822 | datetime |

Timezone and Calendar extensions for rfc3339 date/times are also detected:

```js
inferType("2022-02-28T11:06:00.092121729+08:00[Asia/Shanghai][u-ca=chinese]");
```

Will result in

```json
{
  "name": "string",
  "value": "2022-02-28T11:06:00.092121729+08:00[Asia/Shanghai][u-ca=chinese]",
  "format": {
    "name": "datetime",
    "parts": "datetime",
    "variant": "rfc3339",
    "extensions": ["timezone", "calendar"]
  }
}
```

This is useful for knowing when you can use `Temporal.ZonedDateTime` in the new [Temporal](https://tc39.es/proposal-temporal/docs/index.html) ECMAScript proposal:

```js
const inferredType = inferType("2022-02-28T11:06:00.092121729+08:00[Asia/Shanghai][u-ca=chinese]");

if (
  inferredType.name === "string" &&
  inferredType.format.name === "datetime" &&
  inferredType.format.variant === "rfc3339" &&
  inferredType.format.extensions.includes("timezone")
) {
  const zonedDateTime = Temporal.ZonedDateTime.from(inferredType.value);
  // Temporal.ZonedDateTime <2022-02-28T11:06:00.092121729+08:00[Asia/Shanghai][u-ca=chinese]>
}
```

JSON Infer Types also supports unix epoch timestamps

```js
inferType("1596597629980");
```

Will result in

```json
{
  "name": "string",
  "value": "1596597629980",
  "format": {
    "name": "timestamp",
    "variant": "millisecondsSinceEpoch"
  }
}
```

Also supported are seconds and nanoseconds since epoch timestamp strings

### URI strings

JSON Infer Types will interpret certain strings to be URIs

```js
inferType("https://www.example.com/foo#bar");
```

Will result in

```json
{
  "name": "string",
  "value": "https://www.example.com/foo#bar",
  "format": {
    "name": "uri"
  }
}
```

If the URI contains a file extension, the inferred `contentType` will be included in the result. For example `inferType("https://www.example.com/foo.json")` will result in

```json
{
  "name": "string",
  "value": "https://www.example.com/foo.json",
  "format": {
    "name": "uri",
    "contentType": "application/json"
  }
}
```

The mapping of file extension to contentType is done using the [mime-types](https://github.com/jshttp/mime-types) package

### Email address strings

JSON Infer Types supports `rfc5321` and `rfc5321` style email address strings:

```js
inferType("eallam@example.com");
```

Will result in

```json
{
  "name": "string",
  "value": "eallam@example.com",
  "format": {
    "name": "email",
    "variant": "rfc5321"
  }
}
```

The following table illustrates the results of different email strings

| String                                           | Variant |
| ------------------------------------------------ | ------- |
| `"example+suffix@example.com"`                   | rfc5321 |
| `"example@127.0.0.1"`                            | rfc5321 |
| `"foo@example.accountants"`                      | rfc5321 |
| `"Example Name <example@example.com>"`           | rfc5322 |
| `"Example S. Name <example.s.name@example.com>"` | rfc5322 |

### JWT Strings

Strings that contain JWT tokens will have the `jwt` format

```javascript
inferType(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.sruoLZNJ59anK67z25t80L62OXDerSiAhWerW-usZLQ",
);
```

Will result in

```json
{
  "name": "string",
  "value": "...",
  "format": {
    "name": "jwt"
  }
}
```

### Credit Card Numbers

Strings that contain valid credit card numbers will be inferred with the `creditcard` format:

```javascript
inferType("4485428259658366");
```

Will result in

```json
{
  "name": "string",
  "value": "4485428259658366",
  "format": {
    "name": "creditcard",
    "variant": "visa"
  }
}
```

The following table illustrates the results of different credit card number strings

| String                  | Variant    |
| ----------------------- | ---------- |
| `"4485 4282 5965 8366"` | visa       |
| `"4485428259658366"`    | visa       |
| `"375092442988287"`     | amex       |
| `"6011150635208157"`    | discover   |
| `"5291160983813402"`    | mastercard |
| `"38223928053796"`      | dinersclub |

### Other formats

The following table illustrates the rest of the formats JSON Infer Types supports

| Example Strings                                      | Name        | Variant   |
| ---------------------------------------------------- | ----------- | --------- |
| `"USD"`, `"BTC"`                                     | currency    | iso4217   |
| `"United States dollar"`, `"Euro"`                   | currency    | english   |
| `"ETH"`, `"LTC"`                                     | currency    | crypto    |
| `'$'`, `'£'`, `'€'`, `'¥'`                           | currency    | symbol    |
| `"USA"`, `"MMR"`                                     | country     | iso3166-3 |
| `"US"`, `"GB"`, `"JP"`                               | country     | iso3166-2 |
| `".com"`, `".co.uk"`, `".biz"`                       | tld         |           |
| `"192.168.0.1"`, `"172.16.0.0"`                      | ip          | v4        |
| `"2001:db8:1234::1"`                                 | ip          | v6        |
| `"en"`, `"ab"`, `"es"`                               | language    | iso693-1  |
| `"eng"`, `"eus"`, `"zul"`                            | language    | iso693-2  |
| `"Arabic"`, `"Welsh"`, `"Russian"`                   | language    | english   |
| `"dansk"`, `"Español"`                               | language    | native    |
| `"+1 (684) 633-5115"`, `"+49 30 83050"`              | phoneNumber | e.164     |
| `"4677658f-8865-47db-afb0-908e25246348"`             | uuid        | v4        |
| `"cfa649f0-650b-11ec-acb3-03462fc79f5d"`             | uuid        | v1        |
| `"bde4a7b9-5793-5a1f-b378-211205b15898"`             | uuid        | v5        |
| `"foo.example.com"`, `"localhost"`                   | hostname    | rfc1123   |
| `"exa_mple.com"`                                     | hostname    | rfc5890   |
| `"544B"`, `"1.0MB"`, `"377K"`, `"1.87GB"`            | filesize    | human     |
| `'{ "foo": 1 }'`                                     | json        | ecma262   |
| `'{ foo: 1, }'`                                      | json        | json5     |
| `"/foo/bar"`, `"/foo/-/bar"`                         | jsonPointer | rfc6901   |
| `"😄"`, `"🤪👨🏽‍🚀"`, `"👩‍👩‍👧‍👧"`                             | emoji       |           |
| `"1.11.0"`, `"0.0.1"`, `"1.0.0-alpha.1"`             | semver      |           |
| `"#ff0000"`, `"#D47DB9"`                             | color       | hex       |
| `"rgb(255, 255, 255)"`, `"rgb(255, 255, 255,.5)"`    | color       | rgb       |
| `"hsl(100, 100%, 50%)"`, `"hsl(235, 100%, 50%, .5)"` | color       | hsl       |

## Object Formats

We also infer the format of certain common object shapes, documented below:

### Firestore Timestamps

[Firestore Timestamps](https://firebase.google.com/docs/reference/node/firebase.firestore.Timestamp) are an object with two keys, `_seconds` and `_nanoseconds`:

```json
{
  "_seconds": 1642533020,
  "_nanoseconds": 932000000
}
```

Inferring this object will result in the following inferred type:

```json
{
  "name": "object",
  "value": {
    "_seconds": 1642533020,
    "_nanoseconds": 932000000
  },
  "format": {
    "name": "firestoreTimestamp"
  }
}
```

Please feel free to request additional formats by opening a [Github issue](https://github.com/jsonhero-io/json-infer-types/issues)
