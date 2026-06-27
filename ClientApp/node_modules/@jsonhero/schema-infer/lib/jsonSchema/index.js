"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSONSchema = void 0;
const ts_pattern_1 = require("ts-pattern");
const json_schema_fns_1 = require("@jsonhero/json-schema-fns");
function toJSONSchema(inferredSchema) {
    return (0, ts_pattern_1.match)(inferredSchema)
        .with({ type: "unknown" }, () => json_schema_fns_1.s.$false()) // This should never be reached
        .with({ type: "boolean" }, () => json_schema_fns_1.s.boolean())
        .with({ type: "nullable" }, ({ schema }) => schema.type == "unknown"
        ? json_schema_fns_1.s.nil()
        : schema.type === "nullable"
            ? toJSONSchema(schema)
            : json_schema_fns_1.s.nullable(toJSONSchema(schema)))
        .with({ type: "int" }, () => {
        return json_schema_fns_1.s.integer();
    })
        .with({ type: "float" }, () => {
        return json_schema_fns_1.s.number();
    })
        .with({ type: "string" }, ({ format }) => {
        const formatString = toJSONStringFormat(format);
        return json_schema_fns_1.s.string(formatString ? { format: formatString } : {});
    })
        .with({ type: "array" }, (inferredArray) => {
        const items = toJSONSchema(inferredArray.items);
        return json_schema_fns_1.s.array({ items });
    })
        .with({ type: "object" }, (inferredObject) => {
        const requiredProperties = Object.entries(inferredObject.properties.required).map(([key, value]) => json_schema_fns_1.s.requiredProperty(key, toJSONSchema(value)));
        const optionalProperties = Object.entries(inferredObject.properties.optional).map(([key, value]) => json_schema_fns_1.s.property(key, toJSONSchema(value)));
        return json_schema_fns_1.s.object({ properties: requiredProperties.concat(optionalProperties) });
    })
        .with({ type: "any" }, ({ schemas }) => {
        return json_schema_fns_1.s.anyOf(...Array.from(schemas).map(toJSONSchema));
    })
        .exhaustive();
}
exports.toJSONSchema = toJSONSchema;
function toJSONStringFormat(format) {
    if (!format) {
        return undefined;
    }
    switch (format.name) {
        case "hostname":
            return "hostname";
        case "ip":
            return format.variant == "v4" ? "ipv4" : "ipv6";
        case "uri":
            return "uri";
        case "email":
            return "email";
        case "datetime":
            switch (format.parts) {
                case "datetime":
                    return "date-time";
                case "date":
                    return "date";
                case "time":
                    return "time";
                default:
                    return undefined;
            }
        case "uuid":
            return "uuid";
    }
    return undefined;
}
